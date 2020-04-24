class PlanCoursesController < ApplicationController
	#post
	def create
		@planCourse = PlanCourse.new
		@planCourse.plan_id = Plan.where(name: params[:plan], user_id: params[:user])[0].id
		@planCourse.course_id = Course.where(designator: params[:designator])[0].id
		@planCourse.term = params[:term]
		@planCourse.year = params[:year]
		@planCourse.save!
	end
	
	#get
	def index
		@planCourse = PlanCourse.where(plan_id: Plan.where(name: params[:plan], user_id: params[:user])[0].id, course_id: Course.where(designator: params[:designator])[0].id)[0]
		@planCourse.destroy();
	end
end	
