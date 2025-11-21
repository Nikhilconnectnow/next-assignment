'use client';
import Link from 'next/link';

export default function Button({children, href, onClick, className = '', variant = 'primary'}){
  const base = 'fade-in inline-flex items-center gap-2 rounded-md px-4 py-2';
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  };
  const variantClass = variants[variant] || variants.primary;
  const final = `${base} ${variantClass} ${className}`.trim();
  if(href) return <Link href={href} className={final}>{children}</Link>
  return <button onClick={onClick} className={final}>{children}</button>
}
