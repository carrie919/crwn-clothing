import { createSelector } from "reselect";

const selectShop = state => state.shop

export const selectShopData = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = (collectionUrlPrm) => createSelector(
    [selectShopData],
    collections => collections ? collections[collectionUrlPrm] : null
);

export const selectCollectionForPreview = createSelector(
    [selectShopData],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);