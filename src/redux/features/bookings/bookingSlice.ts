import { createSlice } from "@reduxjs/toolkit"
import { TBooking } from "../../../types/service"
import { RootState } from "../../store"

type TBookingInitialState = {
    booking: TBooking[]
    amount: number
}

const initialState: TBookingInitialState = {
    booking: [],
    amount: 0
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        addBooking: (state, action) => {
            if(!state.booking.includes(action.payload.booking)){
                state.booking.push(action.payload.booking);
                state.amount += action.payload.amount;
            }
        },
        removeBooking: (state, action) => {
            state.booking = state.booking.filter(item => item._id !== action.payload.id);
            state.amount -= action.payload.amount;
        },
        clearBooking: (state) => {
            state.booking = [];
            state.amount = 0;
        }
    }
})

export const { addBooking, removeBooking, clearBooking } = bookingSlice.actions
export default bookingSlice.reducer;
export const totalSlots = (state: RootState) => state.bookings.booking.length;