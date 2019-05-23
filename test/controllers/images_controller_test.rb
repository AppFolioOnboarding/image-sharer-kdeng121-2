require 'test_helper'
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
    added_url = Image.last.url
    assert_equal 'http://test.com', added_url
    assert_response :redirect
    follow_redirect!
    assert_response :ok
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
end
