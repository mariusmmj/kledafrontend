export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
  image: string;
  stockQuantity: number;
  brand: Brand;
  createdAt: string;
};

export type Brand = {
  id: number;
  name: string;
  description: string;
  country: string;
};