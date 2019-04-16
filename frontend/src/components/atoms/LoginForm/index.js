import React, { Component, PropTypes } from 'react'

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { username, password } = this.state
    this.props.fetchLogin(username, password)
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
              type='text'
              name='username'
              onChange={this.handleInputChange}
          />
          <input
              type='text'
              name='password'
              onChange={this.handleInputChange}
          />
          <button>LOGIN</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  fetchLogin: PropTypes.func,
  reverse: PropTypes.bool,
}
