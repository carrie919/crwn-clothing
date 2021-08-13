import React from 'react'
import SingIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

import './sign-in-sign-up.styles.scss'

const SignInSingUp = () => {
    return(
        <div className='sign-in-sign-up'>
            <SingIn />
            <SignUp />
        </div>
    )
}

export default SignInSingUp