import React from 'react';
import {connect} from 'react-redux';
import { toChangeGroupInfo } from '../../actions';

class ChangeGroupInfo extends React.Component {
	type_options = [
		'Select an Option',
		'Club',
		'Department',
		'Else'
		]

	onSubmit = () => {
		console.log("changing group information")
		if(this.grouptype !== undefined && this.grouptype.value !== 'Select an Option' && this.groupname !== undefined) {
			this.props.onChangeGroupInfo(this.grouptype, this.groupname)
		}
	}

	render() {
		return (
			<div>
                <form onSubmit={e => {
                    e.preventDefault()
                    this.onSubmit()
                }}>
                    <div>
                        <label>
                        GROUP TYPE
                        </label>
                        <select 
                            name="grouptype"
                            ref={ node => {this.grouptype=node;} }
                            className="type-select"
                        > 
                            {this.type_options.map(option => {
                                return <option value={option} key={option} >{option}</option>
                            })}
                        </select>
                    </div>
                    <div className="Text-Field">
                        <label>
                        GROUP NAME
                        </label>
                        <input 
                            type="text" 
                            ref={ node => {this.groupname=node;}} 
                        />
                    </div>
                    <div className="Button-Field">
                    <button type="submit">CHANGE GROUP INFO</button>
                    </div>
                </form>
            </div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	onChangeGroupInfo: (grouptype, groupname) => dispatch(toChangeGroupInfo(grouptype, groupname))
})

export default connect(null, mapDispatchToProps)(ChangeGroupInfo);

