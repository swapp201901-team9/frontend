import {connect} from "react-redux"
import {LogoutButton} from 'components/atoms/LogoutButton'
import * as actions from 'store/actions'

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
