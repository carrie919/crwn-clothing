import { takeLatest, put, call, all  } from "@redux-saga/core/effects";

import userActionTypes from '../user/user.types';

import { clearCart } from '../cart/cart.action';

export function* clearCartOnSignOut(){
    yield put(clearCart());
}

export function* onSignOutSucess(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas(){
    yield all([ call(onSignOutSucess) ]);
}