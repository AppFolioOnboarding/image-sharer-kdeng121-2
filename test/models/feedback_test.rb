require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  test 'Feedback is valid when name and comments are not blank' do
    feedback = Feedback.new(name: 'Test', comments: 'Comment')
    assert feedback.valid?

    assert_difference 'Feedback.count', 1 do
      feedback.save
    end
  end

  test 'Feedback is invalid when name or comments is blank' do
    feedback1 = Feedback.new(name: '', comments: 'Comment')
    assert_not feedback1.valid?

    feedback2 = Feedback.new(name: 'Test', comments: '')
    assert_not feedback2.valid?
  end
end
