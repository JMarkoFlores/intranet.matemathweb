/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Sun, Moon, Sparkles, HelpCircle, Check, Loader2 } from 'lucide-react';
import { MatemathLogo } from './components/MatemathLogo';
import { NetworkBackground } from './components/NetworkBackground';
import { ModulePreviewModal, ModuleType } from './components/ModulePreviewModal';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { DashboardPreview } from './components/DashboardPreview';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; email?: string } | null>(null);

  // Modals & Interactive features
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!username.trim()) {
      setLoginError('Por favor, ingresa tu nombre de usuario o correo');
      return;
    }
    if (!password) {
      setLoginError('Por favor, ingresa tu contraseña de acceso');
      return;
    }

    setIsLoading(true);
    // Simulate network authentication
    setTimeout(() => {
      setIsLoading(false);
      setLoggedInUser({
        username: username.trim(),
        email: username.includes('@') ? username : `${username}@matemath.edu.pe`,
      });
    }, 900);
  };

  const handleQuickDemoFill = () => {
    setUsername('admin.academico');
    setPassword('Matemath2026*');
    setLoginError('');
  };

  const handleGoogleSuccess = (email: string, name: string) => {
    setIsGoogleModalOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoggedInUser({
        username: name,
        email: email,
      });
    }, 600);
  };

  // If user is logged in, show the interactive intranet dashboard
  if (loggedInUser) {
    return (
      <DashboardPreview
        user={loggedInUser}
        onLogout={() => {
          setLoggedInUser(null);
          setUsername('');
          setPassword('');
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden flex flex-col font-sans transition-colors duration-300 ${
        themeMode === 'dark' ? 'bg-[#060b14] text-white' : 'bg-slate-900 text-white'
      }`}
    >
      {/* Ambient background lighting */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 700px at 25% 48%, rgba(14, 68, 110, 0.22) 0%, rgba(6, 25, 45, 0.08) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10 min-h-screen">
        {/* ========================================================
            LEFT COLUMN: Centered Login Card
           ======================================================== */}
        <section className="flex items-center justify-center p-4 sm:p-8 lg:p-12 relative">
          {/* Subtle soft backdrop glow behind the card */}
          <div className="absolute w-[440px] h-[520px] rounded-full bg-[#0284c7]/10 blur-[80px] pointer-events-none" />

          {/* Login Card */}
          <div className="relative w-full max-w-[436px] rounded-[28px] bg-[#0a1424]/95 backdrop-blur-xl border border-[#172b47] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-7 sm:p-9 md:p-10 transition-all duration-300">
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <MatemathLogo size={84} />
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mt-4">
              <h1 className="text-[25px] sm:text-[27px] font-bold text-white tracking-tight leading-tight">
                Ingresa a tu cuenta
              </h1>
              <p className="text-[13.5px] text-[#869ab8] mt-1.5 leading-normal">
                Accede al panel interno de gestión Matemath.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="mt-7">
              {/* Error notification if any */}
              {loginError && (
                <div className="mb-4 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Usuario Field */}
              <div className="space-y-1.5">
                <label htmlFor="usuario-input" className="text-[13px] font-medium text-[#869ab8] block">
                  Usuario
                </label>
                <div className="relative flex items-center rounded-xl bg-[#0e1c31] border border-[#1b3152] focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-[#0284c7]/20 transition-all">
                  <User className="w-[18px] h-[18px] text-[#556e91] ml-3.5 shrink-0 pointer-events-none" />
                  <input
                    id="usuario-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tu.usuario"
                    className="w-full bg-transparent pl-3 pr-4 py-3 text-[14px] text-white placeholder-[#455b79] outline-none"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Contraseña Field */}
              <div className="space-y-1.5 mt-4">
                <label htmlFor="password-input" className="text-[13px] font-medium text-[#869ab8] block">
                  Contraseña
                </label>
                <div className="relative flex items-center rounded-xl bg-[#0e1c31] border border-[#1b3152] focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-[#0284c7]/20 transition-all">
                  <Lock className="w-[18px] h-[18px] text-[#556e91] ml-3.5 shrink-0 pointer-events-none" />
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-3 pr-10 py-3 text-[14px] text-white placeholder-[#455b79] outline-none"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-[#556e91] hover:text-[#9bb0cb] transition-colors focus:outline-none"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Iniciar sesión Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full py-3.5 px-4 rounded-xl font-semibold text-white text-[15px] bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] shadow-[0_4px_22px_rgba(2,132,199,0.4)] hover:shadow-[0_6px_28px_rgba(56,189,248,0.55)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Iniciando...</span>
                  </>
                ) : (
                  <span>Iniciar sesión</span>
                )}
              </button>

              {/* Divider 'o' */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-[#172b47]" />
                <span className="text-xs text-[#556e91] font-normal px-1">o</span>
                <div className="h-[1px] flex-1 bg-[#172b47]" />
              </div>

              {/* Continuar con Google */}
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0d1a2d] hover:bg-[#12233e] border border-[#1b3152] flex items-center justify-center gap-3 text-[14px] font-medium text-white transition-all active:scale-[0.99] cursor-pointer"
              >
                {/* Official Google G Logo */}
                <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continuar con Google</span>
              </button>
            </form>

            {/* Quick Demo Fill link for convenience */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-[#556e91]">
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="hover:text-[#38bdf8] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                <span>Rellenar demo</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginError('Para recuperar tus credenciales, contacta a soporte@matemath.edu.pe')}
                className="hover:text-[#869ab8] transition-colors cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Footer label */}
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() => setIsVersionModalOpen(true)}
                className="text-xs text-[#526685] hover:text-[#7f99be] transition-colors cursor-pointer font-normal tracking-wide"
              >
                Matemath Intranet · 4.4.27
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            RIGHT COLUMN: Centro de Operaciones & Network Constellation
           ======================================================== */}
        <section className="relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-[#122238]/70 overflow-hidden min-h-[500px] lg:min-h-screen">
          {/* Mathematical Constellation SVG & Ambient Symbols */}
          <NetworkBackground />

          {/* Top Bar on Right: Theme toggle & Quick Help */}
          <div className="relative z-20 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              title={themeMode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-9 h-9 rounded-lg bg-[#0b1626] border border-[#182d4c] flex items-center justify-center text-[#7e95b5] hover:text-white hover:border-[#2d4b7a] transition-all cursor-pointer shadow-sm"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Center-Lower Content Block: Centro de Operaciones */}
          <div className="relative z-20 max-w-xl my-auto py-10 lg:py-0">
            {/* Pill: CENTRO DE OPERACIONES */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0d1d33]/90 border border-[#1b365b] text-[#38bdf8] text-[11px] font-semibold tracking-wider uppercase mb-5 shadow-sm">
              CENTRO DE OPERACIONES
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.18] text-white">
              Todo tu equipo académico,{' '}
              <span className="text-[#38bdf8] block sm:inline">en un solo lugar</span>
            </h2>

            {/* Paragraph Description */}
            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#869ab8] max-w-lg font-normal">
              Coordina alumnos, clases, pedidos y monitoreo docente con una intranet pensada para mover tu operación más
              rápido.
            </p>

            {/* Feature Badges / Buttons */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {(['Alumnos', 'Clases', 'Pedidos', 'Monitoreo'] as ModuleType[]).map((module) => (
                <button
                  key={module}
                  onClick={() => setSelectedModule(module)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0c182b] border border-[#182d4c] text-xs font-medium text-[#9bb0cb] hover:text-white hover:border-[#2d4b7a] hover:bg-[#11233e] transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5 group"
                >
                  <span>{module}</span>
                  <span className="w-1 h-1 rounded-full bg-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom subtle note on the right pane */}
          <div className="relative z-20 flex items-center justify-between text-xs text-[#526685] pt-4">
            <span className="hidden sm:inline">Plataforma Académica Matemath © 2026</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Servidores operativos
            </span>
          </div>
        </section>
      </div>

      {/* Interactive Modals */}
      <ModulePreviewModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />

      <GoogleSignInModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleGoogleSuccess}
      />

      {/* Version & Info Modal */}
      {isVersionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setIsVersionModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#0b1626] border border-[#1b3152] p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <MatemathLogo size={36} />
              <div>
                <h3 className="font-bold text-sm text-white">Matemath Intranet</h3>
                <p className="text-xs text-[#7187a7]">Versión 4.4.27 (Build 2026.10)</p>
              </div>
            </div>

            <p className="text-xs text-[#8ea2be] leading-relaxed">
              Sistema integral de administración académica, seguimiento de alumnos, aula virtual y despacho de materiales didácticos.
            </p>

            <div className="p-3 rounded-xl bg-[#0e1d33] text-xs space-y-1.5 border border-[#182f4d]">
              <div className="text-[11px] text-[#38bdf8] font-semibold">Novedades de la versión:</div>
              <div className="text-[#9bb0cb] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Monitoreo docente con métricas en tiempo real.
              </div>
              <div className="text-[#9bb0cb] flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Optimización del módulo de pedidos y guías didácticas.
              </div>
            </div>

            <button
              onClick={() => setIsVersionModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#142640] hover:bg-[#1b3457] text-[#38bdf8] text-xs font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
