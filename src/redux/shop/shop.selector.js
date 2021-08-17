import { createSelector } from "reselect";

const selectShop = state => state.shop

export const selectShopData = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = (collectionUrlPrm) => createSelector(
    [selectShopData],
    collections => collections[collectionUrlPrm]
);

export const selectCollectionForPreview = createSelector(
    [selectShop],
    shop => Object.keys(shop.collections).map(key => shop.collections[key])
);