import { GolfCart } from '../types';

// Mock data for golf carts
const golfCarts: GolfCart[] = [
  {
    id: '1',
    name: 'Luxury Pro 2000',
    description: 'Our flagship luxury golf cart with premium features and unmatched comfort.',
    price: 12999.99,
    imageUrl: 'https://images.unsplash.com/photo-1580674684071-9c4bb14eaa63?q=80&w=500',
    features: [
      'Premium leather seats',
      'Advanced suspension',
      'Smart navigation',
      'Custom paint options'
    ],
    inStock: true
  },
  {
    id: '2',
    name: 'Classic Elite',
    description: 'Timeless design with modern comforts and reliability.',
    price: 8999.99,
    imageUrl: 'https://images.unsplash.com/photo-1580674877276-849a510ef001?q=80&w=500',
    features: [
      'Comfortable seating',
      'Classic wood trim',
      'Built-in cooler',
      'Rain cover'
    ],
    inStock: true
  },
  {
    id: '3',
    name: 'Sport GTX',
    description: 'Performance-focused golf cart for the enthusiast.',
    price: 14999.99,
    imageUrl: 'https://images.unsplash.com/photo-1580674878946-ec72073b0a62?q=80&w=500',
    features: [
      'Sport suspension',
      'Racing seats',
      'Performance tires',
      'Digital dashboard'
    ],
    inStock: true
  },
  {
    id: '4',
    name: 'Executive Package',
    description: 'Enhanced with premium audio and extended range battery.',
    price: 15499.99,
    imageUrl: 'https://images.unsplash.com/photo-1580674684074-2faae0067d60?q=80&w=500',
    features: [
      'Premium audio system',
      'Extended range battery',
      'Executive leather seats',
      'Personal climate control'
    ],
    inStock: false
  }
];

export const getGolfCarts = (): GolfCart[] => {
  return golfCarts;
};

export const getGolfCartById = (id: string): GolfCart | undefined => {
  return golfCarts.find(cart => cart.id === id);
}; 