import React from 'react';
import DesignPage from './DesignPage';
import {create} from 'react-test-renderer'
import { tsExternalModuleReference } from '@babel/types';

describe('My first snapshot test', ()=> {
    test('testing design page', () => {
        let tree = create(<DesignPage/>)
        expect(tree.toJSON()).toMatchSnapshot();
    })
})