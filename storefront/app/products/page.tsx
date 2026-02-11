'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  material?: string;
  category?: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [material, setMaterial] = useState<string>('all');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category?.id !== selectedCategory) return false;
    if (material !== 'all' && product.material !== material) return false;
    if (priceRange !== 'all') {
      const price = parseFloat(product.price.toString());
      if (priceRange === 'under-500' && price >= 500) return false;
      if (priceRange === '500-1000' && (price < 500 || price > 1000)) return false;
      if (priceRange === 'over-1000' && price <= 1000) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Sản phẩm của chúng tôi</h1>
        <p className="text-lg text-secondary">Khám phá bộ sưu tập nội thất cao cấp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 sticky top-28">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Bộ lọc</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-foreground">Danh mục</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    selectedCategory === null ? 'bg-accent text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  Tất cả
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === cat.id ? 'bg-accent text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-foreground">Khoảng giá</h3>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">Tất cả mức giá</option>
                <option value="under-500">Dưới $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="over-1000">Trên $1000</option>
              </select>
            </div>

            {/* Material Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-foreground">Chất liệu</h3>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">Tất cả chất liệu</option>
                <option value="Wood">Gỗ</option>
                <option value="Metal">Kim loại</option>
                <option value="Fabric">Vải</option>
                <option value="Leather">Da</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setPriceRange('all');
                setMaterial('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200">
              <p className="text-secondary text-lg">Không tìm thấy sản phẩm nào. Thử điều chỉnh bộ lọc của bạn.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                    <p className="text-secondary mb-2 line-clamp-2">{product.description}</p>
                    {product.material && (
                      <p className="text-sm text-secondary mb-3">Chất liệu: {product.material}</p>
                    )}
                    <p className="text-2xl font-bold text-accent">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
