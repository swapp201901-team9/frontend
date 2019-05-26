import React from 'react';
import { connect } from 'react-redux';
import MyGroup from './MyGroup';
import { gotoGroupDetail, gotoAdminGroup, toWithdrawGroup } from '../../actions/index.js';

class MyGroupList extends React.Component {
    render() {
        if(this.props.isLoggedIn !== "") {
            return (
                <div>
                    <ul>
                    {this.props.my_groups.map(group =>
                        <MyGroup 
                            key={group.id}
                            group={group}
                            onClickGroup={() => this.props.onToGroupDetail(group.id)}
                            onClickAdminGroup={() => this.props.onToAdminGroup(group.id)}
                            onClickWithdrawGroup={() => this.props.onWithdrawGroup(group.id)}
                        />
                    )}
                    </ul>
                </div> 
            )
        }
        else {
            return (
                <p>로그인을 해주세요</p>
            )

        }
        
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.authorization,
    my_groups: state.my_groups
})

const mapDispatchToProps = (dispatch) => ({
	onToGroupDetail: (groupid) => dispatch(gotoGroupDetail(groupid)),
    onToAdminGroup: (groupid) => dispatch(gotoAdminGroup(groupid)),
    onWithdrawGroup: (groupid) => dispatch(toWithdrawGroup(groupid))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupList)