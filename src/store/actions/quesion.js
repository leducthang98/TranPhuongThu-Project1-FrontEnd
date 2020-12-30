import * as actionTypes from "./actionTypes";
export const addStateCommentBox = (value) => {
	return {
		type: actionTypes.ADD_STATE_COMMENT_BOX,
		value,
	};
};
export const addStateGridTextBox = (value) => {
	return {
		type: actionTypes.ADD_STATE_GRID_TEXT_BOX,
		value,
	};
};

export const addStateSigleTextBox = (value) => {
	return {
		type: actionTypes.ADD_STATE_SIGLE_TEXT_BOX,
		value,
	};
};

export const addStateGridSigleChoice = (value) => {
	return {
		type: actionTypes.ADD_STATE_GRID_SIGLE_CHOICE,
		value,
	};
};

export const addStateGridMultiChoice = (value) => {
	return {
		type: actionTypes.ADD_STATE_GRID_MULTI_CHOICE,
		value,
	};
};
export const addStateGridSigleText = (value) => {
	return {
		type: actionTypes.ADD_STATE_GRID_SIGLE_TEXT,
		value,
	};
};
export const addStateMultiChoice = (value) => {
	return {
		type: actionTypes.ADD_STATE_MULTI_CHOICE,
		value,
	};
};

export const addStateSigleChoice = (value) => {
	return {
		type: actionTypes.ADD_STATE_SIGLE_CHOICE,
		value,
	};
};
