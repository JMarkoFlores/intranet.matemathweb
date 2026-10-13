import type { IncomingMessage, ServerResponse } from 'http';
import { recordClick, getStats, initDb } from './db.ts';

let dbInitialized = false;

export async function ensureDbReady() {
  if (!dbInitialized) {
    dbInitialized = true;
    try {
      await initDb();
    } catch (err: any) {
      console.warn('[Server] Error durante inicialización de BD:', err.message);
    }
  }
}

export async function handlePhishingApi(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) {
  const rawUrl = (req.url || '').split('?')[0];
  const url = rawUrl.endsWith('/') && rawUrl.length > 1 ? rawUrl.slice(0, -1) : rawUrl;

  if (url === '/api/record-click' && req.method === 'POST') {
    const processClick = async (data: any) => {
      try {
        const clientIp =
          (req.headers['x-forwarded-for'] as string) ||
          req.socket.remoteAddress ||
          '127.0.0.1';
        const userAgent = (req.headers['user-agent'] as string) || 'Desconocido';

        const result = await recordClick({
          machineId: data?.machineId || `machine_${Date.now()}`,
          actionType: data?.actionType || 'unknown_action',
          ipAddress: clientIp,
          userAgent: userAgent,
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      } catch (err: any) {
        console.error('[API] Error procesando /api/record-click:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            success: false,
            error: err.message,
          })
        );
      }
    };

    // Si Express ya parseó el body en req.body
    if ((req as any).body !== undefined) {
      await processClick((req as any).body);
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = body ? JSON.parse(body) : {};
        await processClick(data);
      } catch {
        await processClick({});
      }
    });
    return;
  }

  if (url === '/api/stats' && req.method === 'GET') {
    try {
      const stats = await getStats();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(stats));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  if (url === '/api/health' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  next();
}
