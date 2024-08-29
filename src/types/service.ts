import { TVehicleTypes } from "../constant"
import { TUser } from "./global"

export type TService = {
    _id: string
    name: string
    description: string
    price: number
    duration: number
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}

export type TBooking = {
  _id?: string
  customer?: TUser
  serviceId: TService
  slotId: TSlot
  vehicleType: TVehicleTypes
  vehicleModel: string
  vehicleBrand: string
  manufacturingYear: number
  registrationPlate: string
  transactionId?: string
  address?: string
  phone?: string
  paymentStatus?: string
  price?: number
  createdAt?: string
  updatedAt?: string
}

export type TSlot = {
  _id?: string;
  service: TService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};