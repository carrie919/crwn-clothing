import React from 'react';
import { connect } from 'react-redux';

import CustomButtom from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(item => (<CartItem key={item.id} item={item}/>))
            }
        </div>
        <CustomButtom>GO TO CHECKOUT</CustomButtom>
    </div>
);

const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);