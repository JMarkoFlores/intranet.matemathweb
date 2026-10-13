import React from 'react';
import { LogOut, LayoutDashboard, Users, BookOpen, ShoppingBag, BarChart3, Bell, CheckCircle } from 'lucide-react';
import { MatemathLogo } from './MatemathLogo';

interface DashboardPreviewProps {
  user: {
    username: string;
    email?: string;
  };
  onLogout: () => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#060b14] text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#152742] bg-[#091424]/80 backdrop-blur px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MatemathLogo size={36} />
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Matemath Intranet
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                En línea
              </span>
            </div>
            <div className="text-[11px] text-[#7187a7]">Centro de Operaciones Académicas</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg bg-[#0e1d33] border border-[#1b3457] text-[#8ea2be] hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#38bdf8]" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-[#152742]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xs">
              {user.username.slice(0, 1).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white">{user.username}</div>
              <div className="text-[10px] text-[#7187a7]">{user.email || 'Operador Académico'}</div>
            </div>
            <button
              onClick={onLogout}
              title="Cerrar sesión"
              className="p-1.5 rounded-lg text-[#8ea2be] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c1c33] via-[#0e2443] to-[#0a182b] border border-[#1d3860] relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-3">
              <CheckCircle className="w-3.5 h-3.5" /> Sesión Iniciada Correctamente
            </div>
            <h1 className="text-2xl font-bold text-white">¡Bienvenido al Panel Matemath, {user.username}!</h1>
            <p className="text-sm text-[#8fa7c9] mt-1 max-w-2xl">
              Has accedido con éxito a la intranet de gestión central. Todos los módulos operativos se encuentran en sincronización continua.
            </p>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
            <MatemathLogo size={140} />
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0b1627] border border-[#172c4a]">
            <div className="flex items-center justify-between text-[#7d95b7] text-xs">
              <span>Alumnos Conectados</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">1,842</div>
            <div className="text-[11px] text-emerald-400 mt-1">+8.4% vs semana anterior</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1627] border border-[#172c4a]">
            <div className="flex items-center justify-between text-[#7d95b7] text-xs">
              <span>Clases en Directo</span>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">18 salas</div>
            <div className="text-[11px] text-cyan-400 mt-1">Capacidad al 92%</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1627] border border-[#172c4a]">
            <div className="flex items-center justify-between text-[#7d95b7] text-xs">
              <span>Pedidos de Guías</span>
              <ShoppingBag className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">34 pendientes</div>
            <div className="text-[11px] text-[#8fa7c9] mt-1">Listo para embalaje</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1627] border border-[#172c4a]">
            <div className="flex items-center justify-between text-[#7d95b7] text-xs">
              <span>Monitoreo Docente</span>
              <BarChart3 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">99.2%</div>
            <div className="text-[11px] text-emerald-400 mt-1">Calificación sobresaliente</div>
          </div>
        </div>

        {/* Return button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onLogout}
            className="px-6 py-2.5 rounded-xl bg-[#0e1d33] hover:bg-[#152b4c] border border-[#1e3b66] text-sm text-[#38bdf8] font-medium transition-all shadow-lg flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Volver a la pantalla de Acceso
          </button>
        </div>
      </main>
    </div>
  );
};
