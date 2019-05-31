require 'test_helper'

class FeedbacksController < ActionDispatch::IntegrationTest
  test 'Feedback is created when name and comments are present' do
    assert_difference 'Feedback.count', 1 do
      post api_feedbacks_path, params: { feedback: { name: 'test', comments: 'test2' } }
    end
    assert_response :created
    assert_equal 'test', Feedback.last.name
    assert_equal 'test2', Feedback.last.comments
    res = JSON.parse(response.body)
    assert_equal 'Feedback successfully submitted', res['message']
  end

  test 'Feedback is not created when name is blank' do
    assert_no_difference 'Feedback.count' do
      post api_feedbacks_path, params: { feedback: { comments: 'test2' } }
    end
    assert_response :unprocessable_entity
    res = JSON.parse(response.body)
    assert_equal res.length, 1
    assert_equal "can't be blank", res['name'][0]
  end

  test 'Feedback is not created when comments is blank' do
    assert_no_difference 'Feedback.count' do
      post api_feedbacks_path, params: { feedback: { name: 'test' } }
    end
    assert_response :unprocessable_entity
    res = JSON.parse(response.body)
    assert_equal res.length, 1
    assert_equal "can't be blank", res['comments'][0]
  end

  test 'Feedback is not created when both name and comments are blank' do
    assert_no_difference 'Feedback.count' do
      post api_feedbacks_path, params: { feedback: { other: '' } }
    end
    assert_response :unprocessable_entity
    res = JSON.parse(response.body)
    assert_equal 1, res['name'].length
    assert_equal 1, res['comments'].length
    assert_equal "can't be blank", res['name'][0]
    assert_equal "can't be blank", res['comments'][0]
  end
end
