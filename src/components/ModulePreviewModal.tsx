import React from 'react';
import { X, Users, BookOpen, ShoppingCart, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export type ModuleType = 'Alumnos' | 'Clases' | 'Pedidos' | 'Monitoreo';

interface ModulePreviewModalProps {
  module: ModuleType | null;
  onClose: () => void;
}

const MODULE_DATA: Record<
  ModuleType,
  {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    color: string;
    stats: { label: string; value: string; change: string }[];
    recent: string[];
  }
> = {
  Alumnos: {
    title: 'Gestión de Alumnos',
    subtitle: 'Base de datos académica centralizada y seguimiento personalizado.',
    icon: Users,
    color: 'from-blue-500 to-cyan-400',
    stats: [
      { label: 'Matriculados Activos', value: '4,280', change: '+12% este ciclo' },
      { label: 'Asistencia Promedio', value: '94.8%', change: 'En meta esperada' },
      { label: 'Nivel Satisfacción', value: '4.9/5', change: 'Encuesta mensual' },
    ],
    recent: [
      'Actualización de ficha: Juan Carlos Ramos (Secundaria 4°)',
      'Constancia de estudios emitida: Mariana Silva',
      'Nueva matrícula registrada: Rodrigo Vargas',
    ],
  },
  Clases: {
    title: 'Horarios y Aulas Virtuales',
    subtitle: 'Planificación docente, sesiones en vivo y repositorios de material.',
    icon: BookOpen,
    color: 'from-cyan-500 to-teal-400',
    stats: [
      { label: 'Sesiones Programadas Hoy', value: '52', change: '100% asignadas' },
      { label: 'Horas Académicas', value: '180 hrs', change: 'Semanal' },
      { label: 'Salas Zoom Integradas', value: '16 activas', change: 'Sin incidencias' },
    ],
    recent: [
      'Clase iniciada: Álgebra Avanzada - Prof. Méndez',
      'Material subido: Guía de Geometría Analítica #04',
      'Grabación procesada: Razonamiento Matemático 5°',
    ],
  },
  Pedidos: {
    title: 'Logística de Materiales y Libros',
    subtitle: 'Despacho de cuadernillos didácticos, kits de examen y suscripciones.',
    icon: ShoppingCart,
    color: 'from-sky-500 to-blue-600',
    stats: [
      { label: 'Guías por Despachar', value: '28', change: 'Listas para recojo' },
      { label: 'Envíos Completados', value: '1,490', change: 'Últimos 30 días' },
      { label: 'Stock Didáctico', value: '98%', change: 'Almacén central' },
    ],
    recent: [
      'Pedido #MTH-8492 entregado en Sede Central',
      'Despacho de Compendios Pre-Universitarios en ruta',
      'Generación de guía de remisión electrónica #2041',
    ],
  },
  Monitoreo: {
    title: 'Monitoreo Docente y Calidad',
    subtitle: 'Supervisión en tiempo real de desempeño, puntualidad y métricas.',
    icon: Activity,
    color: 'from-emerald-500 to-teal-400',
    stats: [
      { label: 'Puntualidad Docente', value: '99.2%', change: 'Récord histórico' },
      { label: 'Docentes en Sesión', value: '24', change: 'Tiempo real' },
      { label: 'Evaluaciones Completas', value: '100%', change: 'Ciclo regular' },
    ],
    recent: [
      'Supervisor ingresó a aula RM-03 (Observación de clase)',
      'Retroalimentación pedagógica enviada a Lic. Paredes',
      'Reporte de auditoría académica quincenal generado',
    ],
  },
};

export const ModulePreviewModal: React.FC<ModulePreviewModalProps> = ({ module, onClose }) => {
  if (!module) return null;

  const data = MODULE_DATA[module];
  const IconComponent = data.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#0b1626] border border-[#1b3152] shadow-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#162a45]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${data.color} flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">{data.title}</h3>
              <p className="text-xs text-[#8da0ba]">{data.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#627794] hover:text-white hover:bg-[#14263f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 my-5">
          {data.stats.map((stat, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#0e1d33] border border-[#1a2f4d]">
              <div className="text-[11px] text-[#7d93b1] font-medium leading-tight">{stat.label}</div>
              <div className="text-lg font-bold text-white mt-1">{stat.value}</div>
              <div className="text-[10px] text-[#38bdf8] mt-0.5">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7d93b1]">Actividad Reciente</div>
          <div className="space-y-2">
            {data.recent.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#0e1b2f] text-xs text-[#9bb0cb]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2dd4bf] shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#162a45] flex items-center justify-between text-xs">
          <span className="text-[#647996]">Módulo operativo activo v4.4</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#142640] hover:bg-[#1b3457] text-[#38bdf8] font-medium flex items-center gap-1.5 transition-colors"
          >
            Entendido <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
