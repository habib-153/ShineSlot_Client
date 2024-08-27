import { createSlice } from "@reduxjs/toolkit";
import { TQueryInitialState } from "../../types/global";

const initialState : TQueryInitialState = {
    searchTerm: '',
    filters: [],
    sort: ''
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilter: (state, action) => {
            if(!state.filters.includes(action.payload)){
                state.filters.push(action.payload);
            }
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        removeFilter: (state, action) => {
            state.filters = state.filters.filter(filter => filter !== action.payload)
        },
        clearFilters: (state) => {
            state.searchTerm = '';
            state.filters = [];
            state.sort = '';
        }
    }
})

export const { setSearchTerm, setFilter, setSort, removeFilter, clearFilters} = filterSlice.actions
export default filterSlice.reducer;