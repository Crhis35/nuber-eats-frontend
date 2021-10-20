/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  CLIENT = "CLIENT",
  DELIVERY = "DELIVERY",
  OWNER = "OWNER",
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  retaurantId: number;
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface LogInInput {
  email: string;
  password: string;
}

export interface OrderItemOptionInputType {
  choice?: string | null;
  name: string;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
