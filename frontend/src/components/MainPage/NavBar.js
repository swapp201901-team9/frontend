import React from 'react';
import { connect } from 'react-redux';
import { showNavBar } from '../../actions';

class NavBar extends React.Component {
    render() {
        // const onSubmit = () => {
        //     if (this.username !== undefined && this.password !== undefined) {
        //         this.props.onClick(this.username.value, this.password.value)
        //     }

        return (
        <div>
          <header className="clear">
           <div className="wrap">
             <div className="logo"></div>
             <nav className="navBar">
               <ul>
                 <li><a href="#">LOG IN</a></li>
                 <li><a href="#">JOIN</a></li>
               </ul>
             </nav>
           </div>
         </header>
       </div>
        )
    }
}




export default NavBar;
