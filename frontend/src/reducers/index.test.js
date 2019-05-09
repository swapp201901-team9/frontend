// jest testing

import * as actions from '../actions';
import homepageApp from './index.js';

const initState = {
    authorization: "",
    profile_user: null,

    all_groups: [],
    my_groups: [],
    filtered_groups: [],

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

            my_requests: [],
            load: 0,
            loading: false,

        }

        expect(homepageApp(undefined, actions.setState(state))).toEqual(state)
    })


})
