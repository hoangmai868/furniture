#!/bin/bash

# Furniture E-Commerce - Sample Data Seeder
# This script populates the database with sample data

API_URL="${API_URL:-http://localhost:3001}"

echo "🌱 Seeding sample data to $API_URL"
echo "-----------------------------------"

# Create Categories
echo "📁 Creating categories..."

curl -s -X POST "$API_URL/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Living Room",
    "description": "Comfortable and stylish furniture for your living space"
  }' > /dev/null

curl -s -X POST "$API_URL/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bedroom",
    "description": "Cozy furniture for restful nights"
  }' > /dev/null

curl -s -X POST "$API_URL/categories" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dining Room",
    "description": "Elegant dining sets for family gatherings"
  }' > /dev/null

echo "✅ Categories created"

# Create Products
echo "🛋️  Creating products..."

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Velvet Sofa",
    "description": "Premium 3-seater sofa with plush velvet upholstery. Perfect centerpiece for any living room.",
    "price": 1299.99,
    "stock": 15,
    "material": "Velvet",
    "categoryId": 1,
    "images": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]
  }' > /dev/null

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Modern Coffee Table",
    "description": "Sleek glass-top coffee table with elegant metal frame. Contemporary design.",
    "price": 349.99,
    "stock": 25,
    "material": "Glass & Metal",
    "categoryId": 1,
    "images": ["https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800"]
  }' > /dev/null

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "King Size Platform Bed",
    "description": "Solid wood platform bed with upholstered headboard. Storage drawers included.",
    "price": 899.99,
    "stock": 10,
    "material": "Wood & Fabric",
    "categoryId": 2,
    "images": ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800"]
  }' > /dev/null

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bedside Table Set",
    "description": "Matching pair of contemporary bedside tables with drawers. Walnut finish.",
    "price": 299.99,
    "stock": 20,
    "material": "Wood",
    "categoryId": 2,
    "images": ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]
  }' > /dev/null

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "6-Seater Dining Set",
    "description": "Elegant dining table with 6 cushioned chairs. Perfect for family dinners.",
    "price": 1599.99,
    "stock": 8,
    "material": "Wood & Leather",
    "categoryId": 3,
    "images": ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"]
  }' > /dev/null

curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buffet Cabinet",
    "description": "Spacious storage cabinet for dining room. Glass doors display your fine china.",
    "price": 749.99,
    "stock": 12,
    "material": "Wood & Glass",
    "categoryId": 3,
    "images": ["https://images.unsplash.com/photo-1595428773944-8f58b9fa0b61?w=800"]
  }' > /dev/null

echo "✅ Products created"

# Create Blog Posts
echo "📝 Creating blog posts..."

curl -s -X POST "$API_URL/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "5 Interior Design Trends for 2024",
    "content": "As we step into 2024, interior design continues to evolve with fresh perspectives and innovative ideas. Here are the top 5 trends to watch:\n\n1. Sustainable Materials: Eco-friendly furniture made from reclaimed wood and recycled materials is becoming increasingly popular.\n\n2. Multifunctional Spaces: With remote work becoming permanent, homes need adaptable spaces that serve multiple purposes.\n\n3. Bold Colors: Move over neutrals - 2024 is all about rich, saturated colors that make a statement.\n\n4. Curved Furniture: Soft, rounded edges create a more welcoming and comfortable atmosphere.\n\n5. Natural Textures: Incorporating natural materials like rattan, jute, and stone brings warmth to any space.",
    "thumbnail": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    "published": true
  }' > /dev/null

curl -s -X POST "$API_URL/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to Choose the Perfect Sofa",
    "content": "Selecting the right sofa is one of the most important furniture decisions you will make. Here is our comprehensive guide:\n\nSize Matters: Measure your space carefully. Your sofa should fit comfortably without overwhelming the room.\n\nConsider Your Lifestyle: Do you have pets or children? Choose durable, stain-resistant fabrics.\n\nComfort is Key: Sit on the sofa before buying. The depth, height, and cushion firmness should suit your preferences.\n\nStyle Coordination: Your sofa should complement your existing decor while expressing your personal style.\n\nQuality Construction: Look for hardwood frames, eight-way hand-tied springs, and high-density foam cushions.",
    "thumbnail": "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
    "published": true
  }' > /dev/null

curl -s -X POST "$API_URL/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Creating a Cozy Bedroom Retreat",
    "content": "Your bedroom should be a sanctuary - a place to relax and recharge. Here are our tips for creating the ultimate bedroom retreat:\n\nInvest in Quality Bedding: High thread count sheets and a supportive mattress make all the difference.\n\nLayer Your Lighting: Combine ambient, task, and accent lighting to create the perfect mood.\n\nMinimize Clutter: Keep surfaces clear and use smart storage solutions to maintain a peaceful environment.\n\nChoose Calming Colors: Soft blues, greens, and neutrals promote relaxation.\n\nAdd Personal Touches: Display meaningful artwork and photos that bring you joy.",
    "thumbnail": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    "published": true
  }' > /dev/null

echo "✅ Blog posts created"

echo ""
echo "🎉 Sample data seeding complete!"
echo "-----------------------------------"
echo "You can now:"
echo "  - Visit the storefront at http://localhost:3000"
echo "  - Access the admin at http://localhost:3002"
echo "  - View API at http://localhost:3001"
