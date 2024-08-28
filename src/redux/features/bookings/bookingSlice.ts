import { createSlice } from "@reduxjs/toolkit"
import { TSlot } from "../../../types/service"
import { RootState } from "../../store"

type TBookingInitialState = {
    slots: TSlot[]
    amount: number
}

const initialState: TBookingInitialState = {
    slots: [],
    amount: 0
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addBooking: (state, action) => {
            if(!state.slots.includes(action.payload)){
                state.slots.push(action.payload);
                state.amount += action.payload.service.price;
            }
        },
        removeBooking: (state, action) => {
            state.slots = state.slots.filter(slot => slot !== action.payload);
            state.amount -= action.payload.service.price;
        },
        clearBooking: (state) => {
            state.slots = [];
            state.amount = 0;
        }
    }
})

export const { addBooking, removeBooking, clearBooking } = bookingSlice.actions
export default bookingSlice.reducer;
export const totalSlots = (state: RootState) => state.bookings.slots.length;