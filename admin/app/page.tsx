'use client';

import { useEffect, useState } from 'react';

interface Stats {
  products: number;
  posts: number;
  orders: number;
  revenue: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, posts: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, postsRes, ordersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/orders`)
        ]);

        const products = await productsRes.json();
        const posts = await postsRes.json();
        const orders = await ordersRes.json();

        const revenue = orders.reduce((sum: number, order: any) => sum + parseFloat(order.totalPrice), 0);

        setStats({
          products: products.length,
          posts: posts.length,
          orders: orders.length,
          revenue: revenue
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Tổng sản phẩm', value: stats.products, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'bg-blue-500' },
    { title: 'Bài viết', value: stats.posts, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-purple-500' },
    { title: 'Tổng đơn hàng', value: stats.orders, icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-green-500' },
    { title: 'Doanh thu', value: `$${stats.revenue.toFixed(2)}`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Tổng quan</h1>
        <p className="text-secondary">Chào mừng đến hệ thống quản lý cửa hàng nội thất</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-primary mb-2">{card.value}</h3>
            <p className="text-secondary">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Thao tác nhanh</h2>
          <div className="space-y-3">
            <a href="/products" className="block px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer">
              + Thêm sản phẩm mới
            </a>
            <a href="/posts" className="block px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer">
              + Tạo bài viết
            </a>
            <a href="/orders" className="block px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
              Xem tất cả đơn hàng
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Thông tin hệ thống</h2>
          <div className="space-y-3 text-secondary">
            <p><strong>Trạng thái:</strong> <span className="text-success">Trực tuyến</span></p>
            <p><strong>Phiên bản:</strong> 1.0.0</p>
            <p><strong>API:</strong> Đã kết nối</p>
            <p><strong>Cơ sở dữ liệu:</strong> MySQL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

