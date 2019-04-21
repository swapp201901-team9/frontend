import React from 'react'


var re=0;
class TimeLine extends React.Component {
    render() {
        const Scroll = () => {
                this.props.onMoreClick()
        };
        window.onscroll = function(ev) {
          if(re<document.body.scrollHeight && (window.innerHeight + window.scrollY) >= document.body.scrollHeight){
            re=document.body.scrollHeight;
            Scroll();
            alert("더!");
          }
        };
      return(
          <div className="TimeLine">
		      
          </div>
      );
    }
}

export default TimeLine
