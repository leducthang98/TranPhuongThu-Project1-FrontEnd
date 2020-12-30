import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	valueCommentBox: "",
	valueGridTextBox: "",
	valueSigleTextBox: "",
	valueGridSigleChoice: "",
	valueGridMultiChoice: "",
	valueGridSigleText: "",
	valueMultiChoice: "",
	valueSigleChoice: "",
};

const setValueCommentBox = (state, action) => {
	const updatedState = updateObject(state, { valueCommentBox: action.value });
	return updateObject(state, updatedState);
};

const setValueGridTextBox = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridTextBox: action.value,
	});
	return updateObject(state, updatedState);
};

const setValueGridSigleChoice = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridSigleChoice: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueSigleTextBox = (state, action) => {
	const updatedState = updateObject(state, {
		valueSigleTextBox: action.value,
	});
	return updateObject(state, updatedState);
};

const setValueGridMultiChoice = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridMultiChoice: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueGridSigleText = (state, action) => {
	const updatedState = updateObject(state, {
		valueGridSigleText: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueMultiChoice = (state, action) => {
	const updatedState = updateObject(state, {
		valueMultiChoice: action.value,
	});
	return updateObject(state, updatedState);
};
const setValueSigleChoice = (state, action) => {
	const updatedState = updateObject(state, {
		valueSigleChoice: action.value,
	});
	return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_STATE_COMMENT_BOX:
			return setValueCommentBox(state, action);
		case actionTypes.ADD_STATE_GRID_TEXT_BOX:
			return setValueGridTextBox(state, action);
		case actionTypes.ADD_STATE_SIGLE_TEXT_BOX:
			return setValueSigleTextBox(state, action);
		case actionTypes.ADD_STATE_GRID_SIGLE_CHOICE:
			return setValueGridSigleChoice(state, action);
		case actionTypes.ADD_STATE_GRID_MULTI_CHOICE:
			return setValueGridMultiChoice(state, action);
		case actionTypes.ADD_STATE_GRID_SIGLE_TEXT:
			return setValueGridSigleText(state, action);
		case actionTypes.ADD_STATE_MULTI_CHOICE:
			return setValueMultiChoice(state, action);
		case actionTypes.ADD_STATE_SIGLE_CHOICE:
			return setValueSigleChoice(state, action);
		default:
			return state;
	}
};

export default reducer;
