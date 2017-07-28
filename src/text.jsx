import React from 'react'
import {Input }from './input'

const Text = ({validate, ...props}) => (
  <Input type="text" validator={validate || /.*/} {...props} />
)

export default Text
