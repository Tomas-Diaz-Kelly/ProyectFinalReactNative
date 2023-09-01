import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        value: {
            user: "Hardcoder user",
            updatedAt: "",
            total: null,
            items: []
        }
    },
    reducers: {
        addCartItem: (state, action) => {
          // Lógica para agregar un artículo
            const productExists = state.value.items.some((item) => item.id === action.payload.id);
    
        if (productExists) {
            state.value.items = state.value.items.map((item) => {
            if (item.id === action.payload.id) {
                item.quantity += action.payload.quantity;
                return item;
            }
            return item;
            });
        } else {
            state.value.items.push(action.payload);
        }

        state.value.total = state.value.items.reduce(
            (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
            0
        );
    
        state.value.updatedAt = new Date().toLocaleString();
        },
        removeCartItem: (state, action) => {
          // Lógica para eliminar un artículo
        const itemIdToRemove = action.payload; 
            state.value.items = state.value.items.filter(
            (item) => item.id !== itemIdToRemove
            );
    
            state.value.total = state.value.items.reduce(
            (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
            0
            );
    
            state.value.updatedAt = new Date().toLocaleString();
        },
        emptyCart: (state) => {
          // Lógica para vaciar el carrito
            state.value.items = [];
            state.value.total = null;
            state.value.updatedAt = "";
        },
    },
    
})

export const {addCartItem, removeCartItem , emptyCart} = cartSlice.actions

export default cartSlice.reducer