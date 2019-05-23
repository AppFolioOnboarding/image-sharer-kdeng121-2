require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'Invalid when URL is blank' do
    image = Image.new
    assert_not image.valid?
    assert_equal ["Url can't be blank", 'Url is invalid'], image.errors.full_messages
  end

  test 'Invalid when URL is invalid' do
    image = Image.new(url: 'test.com')
    assert_not image.valid?
    assert_equal ['Url is invalid'], image.errors.full_messages
  end

  test 'Valid when URL is valid' do
    image = Image.new(url: 'http://test.com')
    assert image.valid?
  end
end
