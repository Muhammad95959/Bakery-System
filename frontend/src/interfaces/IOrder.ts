export default interface IOrder {
  id: number;
  userId?: string;
  customer: string;
  status: string;
  paymentMethod: string;
  total: number;
  createdAt: Date;
  cart: ICart[];
}

export interface ICart {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
