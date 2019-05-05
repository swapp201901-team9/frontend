import React from 'react';
import { connect } from 'react-redux';
import AllGroup from './AllGroup';
import { toJoinGroup, gotoGroupDetail } from '../../actions/index.js';

class AllGroupList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.all_groups.map(group =>
                    <AllGroup 
                        key={group.id}
                        group={group}
                        onClickGroup={() => this.props.onToGroupDetail(group.id)}
                        onClickJoinGroup={() => this.props.onJoinGroup(group.id)}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    all_groups: state.all_groups
})

const mapDispatchToProps = (dispatch) => ({
    onJoinGroup: (groupid) => toJoinGroup(groupid),
    onToGroupDetail: (groupid) => gotoGroupDetail(groupid)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllGroupList)