class MoodsController < ApplicationController
  def new
  end
  def create
    # if  params[:moodItems]
    #   response = params[:moodItems]
    # else
    #   response = "nothing to see here"
    # end
    # p params
    #
    # response = params[:msg]
    # response = params
    response = ""
    # i = 0
    # params['items'].each do |key,value|
    #   response += "#{i} #{key} + #{value}"
    #   i += 1
    # end
    response = params['items']['item0']['item_name']
    @mood_items = []
    @mood = Mood.new
    @mood.name = "mood"
    @mood.save
    params['items'].each do |key, value|
      mood_item = MoodItem.new
      mood_item.item_id = Item.find_by(:name => params['items'][key]['item_name']).id
      mood_item.left_coord = params['items'][key]['left_coord']
      mood_item.top_coord = params['items'][key]['top_coord']
      mood_item.z_index = 1
      mood_item.mood_id = @mood.id
      if mood_item.save
        @mood_items << mood_item
      else
        flash[:result_text] = "some items did not save properly."
        flash[:messages] = mood_item.errors
      end
    end



    redirect_to new_mood_path(:params_1 => response)

    # respond_to(:js)

    # render :root_path => false, params: response
  end
  def show
    @mood = Mood.find(params[:id])
    @mood_items = @mood.mood_items
    
  end
end
