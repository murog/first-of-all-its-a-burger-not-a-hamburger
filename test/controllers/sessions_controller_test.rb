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

    it "should create a new user if user hasn't logged in before" do
      start_count = User.count
      user = User.new username: "Greg", provider: 'github', email: 'RapMonster@naver.com', uid: "398509348"
      log_in(user, :github)
      User.count.must_equal(start_count + 1)
    end
  end
end
#
