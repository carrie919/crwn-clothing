import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/collections-overview.component';
import CollectionPage from '../collectionpage/collection-page.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollection } from '../../redux/shop/shop.actions';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    unSubscribeFromSnapshot = null;

    state = {
        loding: true
    }

    componentDidMount(){
        const { updateCollection } = this.props
        const collectionRef = firestore.collection('collections');

        this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionToMap = convertCollectionSnapshotToMap(snapshot);

            updateCollection(collectionToMap);
            this.setState({loding: false});
        });
    }

    render(){
        const { match } = this.props;
        const { loding } = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    render={
                        (props) => (<CollectionOverviewWithSpinner isLoding={loding} {...props} />)
                    }
                />
                <Route path={`${match.path}/:collectionId`}
                    render={
                        (props) => (< CollectionPageWithSpinner isLoding={loding} {...props} />)
                    }
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollection: collectionToMap => dispatch(updateCollection(collectionToMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);