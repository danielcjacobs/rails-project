json.user do
	json.id plan.user.id
	json.login plan.user.login
	json.role plan.user.role
end
json.id plan.id
json.plan_name plan.name
json.major plan.major.name
json.curr_year plan.curr_year
json.curr_term plan.curr_term
json.courses do
	plan.plan_courses.each{ |planCourse| json.set! planCourse.course.designator do
		json.designator planCourse.course.designator
		json.year planCourse.year
		json.term planCourse.term
	end
	}
end

json.catalog do
	json.year plan.catalog.year
	json.courses do 
		plan.catalog.catalog_courses.each{ |catalogCourse| json.set! catalogCourse.course.designator do
			json.designator catalogCourse.course.designator
			json.name catalogCourse.course.name
			json.description catalogCourse.course.description
			json.credits catalogCourse.course.credits
		end
		}
	end
end

json.requirements plan.major.requirements.where(catalog_id: plan.catalog.id)[0].categories do |category|
	json.name category.name
	json.courses category.category_courses.collect{ |cc| cc.course.designator}
end
	