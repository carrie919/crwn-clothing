import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = 100 * price
    const publishbleKey =   'pk_test_51JPX5BSH6UQvicCOEAumPlbM3JSm' + 
                            'xuw03tWgUrcCkCTJbKKCophjCLPgeR7P47ROq' +
                            'LynmqE3yjFDmuIitoUNb7CX00sXZSHNUb'

    const onToken = token => {
        console.log(token)
        alert('payment successful')
    }

    return(
        <StripeCheckout
            label='PAY NOW'
            name='CROWN CLOTHING Ltd.'
            shippingAddress
            billingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishbleKey}
        />
    )
}

export default StripeCheckoutButton