'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Elegant Living Spaces',
      subtitle: 'Transform your home with premium furniture',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop'
    },
    {
      title: 'Luxury Bedroom Collection',
      subtitle: 'Where comfort meets sophistication',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=600&fit=crop'
    },
    {
      title: 'Modern Dining Sets',
      subtitle: 'Create memorable moments',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=600&fit=crop'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products`)
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.slice(0, 6)))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Banner Slider */}
      <section className="relative h-[500px] md:h-[600px] mb-20 rounded-3xl overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8 font-light">{slide.subtitle}</p>
                <Link
                  href="/products"
                  className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer text-lg"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'bg-accent w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Featured Products</h2>
          <p className="text-lg text-secondary">Discover our handpicked collection</p>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundImage: product.images?.[0] ? `url(${product.images[0]})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{product.name}</h3>
                  <p className="text-secondary mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-2xl font-bold text-accent">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-lg text-secondary">Complete interior design solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-200 text-center hover:border-accent transition-colors cursor-pointer">
            <svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-2xl font-semibold mb-3">Interior Design</h3>
            <p className="text-secondary">Professional design consultation for your space</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-200 text-center hover:border-accent transition-colors cursor-pointer">
            <svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <h3 className="text-2xl font-semibold mb-3">Custom Furniture</h3>
            <p className="text-secondary">Bespoke furniture tailored to your needs</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-200 text-center hover:border-accent transition-colors cursor-pointer">
            <svg className="w-16 h-16 mx-auto mb-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h3 className="text-2xl font-semibold mb-3">Free Delivery</h3>
            <p className="text-secondary">Fast and safe delivery to your doorstep</p>
          </div>
        </div>
      </section>
    </div>
  );
}

