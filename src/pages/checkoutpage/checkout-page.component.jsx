import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import CheckOutItem from '../../components/checkout-item/checkout-item.component';

import { selectCartItems } from '../../redux/cart/cart.selector';
import { selectIemsTotal } from '../../redux/cart/cart.selector';

import './checkout.styles.scss';

const CheckOut = ({cartItems, total}) => {
    return(
        <div className='checkout-page'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(item => <CheckOutItem key={item.id} cartItem={item} />)
            }
            <div className='total'>
                <span>TOTAL : ${total}</span>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectIemsTotal
})

export default connect(mapStateToProps)(CheckOut);