import React from 'react';
import logoImg from '../assets/logo.png';

interface MatemathLogoProps {
  className?: string;
  size?: number | string;
}

export const MatemathLogo: React.FC<MatemathLogoProps> = ({ className = '', size = 80 }) => {
  const width = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width }}
      aria-label="Matemath Logo"
    >
      <img
        src={logoImg}
        alt="Matemath Logo"
        className="w-full h-auto object-contain drop-shadow-[0_4px_20px_rgba(25,114,245,0.35)]"
      />
    </div>
  );
};
