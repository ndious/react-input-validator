import React from 'react'
import { shallow, mount } from 'enzyme'

import Password from '../src/password'

const valid = jest.fn()
const invalid = jest.fn()
const handleChange = ev => {
  if (ev.target.isValid) {
    valid()
  } else {
    invalid()
  }
}

it('should render a input', () => {
    const wrapper = shallow(<Password />)
    expect(wrapper).toMatchSnapshot()
});

it('should validate the value', () => {
  
  const wrapper = mount(<Password onChange={handleChange} lower />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'FOO'} })
  expect(invalid).toHaveBeenCalled()
  input.simulate('change', {target: {value: 'FOo'} })
  expect(valid).toHaveBeenCalled()
})

it('should validate the value', () => {
  const wrapper = mount(<Password onChange={handleChange} upper />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'foo'} })
  expect(invalid).toHaveBeenCalledTimes(2)
  input.simulate('change', {target: {value: 'foO'} })
  expect(valid).toHaveBeenCalledTimes(2)
})

it('should validate the value', () => {
  const wrapper = mount(<Password onChange={handleChange} special />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'foo'} })
  expect(invalid).toHaveBeenCalledTimes(3)
  input.simulate('change', {target: {value: '@foo'} })
  expect(valid).toHaveBeenCalledTimes(3)
})

it('should validate the value', () => {
  const wrapper = mount(<Password onChange={handleChange} number />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'foo'} })
  expect(invalid).toHaveBeenCalledTimes(4)
  input.simulate('change', {target: {value: '100'} })
  expect(valid).toHaveBeenCalledTimes(4)
})

it('should validate the value', () => {
  const wrapper = mount(<Password onChange={handleChange} min={3} max={4} />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: 'fo'} })
  expect(invalid).toHaveBeenCalledTimes(5)
  input.simulate('change', {target: {value: 'foo'} })
  expect(valid).toHaveBeenCalledTimes(5)
  input.simulate('change', {target: {value: 'foooo'} })
  expect(invalid).toHaveBeenCalledTimes(6)
})
