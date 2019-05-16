import React from 'react'
import { connect } from 'react-redux'

import DesignTemp from './DesignTemp.js';
import { toLikeDesign } from '../../actions/index.js';
import NavBar from '../NavBar/NavBar.js';
import MyGroupList from './MyGroupList.js';

class GroupDetailPage extends React.Component {

  render() {
        if (!this.props.loading) {
            return (
                <p>loading...</p>
            )
        }
        return (
            <div >
                <NavBar />
                <ul>
                    {this.props.group_designs.map(design =>
                        <DesignTemp 
                            key={design.id}
                            design={design}
                            onClickLike={() => this.props.onLikeDesign(design.id)}
                        />
                    )}
                </ul>
                <MyGroupList />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    my_groups: state.my_groups,
    group_designs: state.group_designs,
    loading: state.loading
})

const mapDispatchToProps = (dispatch) => ({
    onLikeDesign: (designid) => dispatch(toLikeDesign(designid))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailPage);
