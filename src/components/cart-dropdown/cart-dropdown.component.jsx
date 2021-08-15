import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';

import CustomButtom from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { selectCartItems } from '../../redux/cart/cart.selector';
import { toggleCart } from '../../redux/cart/cart.action'

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                (
                    cartItems.map(item => (<CartItem key={item.id} item={item}/>))
                ) : 
                ( <span className='empty-message'>Your cart is empty</span> )
            }
        </div>
        <CustomButtom
            onClick={() => {
                history.push('/checkout')
                dispatch(toggleCart())
            }}
        >GO TO CHECKOUT</CustomButtom>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));