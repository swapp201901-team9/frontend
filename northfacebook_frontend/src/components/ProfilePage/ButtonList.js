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
        let sasangs = this.props.sasangs;
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
       
        let ss=[];
        if("\""+curruser+"\"" !== JSON.stringify(profuser)){
          if(sasangs.length===0){
            ss=[
              <div id="sasang_status">아직 사상검증 않았소</div>,
              <button id="POST_sasang_button_field" onClick={()=>{onPostClick7(profuser)}}>사상검증</button>,
            ];
          }
          else if(sasangs[0]["first"]===curruser){
            ss=[
              <div id="sasang_status">지금까지 총사상검증 횟수는 {sasangs[0]["counter"]}번이오!</div>,
              <button id="PUT_sasang_button_field" onClick={()=>{onPostClick8(profuser)}}>재사상검증</button>
            ]
          }
          else{
            ss=[
              <div id="sasang_status">지금까지 총사상검증 횟수는 {sasangs[0]["counter"]}번이오!</div>,
              <div id="sasanging">이미 사상검증 중이오!</div>
            ]
          }
        }
        else{
          ss=[];
          if(sasangs.length===0){
            ss=[<div key="0" id="sasang_status">아직 아무도 사상검증 않았소</div>];
          }
          for(var i=0;i<sasangs.length;i++){
            if(sasangs[i].first===curruser){
              ss.push(<div key={i} id={"sasang_status_"+i}>지금까지 {sasangs[i].second}와 총사상검증 횟수는 {sasangs[i]["counter"]}번이오!</div>);
              var user=sasangs[i].second;
              ss.push(<button key={i} id={"PUT_sasang_button_field"+i} onClick={()=>{onPostClick8(user)}}>재사상검증</button>);
            }
            else{
              ss.push(<div key={i} id={"sasang_status_"+i}>지금까지 {sasangs[i].first}와 총사상검증 횟수는 {sasangs[i]["counter"]}번이오!</div>);
              ss.push(<div key={i} id={"sasanging_"+i}>이미 사상검증 중이오!</div>);
            }
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
        sasangs : Object.assign(state.sasangs)//!==null?Object.assign(state.sasangs):null
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        
    }
}
export default ButtonList = connect(mapStateToProps, mapDispatchToProps)(ButtonList)

