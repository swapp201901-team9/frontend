import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
//import DesignPage from './DesignPage';
//import FabricCanvas from './FabricCanvas';
import TemplateList from './TemplateList';
import TemplateListItem from './TemplateListItem';
//import {create} from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

//Enzyme.configure({ adapter: new Adapter() });

describe('My first snapshot test', ()=> {
    test('testing design page', () => {
        //let tree = create(<DesignPage/>)
        //expect(tree.toJSON()).toMatchSnapshot();
    })
})

describe('FabricCanvas', ()=> {
    it ('renders without crashing', ()=> {
        //const component = create(<FabricCanvas/>);
       //const instance = component.getInstance();
        //await instance.componentDidMount();

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

describe('TemplateList', ()=> {
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

        //const div = document.createElement('div');
        //ReactDOM.render(<Clock/>, div);

        //mount(<DesignPage/>);
        //shallow(<DesignPage />);
    })
})


