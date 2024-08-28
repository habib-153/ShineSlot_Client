import { TVehicleTypes } from "../constant"

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
  customer?: string
  serviceId: string
  slotId: string
  vehicleType: TVehicleTypes
  vehicleModel: string
  vehicleBrand: string
  manufacturingYear: number
  registrationPlate: string
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