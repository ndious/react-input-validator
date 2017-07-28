import React from 'react'
import { shallow, mount } from 'enzyme'

import Text from '../src/text'

it('should render a input', () => {
    const wrapper = shallow(<Text />)
    expect(wrapper).toMatchSnapshot()
});

it('should validate the value', () => {
  const valid = jest.fn()
  const invalid = jest.fn()
  const handleChange = ev => {
    if (ev.target.isValid) {
      valid()
    } else {
      invalid()
    }
  }
  const wrapper = mount(<Text validate={/\d+/} onChange={handleChange} />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'foo'} })
  expect(invalid).toHaveBeenCalled()
  input.simulate('change', {target: {value: '12'} })
  expect(valid).toHaveBeenCalled()
})
