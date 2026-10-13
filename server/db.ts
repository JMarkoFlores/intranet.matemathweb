import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión a PostgreSQL
const getPoolConfig = (): PoolConfig => {
  if (process.env.DATABASE_URL) {
    const isCloudDb =
      process.env.DATABASE_URL.includes('supabase') ||
      process.env.DATABASE_URL.includes('pooler') ||
      process.env.DATABASE_URL.includes('render') ||
      process.env.DATABASE_URL.includes('neon') ||
      process.env.NODE_ENV === 'production';

    return {
      connectionString: process.env.DATABASE_URL,
      ssl: isCloudDb ? { rejectUnauthorized: false } : undefined,
    };
  }

  return {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'postgres',
    // Tiempo de espera para evitar bloqueos si la BD no responde
    connectionTimeoutMillis: 3500,
  };
};

let pool: Pool | null = null;
let isInitialized = false;

export const getPool = (): Pool => {
  if (!pool) {
    pool = new Pool(getPoolConfig());
    pool.on('error', (err) => {
      console.error('[PostgreSQL] Error inesperado en el pool de conexiones:', err.message);
    });
  }
  return pool;
};

/**
 * Inicializa la tabla en la base de datos PostgreSQL si no existe.
 */
export async function initDb(): Promise<boolean> {
  const db = getPool();
  try {
    const client = await db.connect();
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS phishing_clicks (
          id SERIAL PRIMARY KEY,
          machine_id VARCHAR(255) NOT NULL UNIQUE,
          ip_address VARCHAR(100),
          user_agent TEXT,
          action_type VARCHAR(100),
          first_clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          total_clicks INT DEFAULT 1,
          last_clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await client.query(createTableQuery);
      console.log('[PostgreSQL] Conexión exitosa y tabla "phishing_clicks" verificada.');
      isInitialized = true;
      return true;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.warn('[PostgreSQL] Aviso: No se pudo conectar a PostgreSQL en este momento:', error.message);
    console.warn('[PostgreSQL] Verifica que el servicio de Postgres esté iniciado y los datos de conexión en el archivo .env.');
    return false;
  }
}

export interface RecordClickParams {
  machineId: string;
  actionType: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface RecordClickResult {
  success: boolean;
  isNew: boolean;
  totalClicksForMachine: number;
  machineId: string;
  dbConnected: boolean;
  stats?: {
    uniqueMachines: number;
    totalClicks: number;
  };
  message: string;
}

/**
 * Registra el clic en la base de datos.
 * Si la máquina ya existe, NO duplica la fila en la BD; actualiza el contador de esa máquina.
 * Así se mantiene exactamente 1 registro por máquina física en la base de datos.
 */
export async function recordClick(params: RecordClickParams): Promise<RecordClickResult> {
  const { machineId, actionType, ipAddress = '', userAgent = '' } = params;
  const db = getPool();

  try {
    if (!isInitialized) {
      await initDb();
    }

    const client = await db.connect();
    try {
      // Registrar o actualizar (UPSERT garantizando unicidad por machine_id)
      const upsertQuery = `
        INSERT INTO phishing_clicks (machine_id, ip_address, user_agent, action_type, first_clicked_at, total_clicks, last_clicked_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (machine_id)
        DO UPDATE SET
          total_clicks = phishing_clicks.total_clicks + 1,
          last_clicked_at = CURRENT_TIMESTAMP
        RETURNING id, machine_id, total_clicks, first_clicked_at, last_clicked_at, (xmax = 0) AS is_new_record;
      `;

      const result = await client.query(upsertQuery, [
        machineId,
        ipAddress,
        userAgent,
        actionType,
      ]);

      const row = result.rows[0];
      const isNew = Boolean(row.is_new_record);
      const totalClicksForMachine = Number(row.total_clicks);

      // Obtener estadísticas globales de la simulación
      const statsQuery = `
        SELECT 
          COUNT(*)::int AS unique_machines,
          COALESCE(SUM(total_clicks), 0)::int AS total_clicks
        FROM phishing_clicks;
      `;
      const statsRes = await client.query(statsQuery);
      const statsRow = statsRes.rows[0] || { unique_machines: 1, total_clicks: totalClicksForMachine };

      return {
        success: true,
        isNew,
        totalClicksForMachine,
        machineId,
        dbConnected: true,
        stats: {
          uniqueMachines: statsRow.unique_machines,
          totalClicks: statsRow.total_clicks,
        },
        message: isNew
          ? 'Primera interacción registrada para esta máquina en PostgreSQL.'
          : `Máquina ya existente en la base de datos (Clic #${totalClicksForMachine}). Registro no duplicado.`,
      };
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('[PostgreSQL] Error al registrar clic:', error.message);
    // En caso de que la BD no esté disponible, respondemos informando al cliente
    return {
      success: true, // Éxito en la simulación para que el modal se muestre sin problemas
      isNew: true,
      totalClicksForMachine: 1,
      machineId,
      dbConnected: false,
      message: `Simulación ejecutada. Nota: No se pudo conectar con PostgreSQL (${error.message}). Revisa la configuración en .env.`,
    };
  }
}

/**
 * Obtiene estadísticas generales registradas
 */
export async function getStats() {
  const db = getPool();
  try {
    const client = await db.connect();
    try {
      const statsQuery = `
        SELECT 
          COUNT(*)::int AS unique_machines,
          COALESCE(SUM(total_clicks), 0)::int AS total_clicks
        FROM phishing_clicks;
      `;
      const res = await client.query(statsQuery);
      return {
        dbConnected: true,
        stats: res.rows[0] || { unique_machines: 0, total_clicks: 0 },
      };
    } finally {
      client.release();
    }
  } catch (error: any) {
    return {
      dbConnected: false,
      stats: { unique_machines: 0, total_clicks: 0 },
      error: error.message,
    };
  }
}
