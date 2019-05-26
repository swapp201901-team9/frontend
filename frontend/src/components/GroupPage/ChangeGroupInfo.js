import React from 'react';

const ChangeGroupInfo = ({ group, onClickChangeSubmit }) => {
    let grouptype, groupname;

    const type_options = [
		'Select an Option',
		'Club',
		'Department',
		'Else'
        ]

    const onSubmit = () => {
        console.log("changing group information")
        if(grouptype !== undefined && grouptype.value !== 'Select an Option' && groupname !== undefined) {
            onClickChangeSubmit(group.id, grouptype.value, groupname.value)
        }
    }

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                onSubmit()
            }}>
                <div>
                    <label>
                    GROUP TYPE
                    </label>
                    <select
                        name="grouptype"
                        ref={ node => {grouptype=node;} }
                        className="type-select"
                    >
                        {type_options.map(option => {
                            return <option value={option} key={option} >{option}</option>
                        })}
                    </select>
                </div>

                    <label>
                    GROUP NAME
                    </label>
                    <input
                        type="text"
                        ref={ node => {groupname=node;}}
                        placeholder={group.group_name}
                    />


                <button type="submit">CHANGE GROUP INFO</button>
              
            </form>
        </div>
    )

}

export default ChangeGroupInfo;
