export interface GolfCart {
  id: string;
  model_name: string;
  description: string;
  price: string;
  manufacturer: string;
  year: number;
  color: string;
  seats: number;
  battery_capacity: string;
  max_speed: number;
  range_per_charge: number;
  features: {
    [key: string]: boolean;
  };
  stock_quantity: number;
  created_at: string;
  updated_at: string;
} 