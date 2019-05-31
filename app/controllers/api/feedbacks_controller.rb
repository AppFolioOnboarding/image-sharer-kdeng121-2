module Api
  class FeedbacksController < ApplicationController
    def create
      feedback = Feedback.new(feedback_params)
      if feedback.save
        render status: :created, json: { message: 'Feedback successfully submitted' }
      else
        render status: :unprocessable_entity, json: feedback.errors.messages
      end
    end

    private

    def feedback_params
      params.require(:feedback).permit(:name, :comments)
    end
  end
end
