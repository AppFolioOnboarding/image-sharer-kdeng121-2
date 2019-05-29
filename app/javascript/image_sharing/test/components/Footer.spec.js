/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    const message = wrapper.find('footer');

    assert.strictEqual(message.length, 1);
    assert.strictEqual(message.text(), 'Copyright: Appfolio Inc. Onboarding');
  });
});
