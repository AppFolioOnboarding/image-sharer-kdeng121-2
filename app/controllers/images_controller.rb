class ImagesController < ApplicationController
  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      redirect_to @image
    else
      render :new, status: :unprocessable_entity
    end
  end

  def index
    @images = if params[:tag].present?
                Image.tagged_with(params[:tag]).order(created_at: :desc)
              else
                Image.order(created_at: :desc)
              end
  end

  def show
    @image = Image.find(params[:id])
  end

  def destroy
    begin
      @image = Image.find(params[:id])
      @image.destroy
    rescue ActiveRecord::RecordNotFound
      flash[:notice] = 'Image does not exist'
    end
    redirect_to images_path
  end

  private

  def image_params
    params.require(:image).permit(:url, :tag_list)
  end
end
