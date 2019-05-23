require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test 'URL is not blank' do
    image = Image.new
    assert_not image.save, 'Saved image with blank URL'
  end

  test 'URL is valid' do
    image = Image.new
    image.url = 'test.com'
    assert_not image.save
    image.url = 'http://test.com'
    assert image.save
  end
end
