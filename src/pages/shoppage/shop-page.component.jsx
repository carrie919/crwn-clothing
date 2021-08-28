import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../collectionpage/collection-page.container';

import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
    
    componentDidMount(){
        const { fetchCollectionsAsync } = this.props;
        fetchCollectionsAsync();
    }

    render(){
        const { match } = this.props;
        return(
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);