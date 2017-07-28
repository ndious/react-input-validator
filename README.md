# react-input-validator

A customizable and extendible form validator for react apps

## Usage

Create your form and by using the specials input you will recieve the validity of the value in onChange and onBlur event.

```js
handleChange(event) {
  event.target.onError // is false if all the requierement are valid eles is true
  event.target.isEmpty // is true when the input is empty
  event.target.isValid // is true if the input value is corresponding to the validation
}
```

## Usage Example

```js
import React, { Component } from 'react'
import { Email, Password } from 'react-input-validator'

class LoginForm extends Component {

  constructor(props) {
    super()
    this.state = {
      value: {
        email: '',
        password: '',
      },
      invalid: {
        email: true,
        password: true,
      },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const newState = {
      value: {},
      invalid: {},
    }

    newState.value[event.target.id] = event.target.value
    newState.invalid[event.target.id] = event.target.onError

    this.setState(newState)
  }

  render() {
    return (
      <form>
        <Email id="email" onChange={this.handleChange} value={this.state.value.email} required />
        <Password id="password" onChange={this.handleChange} value={this.state.value.password} min={6} required />
        <input type="submit" value="Login" disable={this.state.invalid.email || this.state.invalid.password} />
      </form>
    )
  }
}

export default LoginForm
```

## Custom input

### Parameters in common for all Input

All inputs have this following options available

`required` => force the input to be not empty
`onChange` => onChange event
`onBlur` => onBlur event

And all the default parameters for an input like `className`, `id`, `onFocus`, etc.

### Input Text

#### options

`validate` => A regex or a function to validate the value

#### example

```js
import React from 'react'
import { Text } from 'react-input-validator'

const PhoneInput = (props) => (
  <Text validate={/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/} {...props} />
)

export default PhoneInput
```

### Input Password 

#### options

`min` => minimum of characters number
`max` => maximun of characters number
`upper` => require uppercase character 
`lower` =>  require lowercase character
`special` => require special character
`number` => require number character

#### example

```js
import React from 'react'
import { Password } from 'react-input-validator'

const StrongPasswordInput = (props) => (
  <Password min={10} upper lower special number {...props} />
)

export default StrongPasswordInput
```

### Input Email

#### options

There is no special option for input type email

#### example

```js
import React from 'react'
import { Email } from 'react-input-validator'

const EmailInput = (props) => (
  <Email {...props} />
)

export default EmailInput
```
