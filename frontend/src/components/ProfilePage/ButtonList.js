/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import ChangeIntroPage from './ChangeIntroPage.js';
import ChangePWPage from './ChangePWPage.js';
import EscapePage from './EscapePage.js';

class ButtonList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           showComponent1 : false,
           showComponent2 : false,
           showComponent3 : false,
       };
    }
    render(){
        let curruser= this.props.curruser;
        let profuser= this.props.profuser;
        
        const onPostClick1 = () => {
            if("\""+curruser+"\"" !== JSON.stringify(profuser))
               alert("남의 려권 입니다.");
            else{
        //        this.props.onClick1();
                if(this.state.showComponent1) this.setState({showComponent1 : false,showComponent2:false, showComponent3: false});
                else this.setState({showComponent1 : true, showComponent2: false, showComponent3: false});
            }
        }
        const onPostClick2 = () => {
             if("\""+curruser+"\"" !== JSON.stringify(profuser))
                 alert("남의 려권 입니다.");
             else{
          //       this.props.onClick2()
                 if(this.state.showComponent2) this.setState({showComponent1: false, showComponent2 : false, showComponent3: false});
                 else this.setState({showComponent2 : true, showComponent1:false, showComponent3:false});
             }
        }
        const onPostClick3 = () => {
            if("\""+curruser+"\"" !== JSON.stringify(profuser))
                alert("탈Book할거면 너나해ㅡㅡ");
            else{
           //     this.props.onClick3()
                if(this.state.showComponent3) this.setState({showComponent3 : false,});
                else this.setState({showComponent3: true,showComponent1:false,showComponent2:false});
            }
        }
       
        
     
        return(
            <div>
               <div id="change_pw_field">
                   <button id="change_pw_button_field" onClick={onPostClick1}>암호 바꾸기!</button>
                   {this.state.showComponent1 ? <ChangePWPage />: null }
                </div>
		<br />
                <div id="change_detail_field">
                   <button id="change_detail_button_field" onClick={onPostClick2}>프로필 바꾸기!</button>
                   {this.state.showComponent2 ? <ChangeIntroPage />: null }
               </div>
		<br />
               <div id="escape_account_field">
                   <button id="escape_account_button_field" onClick={onPostClick3}>이곳을 나가겠소!</button>
                   {this.state.showComponent3 ? <EscapePage /> : null }
               </div>
		<br />
               
            
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return{
        curruser: Object.assign(state.authorization).split(":")[0],
        profuser: state.profile_user !== null ? Object.assign(state.profile_user.user) : null,
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        
    }
}
export default ButtonList = connect(mapStateToProps, mapDispatchToProps)(ButtonList)

