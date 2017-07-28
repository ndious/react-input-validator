import React from 'react'
import { shallow, mount } from 'enzyme'

import { Input } from '../src/input'

it('should render a input', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper).toMatchSnapshot()
});

it('should render a input id', () => {
    const wrapper = shallow(<Input name="foo" />)
    expect(wrapper.find('#foo').length).toBe(1)
});

it('should called onChange event', () => {
  const handleChange = jest.fn()
  const wrapper = mount(<Input id="test" onChange={handleChange} />)
  console.log(wrapper.find('#test'))
  wrapper.find('#test').simulate('keyDown', { which: 'a' })
  expect(handleChange).toHaveBeenCalled()
})