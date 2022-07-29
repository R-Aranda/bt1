class Api::V1::PostsController < ApiController
  def index
    posts = Post.all 
    render json: posts
  end

  def show
    # render json: post
    post = Post.find(params[:id])
    comments = post.comments
    response = { :post => post, :comments => comments }
    respond_to do |format|
      format.json { render :json => response}
    end
  end

  def create 
    
    post = Post.new(post_params)

    if post.save 
      render json: post
      
    else 
      render json: { error: post.errors.full_messages }, status: "400"
      
    end
  end

  def post_params 
    params.permit(:title, :body)
  end


end