import React from 'react'

import Directory from '../../components/directory-menu/directory.component'

import { HomepageContainer } from './homepage.styles'

const Homepage = () => {
    return(
        <HomepageContainer>
            <Directory />
        </HomepageContainer>
    )
}

export default Homepage;