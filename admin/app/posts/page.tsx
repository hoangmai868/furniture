'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    published: true
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPost
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts/${editingPost.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`;

      const method = editingPost ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchPosts();
        resetForm();
        alert(editingPost ? 'Bài viết đã được cập nhật!' : 'Bài viết đã được tạo!');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Lỗi lưu bài viết');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail || '',
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchPosts();
        alert('Bài viết đã được xóa!');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Lỗi xóa bài viết');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      thumbnail: '',
      published: true
    });
    setEditingPost(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Bài viết</h1>
          <p className="text-secondary">Quản lý nội dung blog và bài viết</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
        >
          {showForm ? 'Hủy' : '+ Thêm bài viết'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            {editingPost ? 'Sửa bài viết' : 'Bài viết mới'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tiêu đề *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">URL hình ảnh thumbnail</label>
              <input
                type="text"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Nội dung *</label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Viết nội dung bài viết của bạn ở đây..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 text-accent focus:ring-2 focus:ring-accent border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="published" className="ml-2 text-sm font-semibold cursor-pointer">
                Đã xuất bản (hiển thị trên cửa hàng)
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
              >
                {editingPost ? 'Cập nhật bài viết' : 'Tạo bài viết'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {post.thumbnail && (
              <div className="h-48 bg-gray-200">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${post.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  post.published ? 'bg-success text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {post.published ? 'Đã xuất bản' : 'Nháp'}
                </span>
                <span className="text-sm text-secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">{post.title}</h3>
              <p className="text-secondary mb-4 line-clamp-3">{post.content}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors cursor-pointer text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors cursor-pointer text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
