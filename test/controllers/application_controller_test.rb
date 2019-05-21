require 'test_helper'
class ApplicationControllerTest < ActionDispatch::IntegrationTest
  test 'Should get home' do
    get root_path
    assert_response :ok
    assert_select 'h1', 'Hello world'
  end
end
