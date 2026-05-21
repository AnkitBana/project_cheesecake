import { Product as ApiProduct } from '../types';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

// Convert sample product to API product format for cart
export const toApiProduct = (product: Product): ApiProduct => ({
  id: product.id,
  name: product.name,
  slug: product.name.toLowerCase().replace(/\s+/g, '-'),
  description: product.description,
  price: product.price,
  compareAtPrice: undefined,
  sku: `CAKE-${product.id}`,
  stock: product.inStock ? 100 : 0,
  images: [product.image],
  categoryId: product.category,
  isActive: true,
  isFeatured: product.featured,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Classic New York Cheesecake',
    description: 'Rich and creamy traditional New York-style cheesecake with a graham cracker crust. A timeless favorite that melts in your mouth.',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&q=80',
    category: 'Classic',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Strawberry Swirl Cheesecake',
    description: 'Velvety cheesecake swirled with fresh strawberry puree, topped with glazed strawberries. A fruity delight!',
    price: 52.99,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    category: 'Fruit',
    rating: 4.8,
    reviews: 189,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Chocolate Truffle Cheesecake',
    description: 'Decadent chocolate cheesecake with layers of dark chocolate ganache and chocolate cookie crust. A chocolate lover\'s dream!',
    price: 58.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    category: 'Chocolate',
    rating: 5.0,
    reviews: 312,
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Blueberry Bliss Cheesecake',
    description: 'Light and fluffy cheesecake topped with homemade blueberry compote and fresh blueberries. Simply divine!',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
    category: 'Fruit',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    name: 'Salted Caramel Cheesecake',
    description: 'Smooth cheesecake drizzled with salted caramel sauce and topped with caramel shards. Sweet and salty perfection!',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
    category: 'Specialty',
    rating: 4.9,
    reviews: 278,
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Oreo Cookie Cheesecake',
    description: 'Cookies and cream cheesecake loaded with Oreo pieces, on an Oreo cookie crust. A cookie lover\'s paradise!',
    price: 51.99,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
    category: 'Specialty',
    rating: 4.8,
    reviews: 201,
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Lemon Zest Cheesecake',
    description: 'Refreshing lemon cheesecake with a tangy lemon curd topping and lemon zest. Perfect for citrus lovers!',
    price: 47.99,
    image: 'https://images.unsplash.com/photo-1567327519515-3a5f3d1d7b6e?w=800&q=80',
    category: 'Fruit',
    rating: 4.6,
    reviews: 143,
    inStock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Red Velvet Cheesecake',
    description: 'Luxurious red velvet cake layered with cream cheese frosting and cheesecake. An elegant showstopper!',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
    category: 'Specialty',
    rating: 5.0,
    reviews: 267,
    inStock: true,
    featured: true,
  },
  {
    id: '9',
    name: 'Raspberry White Chocolate',
    description: 'Creamy white chocolate cheesecake with raspberry swirls and white chocolate shavings. Elegantly delicious!',
    price: 56.99,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    category: 'Fruit',
    rating: 4.9,
    reviews: 198,
    inStock: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Pumpkin Spice Cheesecake',
    description: 'Seasonal favorite with warm pumpkin spices, topped with whipped cream and cinnamon. Perfect for fall!',
    price: 48.99,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    category: 'Seasonal',
    rating: 4.7,
    reviews: 167,
    inStock: true,
    featured: false,
  },
  {
    id: '11',
    name: 'Matcha Green Tea Cheesecake',
    description: 'Unique Japanese-inspired cheesecake with premium matcha powder. Earthy and not too sweet!',
    price: 53.99,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    category: 'Specialty',
    rating: 4.5,
    reviews: 124,
    inStock: true,
    featured: false,
  },
  {
    id: '12',
    name: 'Tiramisu Cheesecake',
    description: 'Italian-inspired cheesecake with espresso-soaked ladyfingers and mascarpone. Coffee and dessert in one!',
    price: 57.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    category: 'Specialty',
    rating: 4.9,
    reviews: 245,
    inStock: true,
    featured: true,
  },
];

export const categories = [
  'All',
  'Classic',
  'Fruit',
  'Chocolate',
  'Specialty',
  'Seasonal',
];

// Made with Bob
