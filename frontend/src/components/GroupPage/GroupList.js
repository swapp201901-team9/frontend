import React from 'react';
import { connect } from 'react-redux';

const GroupItem = ({ groupname, grouptype, onClick }) => {
    return (
        <ul>
            <div className="groupname">{groupname}</div>
        </ul>
    )
}

const GroupList = ({
    groupList,
    }) => {
    const groupItems = groupList.map(group => (
        <GroupItem
            key={group.id}
            groupname={group.groupname}
            grouptype={group.grouptype}
            id={group.groupid}
        />
    ))
    return (
        <div className="GroupList">
            <h2>My Groups</h2>
            <ul>{groupItems}</ul>
        </div>
    )
}

class GroupListComponent extends React.Component {
    render() {
        const { list } = this.props
        return (
            <GroupList
                groupList={list}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.grouplist,
})

export default connect( mapStateToProps )( GroupListComponent )
