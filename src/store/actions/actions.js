import * as types from "./actionTypes"
export const addToCart = (value) => {
	return {
		type: types.Update_To_Cart,
		value,
	};
};

export const getInforCart = (value) => {
	return {
		type: types.get_cart_info,
		value,
	};
};