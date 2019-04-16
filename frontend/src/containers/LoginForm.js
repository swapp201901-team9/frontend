import {connect} from "react-redux"
import {LoginForm} from 'components/atoms/LoginForm'
import * as actions from 'store/actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  fetchLogin: (username, password) => dispatch(actions.fetchLogin(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
