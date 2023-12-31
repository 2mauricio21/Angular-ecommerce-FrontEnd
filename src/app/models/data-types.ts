export interface ISellerSignUp {
  name: string,
  email: string,
  password: string
}
export interface ISellerLogin {
  email: string,
  password: string
}
export interface IProduct {
  id: number,
  name: string,
  price: number,
  color: string
  category: string,
  image: string,
  description: string,
  sellerId: number,
  quantity: undefined | number; 
  productId: number | undefined;
}

export interface IUserSignUp {
  name: string,
  email: string,
  password: string
}

export interface IUserLogin {
  email: string,
  password: string
}

export interface ICart {
  id: number | undefined,
  name: string,
  price: number,
  category: string,
  color: string
  image: string,
  description: string,
  userId: number,
  productId: number; 
}

export interface IPriceSumary{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number;
}