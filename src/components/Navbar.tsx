import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header" data-theme="dark">
      <nav aria-label="Main navigation" className="nav-bar">
        <div className="nav-side nav-side--left">{navLinks.slice(0, 3).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
        <a className="nav-mark" href="#hero" aria-label="Arthik Dwivedi home">/</a>
        <div className="nav-side nav-side--right">{navLinks.slice(3).map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
        <button className="nav-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-navigation${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map((link, index) => <a key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link.label}</a>)}
      </div>
    </header>
  );
};
