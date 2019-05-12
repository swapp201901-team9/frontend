import React from 'react'
import GroupDetail from './GroupDetail.js'
import { connect } from 'react-redux'

class GroupDetailPage extends React.Component {

  render() {
        if (!this.props.loading) {
            return (
                <p>loading...</p>
            )
        }
        return (
                <div >
                    <GroupDetail />
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        loading: state.loading,
    }
}

export default connect(mapStateToProps)(GroupDetailPage);
