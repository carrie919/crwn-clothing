import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../with-spinner/with-spinner.component';

import { selectCollectionFetching } from '../../redux/shop/shop.selector'

const mapStateToProps = createStructuredSelector({
    isLoding: selectCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;