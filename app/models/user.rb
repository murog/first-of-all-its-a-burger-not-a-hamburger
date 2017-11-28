class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :uid, presence: true
  validates :provider, presence: true

  def self.from_auth_hash(provider, auth_hash)
    user = new
    user.provider = provider
    user.uid = auth_hash['uid']
    user.username = auth_hash['info']['name'] || auth_hash['info']['nickname']
    user.email = auth_hash['info']['email']

    return user
  end
  
end
