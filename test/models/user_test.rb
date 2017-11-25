require "test_helper"

describe User do
  let(:user) { User.new }

  it "must be invalid without username, email, uid, or provider" do
    user.valid?.must_equal false
    user.username = "crisco"
    user.valid?.must_equal false
    user.email = "da_real_crisco@yahoo.com"
    user.valid?.must_equal false
    user.uid = 1000
    user.valid?.must_equal false
    user.provider = "github"
    user.valid?.must_equal true

  end

  it "must be invalid if username is not unique" do
    second_ghost = users(:second_ghost)
    second_ghost.valid?.must_equal true
    second_ghost.username = "ghost" #existing user
    second_ghost.valid?.must_equal false
  end


end
