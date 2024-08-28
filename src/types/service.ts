export type TService = {
    _id: string
    name: string
    description: string
    price: number
    duration: number
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}

export type TSlot = {
  _id: string;
  service: TService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "canceled";
};