import { updateObject } from "store/utility";
import * as types from "../actions/actionTypes"
const DEFAULT_STATE = {
	cart: []
}
export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case types.get_cart_info:
			console.log(action.value);
			return {
				...state,
				cart: action.value
			}
		case types.Update_To_Cart:

			console.log(action.value);
			return {
				...state,
				cart: action.value
			}
		case types.Update_Success:
			return {
				...state,
				cart: action.value,
			};
		case types.Update_Failure:
			return {
				...state,
				errorMessage: action.payload.errorMessage
			};
		default: // need this for default case
			return state
	}
}