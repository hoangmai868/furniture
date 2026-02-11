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
    material: '',
    stock: '',
    categoryId: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

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
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Lỗi khi tải danh mục:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const uploadImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return [];
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        return data.images;
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên:', error);
      alert('Lỗi khi tải ảnh lên');
    }
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images first if any files selected
    let imageUrls = uploadedImages;
    if (selectedFiles && selectedFiles.length > 0) {
      const newImages = await uploadImages();
      imageUrls = [...uploadedImages, ...newImages];
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      images: imageUrls,
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
        alert(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm thành công!');
      } else {
        const error = await res.json();
        alert('Lỗi: ' + (error.message || 'Không thể lưu sản phẩm'));
      }
    } catch (error) {
      console.error('Lỗi khi lưu sản phẩm:', error);
      alert('Lỗi khi lưu sản phẩm');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      material: product.material || '',
      stock: product.stock.toString(),
      categoryId: product.categoryId?.toString() || ''
    });
    setUploadedImages(product.images || []);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchProducts();
        alert('Xóa sản phẩm thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      material: '',
      stock: '',
      categoryId: ''
    });
    setSelectedFiles(null);
    setUploadedImages([]);
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Sản phẩm</h1>
          <p className="text-secondary">Quản lý kho hàng nội thất của bạn</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
        >
          {showForm ? 'Hủy' : '+ Thêm sản phẩm'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Sản phẩm mới'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Giá *</label>
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
                <label className="block text-sm font-semibold mb-2">Chất liệu</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Số lượng *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Danh mục</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Hình ảnh (có thể chọn nhiều)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-xs text-gray-500 mt-1">Chọn nhiều ảnh để tải lên (tối đa 10 ảnh, mỗi ảnh 5MB)</p>
              </div>
            </div>

            {uploadedImages.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Ảnh đã tải lên</label>
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${img}`} 
                        alt={`Product ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeUploadedImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Mô tả</label>
              <textarea
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
                {editingProduct ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Giá</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Số lượng</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Chất liệu</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-primary">Thao tác</th>
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
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-danger hover:text-danger/80 cursor-pointer"
                  >
                    Xóa
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
