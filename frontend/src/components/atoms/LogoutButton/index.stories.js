import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LogoutButton from '.'

storiesOf('LogoutButton', module)
  .add('default', () => (
    <LogoutButton>Hello</LogoutButton>
  ))
  .add('reverse', () => (
    <LogoutButton reverse>Hello</LogoutButton>
  ))
