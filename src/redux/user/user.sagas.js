import { takeLatest, put, call, all } from "@redux-saga/core/effects";

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser } from "../../firebase/firebase.utils";
    
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from "./user.action";

import userActionTypes from "./user.types";

export function* getSnapshotFromUserAuth(user, additionalData){
        
        try{
            const userRef = yield call(createUserProfileDocument, user, additionalData);
            const userSnapshot = yield userRef.get();

            yield put(
                signInSuccess(
                    {
                        id: userSnapshot.id,
                        ...userSnapshot.data()
                    }
                )
            );
        }catch(err){
            yield put(
                signInFailure(err)
            );
        }
}

export function* signInWithGoogle() {
    try{
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(err){
        yield put(
            signInFailure(err)
        );
    }
}

export function* signInWithEmail({payload: {email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(
            signInFailure(error)
        );
    }
}

export function* isUserAutenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload: { displayName, email, password }}){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData:{ displayName }}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSingInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAutenticated)
}

export function* onSignOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas(){
    yield all([
        call(onGoogleSingInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}