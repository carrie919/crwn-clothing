import React from 'react'
import SingIn from '../sign-in/sign-in.component'
import SignUp from '../sign-up/sign-up.component'

import './sing-in-sing-up.styles.scss'

const SignInSingUp = () => {
    return(
        <div className='sign-in-sing-up'>
            <SingIn />
            <SignUp />
        </div>
    )
}

export default SignInSingUp