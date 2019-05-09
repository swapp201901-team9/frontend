import React from 'react';
import { connect } from 'react-redux';
import {changeUrl, } from '../../actions';

class Mypage extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <a href="#" onClick={() => this.props.onClick()}>MY PAGE</a>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(changeUrl('/profile/'))
    }
}

Mypage = connect(undefined, mapDispatchToProps)(Mypage);



export default Mypage;
