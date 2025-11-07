export default interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
