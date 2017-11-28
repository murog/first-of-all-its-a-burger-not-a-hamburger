class MoodsController < ApplicationController
  def new
  end
  def create
    response = ""

    response = params['items']['item0']['item_name']
    @mood_items = []
    @mood = Mood.new
    @mood.name = params['name']
    @mood.description = params['description']
    @mood.save
    params['items'].each do |key, value|
      mood_item = MoodItem.new
      mood_item.item_id = Item.find_by(:name => params['items'][key]['item_name']).id
      mood_item.left_coord = params['items'][key]['left_coord']
      mood_item.top_coord = params['items'][key]['top_coord']
      mood_item.z_index = params['items'][key]['z_index']
      mood_item.mood_id = @mood.id
      if mood_item.save
        @mood_items << mood_item
      else
        flash[:result_text] = "some items did not save properly."
        flash[:messages] = mood_item.errors.values
      end
    end
    
    redirect_to mood_path(@mood.id)
  end
  def show
    second_id = params[:id].to_i - 1
    @mood = Mood.find(params[:id])
    @mood_items = @mood.mood_items
    @second_mood = Mood.find(second_id)
    @second_mood_items = @second_mood.mood_items

  end
end
