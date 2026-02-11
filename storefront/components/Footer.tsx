export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nội thất</h3>
            <p className="text-gray-300">Nội thất cao cấp cho ngôi nhà thanh lịch của bạn.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Trang chủ</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Sản phẩm</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              <li><a href="/products?category=living-room" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Phòng khách</a></li>
              <li><a href="/products?category=bedroom" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Phòng ngủ</a></li>
              <li><a href="/products?category=dining" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Phòng ăn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@furniture.com</li>
              <li>Điện thoại: +84 123 456 789</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Nội thất. Bản quyền đã được bảo vệ.</p>
        </div>
      </div>
    </footer>
  );
}
