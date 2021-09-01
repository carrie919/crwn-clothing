import { takeLatest, all, call, put } from "@redux-saga/core/effects";

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'

import shopActionTypes from "./shop.types";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));

    }catch(err){

        yield put(fetchCollectionsFailure(err.message));

    }
}

export function* fetchCollectionsStart () {
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas(){
    yield all([
        call(fetchCollectionsStart)
    ]);
}