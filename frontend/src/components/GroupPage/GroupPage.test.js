import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureMockStore from "redux-mock-store";
import {create} from 'react-test-renderer'

import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import * as actions from '../../actions/index'
import GroupPage from './GroupPage';


configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

const grouptype = 'Club'
const groupname = 'CCC'
const groupid = 1
const userid = 2
const designid = 3
const commentid = 4
const name = "SWPP"
const message = "Hi"
const newList = ["A", "B", "C"]

describe ('ACTIONS', ()=> {
    //GroupPage Actions
    it('should create an action to show navigation bar', () => {
        const expectedAction = {
            type: 'NAV_BAR'
        }
        expect(actions.showNavBar()).toEqual(expectedAction)
    })

    it('should create an action to sign out', () => {
        const expectedAction = {
            type: 'SIGN_OUT'

        }
        expect(actions.signOut()).toEqual(expectedAction)
    })

    it('should create an action to create group', () => {
        const expectedAction = {
            type: 'CREATE_GROUP',
            grouptype: grouptype,
            groupname: groupname,
        }
        expect(actions.toCreateGroup(grouptype, groupname)).toEqual(expectedAction)
    })

    it('should create an action to search group', () => {
        const expectedAction = {
            type: 'SEARCH_GROUP',
            newList: newList
        }
        expect(actions.toSearchGroup(newList)).toEqual(expectedAction)
    })

    it('should create an action to join group', () => {
        const expectedAction = {
            type: 'JOIN_GROUP',
            groupid: groupid,
        }
        expect(actions.toJoinGroup(groupid)).toEqual(expectedAction)
    })

    it('should create an action to withdraw group', () => {
        const expectedAction = {
            type: 'WITHDRAW_GROUP',
            groupid: groupid,
        }
        expect(actions.toWithdrawGroup(groupid)).toEqual(expectedAction)
    })

    it('should create an action to go to GroupDetailPage', () => {
        const expectedAction = {
            type: 'TO_GROUP_DETAIL',
            groupid: groupid,
        }
        expect(actions.gotoGroupDetail(groupid)).toEqual(expectedAction)
    })

    it('should create an action to go to GroupAdminPage', () => {
        const expectedAction = {
            type: 'TO_ADMIN_GROUP',
            groupid: groupid,
        }
        expect(actions.gotoAdminGroup(groupid)).toEqual(expectedAction)
    })


    //GroupDetailPage actions
    it('should create an action to go to MainPage to edit design', () => {
        const expectedAction = {
            type: 'TO_EDIT_DESIGN',
            designid: designid,
        }
        expect(actions.gotoEditDesign(designid)).toEqual(expectedAction)
    })

    it('should create an action to like design', () => {
        const expectedAction = {
            type: 'LIKE_DESIGN',
            designid: designid,

        }
        expect(actions.toLikeDesign(designid)).toEqual(expectedAction)
    })

    it('should create an action to unlike design', () => {
        const expectedAction = {
            type: 'UNLIKE_DESIGN',
            designid: designid,

        }
        expect(actions.toUnlikeDesign(designid)).toEqual(expectedAction)
    })

    it('should create an action to add comment', () => {
        const expectedAction = {
            type: 'ADD_COMMENT',
            designid: designid,
            name: name,
            message: message,
        }
        expect(actions.toAddComment(designid, name, message)).toEqual(expectedAction)
    })

    it('should create an action to edit comment', () => {
        const expectedAction = {
            type: 'EDIT_COMMENT',
            designid: designid,
            commentid: commentid,
            name: name,
            message: message,
        }
        expect(actions.toEditComment(designid, commentid, name, message)).toEqual(expectedAction)
    })

    it('should create an action to delete comment', () => {
        const expectedAction = {
            type: 'DELETE_COMMENT',
            designid: designid,
            commentid: commentid,
        }
        expect(actions.toDeleteComment(designid, commentid)).toEqual(expectedAction)
    })

    it('should create an action to like comment', () => {
        const expectedAction = {
            type: 'LIKE_COMMENT',
            designid: designid,
            commentid: commentid, 
        }
        expect(actions.toLikeComment(designid, commentid)).toEqual(expectedAction)
    })

    it('should create an action to unlike comment', () => {
        const expectedAction = {
            type: 'UNLIKE_COMMENT',
            designid: designid,
            commentid: commentid, 
        }
        expect(actions.toUnlikeComment(designid, commentid)).toEqual(expectedAction)
    })


    //GroupAdminPage actions
    it('should create an action to change group information', () => {
        const expectedAction = {
            type: 'CHANGE_GROUP_INFO',
            groupid: groupid,
            grouptype: grouptype,
            groupname: groupname,
        }
        expect(actions.toChangeGroupInfo(groupid, grouptype, groupname)).toEqual(expectedAction)
    })

    it('should create an action to delete group user', () => {
        const expectedAction = {
            type: 'DELETE_GROUP_USER',
            groupid: groupid,
            userid: userid,
        }
        expect(actions.toDeleteGroupUser(groupid, userid)).toEqual(expectedAction)
    })

    it('should create an action to delete group design', () => {
        const expectedAction = {
            type: 'DELETE_GROUP_DESIGN',
            groupid: groupid,
            designid: designid,
        }
        expect(actions.toDeleteGroupDesign(groupid, designid)).toEqual(expectedAction)
    })

    it('should create an action to delete group', () => {
        const expectedAction = {
            type: 'DELETE_GROUP',
            groupid: groupid,
        }
        expect(actions.toDeleteGroup(groupid)).toEqual(expectedAction)
    })

    it('should create an action to give admin to other user', () => {
        const expectedAction = {
            type: 'GIVE_ADMIN',
            groupid: groupid,
            userid: userid,
        }
        expect(actions.toGiveAdmin(groupid, userid)).toEqual(expectedAction)
    })
})


// describe('GroupPage', () => {
//     it('renders without crashing', () => {
//         const component = create(<Provider store={store}><GroupPage /></Provider>);
//         expect(component.toJson()).toMatchSnapShot();
//     })

//     // it('renders')
//     //ReactDOM.render(<GroupPage/>, div);
//     //ReactDOM.unmountComponentAtNode(div);

//     // let component = null

//     // it('renders correctly', () => {
//     //     component = create(<GroupPage />)
//     // })

//     // it('should render a CREATE GROUP h2', () => {
//     //     const wrapper = shallow(
//     //         <h2 className="h_white">CREATE GROUP</h2>
//     //     )
//     //     expect(wrapper).toMatchSnapshot()
//     // })

//     // it('should render CREATE GROUP component', () => {
//     //     const wrapper = shallow(
//     //         <CreateGroup />
//     //     )
//     //     expect(wrapper).toMatchSnapshot()
//     // })

//     // it('matches snapshot', () => {
//     //     const tree = component.toJSON()
//     //     expect(tree).toMatchSnapshot()
//     // })

//     // describe('CreateGroup', () => {
//     //     // group 생성이 잘 되는지 확인
//     //     it('creates group correctly', () => {

//     //     })
//     // })

//     // describe('SearchingGroup', () => {
//     //     // 검색이 잘 되는지 확인
//     //     it('searches correctly', () => {

//     //     })
//     // })

//     // describe('MyGroupList')
// })


// // describe('GroupAdminPage', () => {
// //     let component = null

// //     it('renders correctly', () => {
// //         component = renderer.create(<GroupAdminPage />)
// //     })
// //     describe('ChangeGroupInfo')
// //     describe('GroupUser')
// //     describe('GroupDesign')
// // })

// // describe('GroupDetailPage', () => {
// // })
