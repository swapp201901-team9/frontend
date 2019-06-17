import React from 'react';
import ReactDOM from 'react-dom';

//import {fabric} from 'fabric';
//import { connect } from 'react-redux';
//import DesignPage from './DesignPage';
import FabricCanvas from './FabricCanvas';
import TemplateList from './TemplateList';
import TemplateListItem from './TemplateListItem';
import ResetButton from './ResetButton';
//import SaveButton from './SaveButton';
import {create} from 'react-test-renderer';
//import {configure, mount, shallow} from 'enzyme';
//import Adapter from 'enzyme-adapter-react-15';
import * as actions from '../../actions/index'

//configure({ adapter: new Adapter() });
describe ('ACTIONS', ()=> {
  
    it('should create new design', () => {
        const expectedAction = {
            type: 'NEW_DESIGN',
        }
        expect(actions.toNewDesign()).toEqual(expectedAction)
    })

    /*it('should save design', (designid, design, text, image, logo) => {
        const expectedAction = {
            type: 'SAVE_DESIGN',
            designid: designid, 
            design: design,
            text: text,
            image: image,
            logo: logo,
        }
        expect(actions.toSaveDesign(designid, design, text, image, logo)).toEqual(expectedAction)
    })*/

    /*it('should post design', (designid, groupid, design, text, image, logo) => {
        const expectedAction = {
            type: 'POST_DESIGN',
            designid: designid,
            groupid: groupid,
            design: design,
            text: text,
            image: image,
            logo: logo,
        }
        expect(actions.toPostDesign(designid, groupid, design, text, image, logo)).toEqual(expectedAction)
    })*/
})

describe('ResetButton', () => {
    it ('renders reset button', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ResetButton/>, div);
        ReactDOM.unmountComponentAtNode(div);

        //let tree = create(<ResetButton/>);
        //expect(tree.toJSON()).toMatchSnapshot();

        //const wrapper = shallow(<ResetButton/>);
        //expect(wrapper.length).toBe(1);
    })
})


describe('snapshot test', ()=> {
    test('testing fabric canvas', () => {
        let tree = create(<div/>)
        expect(tree.toJSON()).toMatchSnapshot();
    })
})

describe('FabricCanvas', ()=> {
    it ('renders without crashing', ()=> {
       // const component = create(<FabricCanvas/>);
        //const instance = component.getInstance();
        //instance.componentDidMount();

         //const div = document.createElement('div');
         //ReactDOM.render(<FabricCanvas/>, div);
         //ReactDOM.unmountComponentAtNode(div);

         //const wrapper = shallow(<FabricCanvas/>);
         //expect(wrapper.length).toBe(1);
    })
})

describe('DesignPage', ()=> {
    it('renders without crashing', ()=>{
        //const component = create(<DesignPage/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();

        //const div = document.createElement('div');
        //ReactDOM.render(<Clock/>, div);

        //mount(<DesignPage/>);
        //shallow(<DesignPage />);
    })
})

describe('TemplateListItem', ()=> {
    it('renders without crashing', ()=>{
        //const component = create(<DesignPage/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();
        
        const a = document.createElement('a');
        ReactDOM.render(<TemplateListItem/>, a);
        ReactDOM.unmountComponentAtNode(a);


        //mount(<DesignPage/>);
        //shallow(<DesignPage />);

    
    })
})

describe('TemplateList', ()=> {
    it('renders without crashing', ()=>{
        //const component = create(<DesignPage/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();

        //const div = document.createElement('div');
        //ReactDOM.render(<Clock/>, div);

        //mount(<DesignPage/>);
        //shallow(<DesignPage />);

        //const wrapper = shallow(<TemplateListItem/>);
        //expect(wrapper.length).toBe(1);
    })
})
