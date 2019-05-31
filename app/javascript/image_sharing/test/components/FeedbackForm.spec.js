/* eslint-env mocha */

import sinon from 'sinon';
import assert from 'assert';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { FormFeedback } from 'reactstrap';
import FeedbackForm from '../../components/FeedbackForm';
import * as api from '../../utils/helper';

describe('<Form />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FeedbackForm />);
    const form = wrapper.find('Form');

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

  it('should make api request on submission and reset input fields', () => {
    const wrapper = shallow(<FeedbackForm />);

    wrapper.instance().setState({
      name: 'testName',
      comments: 'testComment'
    });

    wrapper.update();

    const spy = sinon.spy();
    const mockedEvent = { preventDefault: spy };
    const stub = sinon.stub(api, 'post');
    stub.resolves({ message: 'Feedback successfully submitted' });

    return wrapper.instance().handleSubmit(mockedEvent).then(() => {
      assert(mockedEvent.preventDefault.calledOnce);
      assert(stub.calledOnceWithExactly('http://localhost:3000/api/feedbacks', { name: 'testName', comments: 'testComment' }));
      assert.strictEqual(wrapper.instance().state.name, '');
      assert.strictEqual(wrapper.instance().state.comments, '');
      stub.restore();
    });
  });

  it('should display sucess alert message when success message is set', () => {
    const wrapper = shallow(<FeedbackForm />);
    let alertMessage = wrapper.find('Alert').at(0);

    assert.strictEqual(alertMessage.prop('isOpen'), false);

    wrapper.instance().setState({ successMessage: 'Feedback successfully submitted' });
    wrapper.update();

    alertMessage = wrapper.find('Alert').at(0);

    assert.strictEqual(alertMessage.prop('isOpen'), true);
    assert.strictEqual(alertMessage.children().text(), 'Feedback successfully submitted');
  });

  it('should set name error message when name is blank', () => {
    const wrapper = shallow(<FeedbackForm />);

    wrapper.instance().setState({
      name: '',
      comments: 'testComment'
    });

    wrapper.update();

    const spy = sinon.spy();
    const mockedEvent = { preventDefault: spy };
    const stub = sinon.stub(api, 'post');
    stub.rejects({
      data: {
        name: "can't be blank"
      }
    });

    return wrapper.instance().handleSubmit(mockedEvent).then(() => {
      assert(mockedEvent.preventDefault.calledOnce);
      assert(stub.calledOnceWithExactly('http://localhost:3000/api/feedbacks', { name: '', comments: 'testComment' }));
      assert.strictEqual(wrapper.instance().state.name, '');
      assert.strictEqual(wrapper.instance().state.comments, 'testComment');
      assert.strictEqual(wrapper.instance().state.successMessage, '');
      assert.strictEqual(wrapper.instance().state.failureMessage, '');
      assert.strictEqual(wrapper.instance().state.nameErrorMessage, "can't be blank");
      assert.strictEqual(wrapper.instance().state.commentsErrorMessage, '');
      stub.restore();
    });
  });

  it('should display name error message when name error message is set', () => {
    const wrapper = mount(<FeedbackForm />);
    let formFeedback = wrapper.find(FormFeedback).at(0);

    assert.strictEqual(formFeedback.text(), '');

    wrapper.instance().setState({ nameErrorMessage: "can't be blank" });
    wrapper.update();

    formFeedback = wrapper.find(FormFeedback).at(0);

    assert.strictEqual(formFeedback.text(), "can't be blank");
  });

  it('should should set comments error message when comments is blank', () => {
    const wrapper = shallow(<FeedbackForm />);

    wrapper.instance().setState({
      name: 'testName',
      comments: ''
    });

    wrapper.update();

    const spy = sinon.spy();
    const mockedEvent = { preventDefault: spy };
    const stub = sinon.stub(api, 'post');
    stub.rejects({
      data: {
        comments: "can't be blank"
      }
    });

    return wrapper.instance().handleSubmit(mockedEvent).then(() => {
      assert(mockedEvent.preventDefault.calledOnce);
      assert(stub.calledOnceWithExactly('http://localhost:3000/api/feedbacks', { name: 'testName', comments: '' }));
      assert.strictEqual(wrapper.instance().state.name, 'testName');
      assert.strictEqual(wrapper.instance().state.comments, '');
      assert.strictEqual(wrapper.instance().state.successMessage, '');
      assert.strictEqual(wrapper.instance().state.failureMessage, '');
      assert.strictEqual(wrapper.instance().state.nameErrorMessage, '');
      assert.strictEqual(wrapper.instance().state.commentsErrorMessage, "can't be blank");
      stub.restore();
    });
  });

  it('should display comments error message when comments error message is set', () => {
    const wrapper = mount(<FeedbackForm />);
    let formFeedback = wrapper.find(FormFeedback).at(1);

    assert.strictEqual(formFeedback.text(), '');

    wrapper.instance().setState({ commentsErrorMessage: "can't be blank" });
    wrapper.update();

    formFeedback = wrapper.find(FormFeedback).at(1);

    assert.strictEqual(formFeedback.text(), "can't be blank");
  });

  it('should set name and comments error message when both name and comments are blank', () => {
    const wrapper = shallow(<FeedbackForm />);

    wrapper.instance().setState({
      name: '',
      comments: ''
    });

    wrapper.update();

    const spy = sinon.spy();
    const mockedEvent = { preventDefault: spy };
    const stub = sinon.stub(api, 'post');
    stub.rejects({
      data: {
        name: "can't be blank",
        comments: "can't be blank"
      }
    });

    return wrapper.instance().handleSubmit(mockedEvent).then(() => {
      assert(mockedEvent.preventDefault.calledOnce);
      assert(stub.calledOnceWithExactly('http://localhost:3000/api/feedbacks', { name: '', comments: '' }));
      assert.strictEqual(wrapper.instance().state.name, '');
      assert.strictEqual(wrapper.instance().state.comments, '');
      assert.strictEqual(wrapper.instance().state.successMessage, '');
      assert.strictEqual(wrapper.instance().state.failureMessage, '');
      assert.strictEqual(wrapper.instance().state.nameErrorMessage, "can't be blank");
      assert.strictEqual(wrapper.instance().state.commentsErrorMessage, "can't be blank");
      stub.restore();
    });
  });

  it('should set failure error message if error other than name/comments error occurred', () => {
    const wrapper = shallow(<FeedbackForm />);

    const spy = sinon.spy();
    const mockedEvent = { preventDefault: spy };
    const stub = sinon.stub(api, 'post');
    stub.rejects({ message: 'Unprocessable entity' });

    return wrapper.instance().handleSubmit(mockedEvent).then(() => {
      assert(mockedEvent.preventDefault.calledOnce);
      assert(stub.calledOnceWith('http://localhost:3000/api/feedbacks'));
      assert.strictEqual(wrapper.instance().state.name, '');
      assert.strictEqual(wrapper.instance().state.comments, '');
      assert.strictEqual(wrapper.instance().state.successMessage, '');
      assert.strictEqual(wrapper.instance().state.failureMessage, 'Unprocessable entity');
      assert.strictEqual(wrapper.instance().state.nameErrorMessage, '');
      assert.strictEqual(wrapper.instance().state.commentsErrorMessage, '');
      stub.restore();
    });
  });

  it('should display failure alert message when failure error message is set', () => {
    const wrapper = shallow(<FeedbackForm />);
    let alertMessage = wrapper.find('Alert').at(1);

    assert.strictEqual(alertMessage.prop('isOpen'), false);

    wrapper.instance().setState({ failureMessage: 'Unprocessable entity' });
    wrapper.update();

    alertMessage = wrapper.find('Alert').at(1);

    assert.strictEqual(alertMessage.prop('isOpen'), true);
    assert.strictEqual(alertMessage.children().text(), 'Unprocessable entity');
  });

  it('should handle name and comments input changes', () => {
    const wrapper = shallow(<FeedbackForm />);
    const nameInput = wrapper.find('Input').at(0);
    nameInput.simulate('change', { target: { value: 'testName' } });
    wrapper.update();

    assert.strictEqual(wrapper.instance().state.name, 'testName');

    const commentsInput = wrapper.find('Input').at(1);
    commentsInput.simulate('change', { target: { value: 'testComment' } });
    wrapper.update();

    assert.strictEqual(wrapper.instance().state.comments, 'testComment');
  });
});
