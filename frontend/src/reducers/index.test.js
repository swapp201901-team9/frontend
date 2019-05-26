// jest testing
import React from 'react';
import {create} from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import DesignPage from '../components/DesignPage/DesignPage'
import * as actions from '../actions';
import homepageApp from './index.js';

describe('DesignPage', ()=> {
    it('renders without crashing', ()=>{
        //const component = create(<DesignPage/>);
        //const instance = component.getInstance();
        //await instance.componentDidMount();

        //const div = document.createElement('div');
        //ReactDOM.render(<Clock/>, div);

        //mount(<DesignPage/>);
        shallow(<DesignPage />);
    })
})

const initState = {
    authorization: "",
    profile_user: null,

    all_groups: [],
    my_groups: [],
    filtered_groups: [],

    group_users: [], 
    group_designs: [], 

    now_group: null,
    now_design: {
        body: "001c58",
        sleeve: "f8f8f8",
        banding: "001c58",
        stripe: "ffffff",
        button: "001c58"

    },

    my_requests: [],
    load : 0,
    loading: false,
}


describe('homepage reducer', () => {
    it('should return the initial state', () => {
        expect(homepageApp(undefined, {})).toEqual(initState)
    })
    it('should fill authorization', () => {
        const auth = 'test:testpasswd'
        expect(homepageApp(undefined, actions.authenticate(window.btoa(auth)))).toEqual({
            authorization: auth,
            profile_user: null,

            all_groups: [],
            my_groups: [],
            filtered_groups: [],
            
            group_users: [], 
            group_designs: [], 

            now_group: null,
            now_design: {
                body: "001c58",
                sleeve: "f8f8f8",
                banding: "001c58",
                stripe: "ffffff",
                button: "001c58"
        
            },

            my_requests: [],
            load: 0,
            loading: false,
        })
    })
    it('should return the signout state', () => {
        expect(homepageApp(undefined, actions.signOut())).toEqual(initState)
    })
    it('should return the changed state', () => {
        const auth = 'test:testpasswd'

        const state = {
            authorization: auth,
            profile_user: null,

            all_groups: [],
            my_groups: [],
            filtered_groups: [],

            group_users: [], 
            group_designs: [], 

            now_group: null,
            now_design: {
                body: "001c58",
                sleeve: "f8f8f8",
                banding: "001c58",
                stripe: "ffffff",
                button: "001c58"
        
            },  

            my_requests: [],
            load: 0,
            loading: false,

        }

        expect(homepageApp(undefined, actions.setState(state))).toEqual(state)
    })


})
