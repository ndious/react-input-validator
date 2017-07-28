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
  const wrapper = mount(<Input id="test" validator={/.*/} onChange={handleChange} />)
  wrapper.find('input').simulate('change', {target: {value: 'xyz'} })
  expect(handleChange).toHaveBeenCalled()
})

it('should called onBlur event', () => {
  const handleBlur = jest.fn()
  const wrapper = mount(<Input id="test" validator={() => (true)} onBlur={handleBlur} />)
  wrapper.find('input').simulate('blur')
  expect(handleBlur).toHaveBeenCalled()
})

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
  const wrapper = mount(<Input id="test" validator={/\d{2}/} onChange={handleChange} />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: '1'} })
  expect(invalid).toHaveBeenCalled()
  input.simulate('change', {target: {value: '12'} })
  expect(valid).toHaveBeenCalled()
})

it('should require the value', () => {
  const empty = jest.fn()
  const notEmpty = jest.fn()
  const handleChange = ev => {
    if (ev.target.isEmpty) {
      empty()
    } else {
      notEmpty()
    }
  }
  const wrapper = mount(<Input id="test" validator={/\d{2}/} onChange={handleChange} />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: '1'} })
  expect(notEmpty).toHaveBeenCalled()
  input.simulate('change', {target: {value: ''} })
  expect(empty).toHaveBeenCalled()
})

it('should be onError is empty and not a digit', () => {
  const valid = jest.fn()
  const invalid = jest.fn()
  const handleChange = ev => {
    if (!ev.target.onError) {
      valid()
    } else {
      invalid()
    }
  }
  const wrapper = mount(<Input id="test" validator={/\d+/} onChange={handleChange} required />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: '12'} })
  expect(valid).toHaveBeenCalled()
  input.simulate('change', {target: {value: ''} })
  expect(invalid).toHaveBeenCalled()
  input.simulate('change', {target: {value: 'a'} })
  expect(invalid).toHaveBeenCalled()
})

it('should be not in onError if is empty or a digit', () => {
  const valid = jest.fn()
  const invalid = jest.fn()
  const handleChange = ev => {
    if (!ev.target.onError) {
      valid()
    } else {
      invalid()
    }
  }
  const wrapper = mount(<Input id="test" validator={/\d+/} onChange={handleChange} />)
  const input = wrapper.find('input')
  input.simulate('change', {target: {value: '12'} })
  expect(valid).toHaveBeenCalled()
  input.simulate('change', {target: {value: ''} })
  expect(valid).toHaveBeenCalled()
  input.simulate('change', {target: {value: 'a'} })
  expect(invalid).toHaveBeenCalled()
})
