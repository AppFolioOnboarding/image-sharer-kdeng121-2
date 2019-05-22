class ImagesController < ApplicationController
  def new
    @image = Image.new
  end

  def create; end
end
