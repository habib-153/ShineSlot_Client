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

export type TResponse<T> = {
  data?: T;
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