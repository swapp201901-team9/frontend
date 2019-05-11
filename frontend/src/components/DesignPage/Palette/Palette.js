import React from 'react'
import { connect } from 'react-redux'

import '../../css/Palette.css'

const colors = ['black', 'beige', 'ivory', 'white', 'blue', 'green', 'yellow', 'pink', 'red']

const PaletteItem = ({ color, active, onClick }) => {
	return (
		<div
			className={`PaletteItem ${active ? 'active' : ''}`}
			style={{ backgroundColor: color }}
			onClick={onClick}
		/>
	)
}

class Palette extends React.Component {
	handleSelect = color => {
		console.log('change color') //체크용
		
		// design component에 changeColor 함수 두고 여기서 props로 받기
		//cosnt { changeColor } = this.props;
		//changeColor(color);
	}

	render() {
		// design store에 color state로 두고 여기서 pops로 받기
		const { color } = this.props;
		return (
			<div className="Palette">
				<div className="colors">
					{colors.map(color => (
						<PaletteItem 							
							color={color} 
							key={color} 
							active={selected === color}
							onClick={() => this.handleSelect(color)}
						/>
					))}
				</div>
			</div>
		)
	}
}

/*
const mapStateToProps = state => ({
	color: 
}

const mapDispatchToProps = dispatch => ({
	changeColor: color => dispatch(changeColor(color)),
})
*/
export default Palette

