import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginForm from "containers/LoginForm";
import LogoutButton from "containers/LogoutButton";

export const UserForm = props => (
  props.isLoggedIn ? <LogoutButton user={props.user}/> : <LoginForm/>
)

UserForm.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  reverse: PropTypes.bool,
  children: PropTypes.node,
}
