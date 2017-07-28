import React from 'react'
import { shallow } from 'enzyme'

import Email from '../src/email'
import { Input } from '../src/input'

it('should render a input', () => {
    const wrapper = shallow(<Email />)
    expect(wrapper).toMatchSnapshot()
});
