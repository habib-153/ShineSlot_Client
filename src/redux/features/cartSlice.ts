import { createSlice } from "@reduxjs/toolkit";
import { TCartInitialState } from "../../types";

const initialState : TCartInitialState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = state.items.find(item => item._id === action.payload._id);
            if(product){
                if(product.quantity < action.payload.stock){
                    product.quantity += 1;
                }
            }
            else{
                state.items.push({...action.payload, quantity: action.payload.quantity})
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
        updateCart: (state, action) =>{
            const product = state.items.find(item => item._id === action.payload.id);
            if(product){
                product.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
})

export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;