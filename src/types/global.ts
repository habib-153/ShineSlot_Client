import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TQueryInitialState = {
  searchTerm: string;
  sort: string;
  filters: string[];
};

export type TError = {
    data: {
        message: string,
        stack: string
        success: boolean
    },
    status: number
}

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export type TResponse<T> = {
  data?: T;
  meta?: TMeta
  error?: TError;
  statusCode: number;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TCheckoutForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}