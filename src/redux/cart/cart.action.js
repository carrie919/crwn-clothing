import { cartActionTypes } from "./cart.types";

const toggleCart = () => ({
    type: cartActionTypes.TOGGLE_CART_HIDDEN
})

export default toggleCart