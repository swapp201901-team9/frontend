// import React from 'react';
// import {shallow, configure} from 'enzyme';
// import {create} from 'react-test-renderer';
// import Adapter from 'enzyme-adapter-react-15';
import * as actions from '../../actions/index'
import React from 'react';
import ReactDOM from 'react-dom';
import GroupPage from "./GroupPage";
// import GroupAdminPage from "./GroupAdminPage";
// import CreateGroup from "./CreateGroup";

//configure({ adapter: new Adapter() });

describe ('ACTIONS', ()=> {
    it('should create an action with correct type', () => {
        const expectedAction = {
            type: 'NAV_BAR'
        }
        expect(actions.showNavBar()).toEqual(expectedAction)
    })
})

describe('GroupPage', () => {
    //ReactDOM.render(<GroupPage/>, div);
    //ReactDOM.unmountComponentAtNode(div);

    // let component = null

    // it('renders correctly', () => {
    //     component = create(<GroupPage />)
    // })

    // it('should render a CREATE GROUP h2', () => {
    //     const wrapper = shallow(
    //         <h2 className="h_white">CREATE GROUP</h2>
    //     )
    //     expect(wrapper).toMatchSnapshot()
    // })

    // it('should render CREATE GROUP component', () => {
    //     const wrapper = shallow(
    //         <CreateGroup />
    //     )
    //     expect(wrapper).toMatchSnapshot()
    // })

    // it('matches snapshot', () => {
    //     const tree = component.toJSON()
    //     expect(tree).toMatchSnapshot()
    // })

    // describe('CreateGroup', () => {
    //     // group 생성이 잘 되는지 확인
    //     it('creates group correctly', () => {

    //     })
    // })

    // describe('SearchingGroup', () => {
    //     // 검색이 잘 되는지 확인
    //     it('searches correctly', () => {

    //     })
    // })

    // describe('MyGroupList')
})


// describe('GroupAdminPage', () => {
//     let component = null

//     it('renders correctly', () => {
//         component = renderer.create(<GroupAdminPage />)
//     })
//     describe('ChangeGroupInfo')
//     describe('GroupUser')
//     describe('GroupDesign')
// })

// describe('GroupDetailPage', () => {
// })