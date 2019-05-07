import React from 'react'
import GroupDetail from './GroupDetail.js'
import SignOut from '../MainPage/SignOut.js'
import { connect } from 'react-redux'

class GroupDetailPage extends React.Component {

  render() {
        if (!this.props.loading) {
            return (
                    <div>
                        <SignOut />
                    </div>
                    )
        }
        return (
                <div >
                    <SignOut />
                    <p>Group Detail Page</p>
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
