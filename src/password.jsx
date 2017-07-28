import React from 'react'
import Input from './input'

const Password = ({min, max, upper, lower, special, number, ...props}) => {
  let validator = '^'
  validator += lower ? '(?=.*[a-z])' : ''
  validator += upper ? '(?=.*[A-Z])' : ''
  validator += number ? '(?=.*\\d)' : ''
  validator += special ? '(?=.*[$@$!%*?&])' : ''
  validator += `[\\w\\d$@$!%*?&]{${min || 0},${max || ''}}$`

  return (
    <Input
      type="password"
      validator={new RegExp(validator)}
      {...props}
    />
  )
}

export default Password
