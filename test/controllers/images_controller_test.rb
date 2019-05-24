require 'test_helper'
require 'nokogiri'
class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test 'New action displays image URL submission form' do
    get new_image_path
    assert_response :ok
    assert_select 'h1', 'New Image'
  end

  test 'Create action accepts URL, saves and redirects' do
    assert_difference 'Image.count', 1 do
      post images_path,
           params: { image: { url: 'http://test.com' } }
    end
    image = Image.last
    assert_equal 'http://test.com', image.url
    assert_response :redirect
    assert_redirected_to image_path(image.id)
  end

  test 'Create action renders new page on invalid URL input' do
    post images_path,
         params: { image: { url: 'test' } }
    assert_response :unprocessable_entity
    assert_select '.invalid-feedback', 'Url is invalid'
  end

  test 'Show action displays the image with specified id' do
    image = Image.create!(url: 'http://test.com')
    get image_path(image.id)
    assert_response :ok
    assert_select 'h1', 'Your image'
    assert_select 'img[src="http://test.com"]'
  end

  test 'Index action displays list of images, with most recently added first' do
    Image.destroy_all
    Image.create!(url: 'http://test1.com',
                  created_at: Time.zone.parse('Tue, 18 Apr 2017 01:00:00 EDT -04:00'))
    Image.create!(url: 'http://test3.com',
                  created_at: Time.zone.parse('Tue, 18 Apr 2017 03:00:00 EDT -04:00'))
    Image.create!(url: 'http://test2.com',
                  created_at: Time.zone.parse('Tue, 18 Apr 2017 02:00:00 EDT -04:00'))
    get images_path
    assert_select 'h1', 'All Images'
    assert_select 'img' do |img|
      assert_equal 'http://test3.com', img[0].attribute('src').value
      assert_equal 'http://test2.com', img[1].attribute('src').value
      assert_equal 'http://test1.com', img[2].attribute('src').value
    end
  end
end
