import { connect } from 'react-redux'
import {UserForm} from 'components/molecules/UserForm'

const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
