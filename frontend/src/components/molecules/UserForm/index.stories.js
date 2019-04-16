import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { UserForm } from 'components'

storiesOf('UserForm', module)
  .add('default', () => (
    <UserForm>Hello</UserForm>
  ))
  .add('reverse', () => (
    <UserForm reverse>Hello</UserForm>
  ))
