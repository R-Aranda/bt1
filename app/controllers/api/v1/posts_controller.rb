class Api::V1::PostsController < ApiController


  def index
    posts = Post.all 
    render json: posts
  end

  # def show
  # end
  # etc..

  def create 
    post = Post.new(post_params)

    if post.save 
      render json: post
      # no redirect!
    else 
      render json: { message: post.errors.full_messages }, status: "400"
    end
  end

  def post_params 
    params.permit(:title, :body)
  end


end