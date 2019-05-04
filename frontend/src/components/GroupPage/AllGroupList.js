import React from 'react';
import { connect } from 'react-redux';
import AllGroup from './AllGroup';
import { joinGroup } from '../../actions';

class AllGroupList extends React.Component {
    render() {
        return (
            <div>
                {this.props.all_groups.map(group =>
                    <AllGroup 
                        key={group.id}
                        group={group}
                        onClickJoinGroup={this.props.onJoinGroup(group.id)}
                    />
                )}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    all_groups: state.all_groups
})

const mapDispatchToProps = (dispatch) => ({
    onJoinGroup: (groupid) => joinGroup(groupid)
})

export default connect(mapStateToProps, mapDispatchToProps)(AllGroupList)