'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary transition-colors hover:text-accent">
            Furniture
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-accent transition-colors cursor-pointer">
              Products
            </Link>
            <Link href="/blog" className="text-foreground hover:text-accent transition-colors cursor-pointer">
              Blog
            </Link>
            <Link href="/cart" className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer">
              Cart
            </Link>
          </div>

          <button
            className="md:hidden text-foreground cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-accent transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/products" className="text-foreground hover:text-accent transition-colors cursor-pointer">
                Products
              </Link>
              <Link href="/blog" className="text-foreground hover:text-accent transition-colors cursor-pointer">
                Blog
              </Link>
              <Link href="/cart" className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer text-center">
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
