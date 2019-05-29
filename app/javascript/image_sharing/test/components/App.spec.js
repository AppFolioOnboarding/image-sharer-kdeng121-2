/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import App from '../../components/App';

describe('<App />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App />);

    const header = wrapper.find('Header');
    assert.strictEqual(header.length, 1);
    assert.strictEqual(header.prop('title'), 'Tell us what you think');

    const feedbackForm = wrapper.find('FeedbackForm');
    assert.strictEqual(feedbackForm.length, 1);

    const footer = wrapper.find('Footer');
    assert.strictEqual(footer.length, 1);
  });
});
