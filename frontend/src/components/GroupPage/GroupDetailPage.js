import React from 'react'
import { connect } from 'react-redux'

import DesignTemp from './DesignTemp.js';
import { toLikeDesign, toUnlikeDesign, toDeleteGroupDesign } from '../../actions/index.js';
import NavBar from '../NavBar/NavBar.js';
import MyGroupList from './MyGroupList.js';

class GroupDetailPage extends React.Component {
  constructor(props) {
		super(props)

		this.deleteDesignCheck = this.deleteDesignCheck.bind(this)
	}

	deleteDesignCheck(groupid, designid) {
		if(confirm("정말 삭제하시겠습니까?") == true) 
			return this.props.onDeleteDesign(groupid, designid)
		else 
			return false;
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
      					<div className="aside">
      						<h2 className="h_white">GROUP DETAIL</h2>
      							<div className="content">
                      <p>Type: {this.props.now_group[0].group_type}</p>
                      <p>Name: {this.props.now_group[0].group_name}</p>
                      <p>Member: {this.props.now_group[0].users.length}명</p>
                      <p>Group Design: {this.props.group_designs.length}개</p>
                      {console.log(this.props.now_group[0])}
      							</div>
      					</div>
      					<div className="main">
      						<h2 className="h_white">DESIGN LIST</h2>
      							<div className="content">
                    <ul>
                      {this.props.group_designs.map(design =>
                        <DesignTemp
                          key={design.id}
                          design={design}
                          onClickLike={() => this.props.onLikeDesign(design.id)}
                          onClickUnlike={() => this.props.onUnlikeDesign(design.id)}
                          onClickDelete={() => this.deleteDesignCheck(this.props.now_group[0].id, design.id)}
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
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
    onLikeDesign: (designid) => dispatch(toLikeDesign(designid)),
    onUnlikeDesign: (designid) => dispatch(toUnlikeDesign(designid)),
    onDeleteDesign: (groupid, designid) => dispatch(toDeleteGroupDesign(groupid, designid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailPage);
