
// import * as type from "./actions/actionTypes"
// import { put, takeEvery } from 'redux-saga/effects';
// import MakeRequest from "views/MakeRequest";
// import { baseUrl } from "domain";
// function* updateCartInfo(action) {
//     console.log("cartSaga : " + JSON.stringify(action.payload))
//     try {
//         const response = yield MakeRequest("get", baseUrl + "/order/me");
//         let res = ''
//         if (response.data.code === 0) {
//             res = response.data.data
//         }
//         yield put({
//             type: type.Update_Success,
//             payload: res
//         });
//         yield put({
//             type: type.Update_To_Cart,
//         })
//     } catch (error) {
//         yield put({
//             type: type.Update_Failure,
//             payload: {
//                 errorMessage: error.message
//             }
//         });
//     }
// }
// export const cartSaga = [
//     takeEvery(type.Update_To_Cart, updateCartInfo)

// ];