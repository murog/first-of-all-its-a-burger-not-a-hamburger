require "test_helper"

describe SessionsController do
  describe "auth_callback" do
    it "should log in an existing user and redirect them to root" do
      start_count = User.count
      user = users(:ghost)
      log_in(user, :github)
      must_respond_with :redirect
      User.count.must_equal start_count
    end
  end
end
#
