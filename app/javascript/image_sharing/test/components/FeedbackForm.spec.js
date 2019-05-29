/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import FeedbackForm from '../../components/FeedbackForm';

describe('<Form />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FeedbackForm />);
    const form = wrapper.find('Form');

    console.log(wrapper.debug());

    const nameLabel = form.find('Label').at(0);
    assert.strictEqual(nameLabel.children().text(), 'Your name:');

    const nameInput = form.find('Input').at(0);
    assert.strictEqual(nameInput.prop('type'), 'text');

    const commentLabel = form.find('Label').at(1);
    assert.strictEqual(commentLabel.children().text(), 'Comments:');

    const commentInput = form.find('Input').at(1);
    assert.strictEqual(commentInput.prop('type'), 'textarea');

    const submitButton = form.find('Button');
    assert.strictEqual(submitButton.length, 1);
    assert.strictEqual(submitButton.children().text(), 'Submit');
  });
});
