export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Furniture</h3>
            <p className="text-gray-300">Premium furniture for your elegant home.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Products</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/products?category=living-room" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Living Room</a></li>
              <li><a href="/products?category=bedroom" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Bedroom</a></li>
              <li><a href="/products?category=dining" className="text-gray-300 hover:text-accent transition-colors cursor-pointer">Dining</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@furniture.com</li>
              <li>Phone: +84 123 456 789</li>
              <li>Address: Hanoi, Vietnam</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
