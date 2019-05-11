import React from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import DesignPage from '../DesignPage/DesignPage';
import ViewPage from '../ViewPage/ViewPage';
import MyGroupList from '../GroupPage/MyGroupList';


class MainPage extends React.Component {
    render() {
      //login 되어 있는 상태의 main page
      if(this.props.loggedIn !== "") {
        return (
          <div className="app">
            < NavBar/>
            <section className="wrap clear col3">
              <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
                  <DesignPage />
                </div>
              </div>
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">
                  <ViewPage />
                </div>
              </div>
              <div className="aside">
                <h2 className="h_black">MY GROUP</h2>
                <div className="content">
                  <p>MyGroupList contents</p>
                </div>
              </div>
            </section>
          </div>
        )
      }
      else {
        return (
          <div className="app">
          < NavBar/>
          <section className="wrap clear col3">
          <div className="aside">
            <h2 className="h_white">SELECT STYLE</h2>
            <div className="content">
              <DesignPage />
            </div>
          </div>
          <div className="main">
            <h2 className="h_white">SAMPLE VIEW</h2>
            <div className="content">
              <ViewPage />
            </div>
          </div>
          <div className="aside">
            <h2 className="h_black">MY GROUP</h2>
            <div className="content">
              <p>로그인을 해주세요.</p>
            </div>
          </div>
          </section>
        </div>
        )

      }

    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.authorization,
  })

export default connect(mapStateToProps)(MainPage)
