import React from 'react';
import { connect } from 'react-redux';
import MyGroup from './MyGroup';
import { gotoGroupDetail, gotoAdminGroup } from '../../actions/index.js';

class MyGroupList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.my_groups.map(group =>
                    <MyGroup 
                        key={group.id}
                        group={group}
                        onClickGroup={() => this.props.onToGroupDetail(group.id)}
                        onClickAdminGroup={() => this.props.onToAdminGroup(group.id)}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    my_groups: state.my_groups
})

const mapDispatchToProps = (dispatch) => ({
	onToGroupDetail: (groupid) => gotoGroupDetail(groupid),
	onToAdminGroup: (groupid) => gotoAdminGroup(groupid)
})

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupList)