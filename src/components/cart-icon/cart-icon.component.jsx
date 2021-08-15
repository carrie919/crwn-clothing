import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import {toggleCart} from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCart, itemCount }) => (
    <div className='cart-icon' onClick={() => toggleCart()}>
        <ShoppingIcon className='shopping-bag' />
        <span className='item-count'>{itemCount}</span> 
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCart: () => dispatch(toggleCart())
});

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);