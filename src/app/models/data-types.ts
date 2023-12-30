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
  sellerId: number; 
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
