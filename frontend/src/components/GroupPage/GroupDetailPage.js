import React from 'react'
import { connect } from 'react-redux'

import DesignForm from './DesignForm.js'
import { toPostDesign, toNewDesign } from '../../actions/index.js';
import NavBar from '../NavBar/NavBar.js';
import MyGroupList from './MyGroupList.js';

class GroupDetailPage extends React.Component {
  constructor(props) {
    super(props)

    this.post_design;

	}

  render() {
    if (!this.props.loading) {
        return (
            <p>loading...</p>
        )
    }
    return (

      <div >

        <NavBar />
        <section className="wrap clear col3">
          {this.props.now_group.group_type === 'UR'

            // MY DESIGN(user group)
            ? <div className="aside">

                <h2 className="h_white">DETAIL</h2>
                <div className="content">
                  <center>
                  <p>디자인 총 {this.props.group_designs.length}개</p>
                  </center>
                  
                </div>
                
              </div>

            // 일반 그룹
            :  <div className="aside">      

                  <h2 className="h_white">GROUP DETAIL</h2>
                    <div className="content">
                      <p>그룹 타입: {this.props.now_group.group_type}</p>
                      <p>그룹 이름: {this.props.now_group.group_name}</p>
                      <p>그룹 멤버: {this.props.now_group.users.length}명</p>
                      <p>디자인: {this.props.group_designs.length}개</p>
                    </div>

                </div>
          }
          
          <div className="main">
            <h2 className="h_white">DESIGN LIST</h2>
              <div className="content">
              {this.props.now_group.group_type === 'UR'
                ? <div>
                    <button className="button button_newdesign" type="button" onClick={() => this.props.onNew()}>새 과잠 디자인하기 &#10148;</button>
                  </div>
                : <div>
                    <div className="Comment-Write-Field">
                      <select id="post_design" ref={node=>{this.post_design=node;}}>
                          <option>디자인을 선택하세요</option>
                          {this.props.my_designs.map(design => {
                              console.log("option design: ", design)
                              return <option key={design.id} value={design.id}>{design.name}</option>
                          })}
                      </select>
            
                      <div className="Comment-Button-Field">
                        <button class="post_btn" type="button"
                            onClick={() => {
                                console.log("post_design: ", this.post_design)
                                if(this.post_design.value === undefined || this.post_design.value == "디자인을 선택하세요") {
                                    alert("디자인을 선택하세요")
                                }
                                else {
                                  this.props.onPostDesign(this.post_design.value, this.props.now_group.id)
                                }
                            }}>
                            POST
                        </button>
                      </div>
                    </div>
                  </div>
              }

              <ul>
                {this.props.group_designs.map(design =>
                  <DesignForm
                    key={design.id}
                    design={design}
                  />
                )}
              </ul>
            </div>
          </div>

          <div className="aside">
            <h2 className="h_black">MY GROUP</h2>
              <div className="content">
              <MyGroupList />
              </div>
          </div>
        </section>
       
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    my_groups: state.my_groups,
    now_group: state.now_group,
    group_designs: state.group_designs,
    my_designs: state.my_designs,
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
  onNew: () => dispatch(toNewDesign()),
  onPostDesign: (designid, groupid) => dispatch(toPostDesign(designid, groupid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailPage);
