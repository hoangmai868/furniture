'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  material?: string;
  stock: number;
  categoryId?: number;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: '',
    material: '',
    stock: '',
    categoryId: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      images: formData.images.split(',').map(img => img.trim()),
      material: formData.material || undefined,
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : undefined
    };

    try {
      const url = editingProduct
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/${editingProduct.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products`;

      const method = editingProduct ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        fetchProducts();
        resetForm();
        alert(editingProduct ? 'Product updated!' : 'Product created!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      images: product.images.join(', '),
      material: product.material || '',
      stock: product.stock.toString(),
      categoryId: product.categoryId?.toString() || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchProducts();
        alert('Product deleted!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      images: '',
      material: '',
      stock: '',
      categoryId: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Products</h1>
          <p className="text-secondary">Manage your furniture inventory</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Stock *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Images (comma-separated URLs)</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Material</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-primary">{product.name}</div>
                  <div className="text-sm text-secondary line-clamp-1">{product.description}</div>
                </td>
                <td className="px-6 py-4 text-accent font-semibold">${product.price}</td>
                <td className="px-6 py-4 text-secondary">{product.stock}</td>
                <td className="px-6 py-4 text-secondary">{product.material || 'N/A'}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-accent hover:text-accent/80 mr-4 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-danger hover:text-danger/80 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
