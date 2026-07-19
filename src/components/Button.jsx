import React from 'react';

export default function Button({ children, variant = 'primary', onClick, className = '' }) {
  const baseStyles = "flex items-center justify-between gap-4 font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200";
  
  const variants = {
    // Se actualizó el fondo base a tu azul y se ajustó el color de hover
    primary: "bg-[#2272AF] text-white shadow-[0px_4px_10px_rgba(34,114,175,0.25)] hover:bg-[#1b5b8c] active:scale-[0.98]",
    secondary: "border-2 border-black bg-white text-black hover:bg-neutral-100 active:scale-[0.98]"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}