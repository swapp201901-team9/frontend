import React from 'react';
import {connect} from 'react-redux';

const GroupList = ({ grouplist, onClickGroup, onClickJoinGroup }) => {
  
  return (
    <div>
      <div className = "Group-List-Field">
        {grouplist.map(group =>
          <ul key={group.id}>
            <p onClick={() => onClickGroup(group.id)}>{group.group_type} {group.group_name}</p>
            <button className="button button_small" onClick={() => onClickJoinGroup(group.id)}>JOIN GROUP</button>
          </ul>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  my_groups: state.my_groups
})

export default connect(mapStateToProps)(GroupList)
