import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Database, 
  ExternalLink, 
  X, 
  Lock, 
  Monitor, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { PhishingResponse } from '../utils/machineId';

interface PhishingModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'login_button' | 'google_button';
  data: PhishingResponse | null;
}

export const PhishingModal: React.FC<PhishingModalProps> = ({
  isOpen,
  onClose,
  actionType,
  data,
}) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  if (!isOpen) return null;

  const actionName =
    actionType === 'login_button' ? 'Iniciar sesión' : 'Continuar con Google';

  const isFirstClick = data?.isNew ?? true;
  const clickCount = data?.totalClicksForMachine ?? 1;
  const isDbConnected = data?.dbConnected ?? false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#091322] border border-rose-500/30 text-white shadow-[0_20px_70px_rgba(244,63,94,0.18)] p-6 sm:p-8 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow de advertencia en el encabezado */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-rose-500/15 blur-3xl pointer-events-none" />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner mb-4">
            <ShieldAlert className="w-9 h-9 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulación de Phishing Interna</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ¡Alto ahí! Esto fue una prueba de phishing
          </h2>

          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Has hecho clic en <span className="font-semibold text-rose-300">"{actionName}"</span> pensando que este era un portal de acceso oficial.
          </p>
        </div>

        {/* Tarjeta de Registro y Base de Datos Postgres */}
        <div className="mt-5 p-4 rounded-xl bg-[#0e1d33] border border-[#1c365d] space-y-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-2 text-slate-300">
              <Monitor className="w-4 h-4 text-sky-400" />
              Estado de tu equipo en la prueba:
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                isFirstClick
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isFirstClick ? '1er Registro' : `Clic #${clickCount} (Ignorado en BD)`}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-normal">
            {isFirstClick ? (
              <>
                🎯 <strong>Tu máquina ha sido registrada por 1ª vez.</strong> Este evento quedó asentado en la base de datos de PostgreSQL con fines de métricas de concientización.
              </>
            ) : (
              <>
                ⚠️ <strong>Esta misma máquina ya fue registrada previamente.</strong> Aunque hagas clic varias veces, la base de datos mantiene <span className="text-sky-300 font-semibold">1 único registro por máquina</span> y solo acumula el contador (Total clics en tu equipo: {clickCount}).
              </>
            )}
          </p>

          {/* Estado de PostgreSQL */}
          <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              Base de Datos PostgreSQL:
            </span>
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                isDbConnected ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDbConnected ? 'bg-emerald-400' : 'bg-amber-400'
                } animate-pulse`}
              />
              {isDbConnected ? 'Conectada & Registrado' : 'Servicio local pendiente (.env)'}
            </span>
          </div>

          {/* Estadísticas acumuladas si están disponibles */}
          {data?.stats && (
            <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <div className="text-[10px] text-slate-400">Máquinas únicas</div>
                <div className="text-sm font-bold text-sky-400">{data.stats.uniqueMachines}</div>
              </div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <div className="text-[10px] text-slate-400">Clics totales</div>
                <div className="text-sm font-bold text-amber-400">{data.stats.totalClicks}</div>
              </div>
            </div>
          )}
        </div>

        {/* Consejos educativos de ciberseguridad */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1.5">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            ¿Cómo evitar caer en phishing real?
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-300">
            <li>
              <strong>Verifica la URL en la barra de direcciones:</strong> Asegúrate de que termine exactamente en el dominio oficial de la empresa.
            </li>
            <li>
              <strong>Cuidado con los correos y mensajes:</strong> Los atacantes usan páginas idénticas para capturar contraseñas.
            </li>
            <li>
              <strong>Nunca reutilices contraseñas</strong> ni las escribas si tienes dudas de la autenticidad del sitio.
            </li>
          </ul>
        </div>

        {/* Desplegable de detalles técnicos */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full flex items-center justify-between text-[11px] text-slate-400 hover:text-slate-200 py-1 cursor-pointer transition-colors"
          >
            <span>Detalles técnicos del registro</span>
            {showTechnicalDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {showTechnicalDetails && (
            <div className="mt-1.5 p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-slate-400 space-y-1 break-all">
              <div><strong>Machine ID:</strong> {data?.machineId || 'N/A'}</div>
              <div><strong>Acción:</strong> {actionType}</div>
              <div><strong>Respuesta servidor:</strong> {data?.message || 'Correcto'}</div>
            </div>
          )}
        </div>

        {/* Botón de acción */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-[0_4px_20px_rgba(244,63,94,0.35)] transition-all active:scale-[0.99] cursor-pointer text-center"
          >
            Entendido, volver a la prueba
          </button>
        </div>
      </div>
    </div>
  );
};
