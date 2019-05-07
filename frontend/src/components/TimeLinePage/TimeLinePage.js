import React from 'react'
import TimeLine from './TimeLine.js'
import SignOut from './SignOut.js'
import { connect } from 'react-redux'

class TimeLinePage extends React.Component {

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
<<<<<<< HEAD:frontend/src/components/GroupPage/GroupDetailPage.js
                    <p>Group Detail Page</p>
=======
                    <TimeLine />
>>>>>>> 6d725871358dd7d6de8904157b9d3ce52da3d9ba:frontend/src/components/TimeLinePage/TimeLinePage.js
                </div>
               )
    }
}

let mapStateToProps = (state) => {
    return {
        loading: state.loading,
    }
}

TimeLinePage = connect(mapStateToProps)(TimeLinePage);

export default TimeLinePage;
