/**
 * Generador y gestor de identificador único de máquina / dispositivo.
 * Se guarda de forma persistente en localStorage para asegurar que,
 * aunque la persona haga 5 o más clics en la misma máquina, se envíe
 * exactamente el mismo identificador único.
 */

const STORAGE_KEY = 'matemath_phishing_machine_uuid';

export function getOrCreateMachineId(): string {
  try {
    let machineId = localStorage.getItem(STORAGE_KEY);
    if (machineId && machineId.trim().length > 0) {
      return machineId;
    }

    // Generar UUID seguro o pseudoaleatorio
    const randomUuid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'uuid_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    // Complementar con huella básica de pantalla y entorno del equipo
    const screenInfo = typeof window !== 'undefined' && window.screen 
      ? `${window.screen.width}x${window.screen.height}_${window.screen.colorDepth}` 
      : 'scr';
    const timeZone = typeof Intl !== 'undefined' 
      ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/\//g, '_')
      : 'tz';

    machineId = `mach_${randomUuid}_${screenInfo}_${timeZone}`;
    localStorage.setItem(STORAGE_KEY, machineId);
    return machineId;
  } catch {
    // Si localStorage está bloqueado (modo incógnito estricto), generar fallback
    return `mach_temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

export interface PhishingResponse {
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

export async function sendPhishingClick(actionType: 'login_button' | 'google_button'): Promise<PhishingResponse> {
  const machineId = getOrCreateMachineId();

  try {
    const res = await fetch('/api/record-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        machineId,
        actionType,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }

    const data: PhishingResponse = await res.json();
    return data;
  } catch (err: any) {
    console.warn('[Phishing Simulation] Error comunicando con backend:', err.message);
    // Fallback en caso de que el backend esté reiniciándose
    return {
      success: true,
      isNew: false,
      totalClicksForMachine: 1,
      machineId,
      dbConnected: false,
      message: 'Simulación interceptada en cliente.',
    };
  }
}
