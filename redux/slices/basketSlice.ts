import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface BasketState {
	items: Product[]
}

const initialState: BasketState = {
	items: []
}

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
			state.items = [...state.items, action.payload]
		},
		removeFromBasket: (state: BasketState, action: PayloadAction<{ id: string }>) => {
			const index = state.items.findIndex((item: Product) => item._id === action.payload.id)

			let newBasket = [...state.items]

			if (index >= 0) {
				newBasket.splice(index, 1)
			} else {
				console.log(`Can't remove product (id: ${action.payload.id}) as it's not basket!`)
			}

			state.items = newBasket
		}
	}
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state: RootState) => state.basket.items
export const selectBasketItemsWithId = (state: RootState, id: string) => {
	state.basket.items.filter((item: Product) => item._id === id)
}
export const selectBascketTotal = (state: RootState) => 
	state.basket.items.reduce((total: number, item: Product) => (total +=item.price), 0)


export default basketSlice.reducer