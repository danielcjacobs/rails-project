json.plan do
    json.id @plan.id
    json.courses @plan.plan_courses do |planCourse|
        json.designator planCourse.course.designator
		json.year planCourse.year
		json.term planCourse.term
  end
end
