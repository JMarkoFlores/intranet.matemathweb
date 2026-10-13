import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (email: string, name: string) => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({ isOpen, onClose, onSelectAccount }) => {
  if (!isOpen) return null;

  const accounts = [
    { name: 'Jean Pacheco', email: 'jeanmpachecof@gmail.com', avatarBg: 'bg-emerald-600' },
    { name: 'Prof. Operaciones Matemath', email: 'admin@matemath.edu.pe', avatarBg: 'bg-blue-600' },
    { name: 'Coordinación Académica', email: 'coordinacion@matemath.edu.pe', avatarBg: 'bg-indigo-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white text-slate-800 shadow-2xl p-6 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Google Logo */}
          <svg className="w-8 h-8 mb-3" viewBox="0 0 24 24">
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

          <h3 className="text-base font-semibold text-slate-900">Acceder con Google</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            para continuar a <strong className="text-slate-700">Matemath Intranet</strong>
          </p>
        </div>

        {/* Account list */}
        <div className="mt-5 space-y-1.5 divide-y divide-slate-100">
          {accounts.map((acc, index) => (
            <button
              key={index}
              onClick={() => onSelectAccount(acc.email, acc.name)}
              className="w-full pt-2 pb-2 px-2 flex items-center gap-3 text-left hover:bg-slate-50 rounded-lg transition-colors group"
            >
              <div
                className={`w-9 h-9 rounded-full ${acc.avatarBg} text-white flex items-center justify-center font-semibold text-xs shadow-sm`}
              >
                {acc.name.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  {acc.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Autenticación protegida mediante protocolo SSL de Google Workspace.</span>
        </div>
      </div>
    </div>
  );
};
