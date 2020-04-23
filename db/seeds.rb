# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#majors
major1 = Major.new
major1.name = "Comp. Sci."
major1.save!
major2 = Major.new
major2.name = "Computer Eng."
major2.save!

#users
user1 = User.new
user1.login = "Dan"
user1.email = "dan@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.major_id = 2
user1.role = "student"
user1.save!

user2 = User.new
user2.login = "Kyle"
user2.email = "kyle@cedarville.edu"
user2.password = "password"
user2.password_confirmation = "password"
user2.major_id = 1
user2.role = "student"
user2.save!

User.create(login: "G", email: "g@cedarville.edu", password: "password", password_confirmation: "password", role: "admin")

#catalogs
catalog1 = Catalog.new
catalog1.year = 2017
catalog1.save!

catalog2 = Catalog.new
catalog2.year = 2020
catalog2.save!

#requirements
requirements1 = Requirement.new
requirements1.major_id = 1
requirements1.catalog_id = 1
requirements1.save!
requirements2 = Requirement.new
requirements2.major_id = 1
requirements2.catalog_id = 2
requirements2.save!
requirements3 = Requirement.new
requirements3.major_id = 2
requirements3.catalog_id = 1
requirements3.save!
requirements4 = Requirement.new
requirements4.major_id = 2
requirements4.catalog_id = 2
requirements4.save!

#plans
plan1 = Plan.new
plan1.name = "Kyle's Comp. Sci. Plan"
plan1.curr_year = 2020
plan1.curr_term = "Spring"
plan1.user_id = 2
plan1.major_id = 1
plan1.catalog_id = 1
plan1.save!
plan2 = Plan.new
plan2.name = "Kyle's CpE Plan"
plan2.curr_year = 2020
plan2.curr_term = "Spring"
plan2.user_id = 2
plan2.major_id = 2
plan2.catalog_id = 1
plan2.save!
plan3 = Plan.new
plan3.name = "Dan's Comp. Sci. Plan"
plan3.curr_year = 2020
plan3.curr_term = "Spring"
plan3.user_id = 1
plan3.major_id = 1
plan3.catalog_id = 1
plan3.save!
plan4 = Plan.new
plan4.name = "Dan's CpE Plan"
plan4.curr_year = 2020
plan4.curr_term = "Spring"
plan4.user_id = 1
plan4.major_id = 2
plan4.catalog_id = 1
plan4.save!

#courses
course1 = Course.new
course1.designator = "CS-1210"
course1.name = "C++ Programming"
course1.description = "Feeble effort to teach programming"
course1.credits = 2
course1.save!
course2 = Course.new
course2.designator = "CS-1220"
course2.name = "OOD"
course2.description = "Why do we still teach C++"
course2.credits = 3
course2.save!
course3 = Course.new
course3.designator = "CS-2210"
course3.name = "Java"
course3.description = "What an aswesome prof!!!"
course3.credits = 3
course3.save!
course4 = Course.new
course4.designator = "CS-3220"
course4.name = "Web Apps"
course4.description = "Who won the Medal of Honor at Gettysburg"
course4.credits = 3
course4.save!
course5 = Course.new
course5.designator = "CS-3310"
course5.name = "OS"
course5.description = "Forget Windows. Let's do Linux!"
course5.credits = 3
course5.save!
course6 = Course.new
course6.designator = "CS-3320"
course6.name = "LSP"
course6.description = "Linux Kernel"
course6.credits = 3
course6.save!
course7 = Course.new
course7.designator = "CS-3350"
course7.name = "Foundation"
course7.description = "I love DSZQUP"
course7.credits = 3
course7.save!
course8 = Course.new
course8.designator = "CS-3410"
course8.name = "Algorithms"
course8.description = "The heart of computer science"
course8.credits = 3
course8.save!
course9 = Course.new
course9.designator = "CS-3510"
course9.name = "Compiler"
course9.description = "The BEST! Way Cool."
course9.credits = 3
course9.save!
course10 = Course.new
course10.designator = "CS-3610"
course10.name = "Databases"
course10.description = "What's a left join?"
course10.credits = 3
course10.save!
course11 = Course.new
course11.designator = "CS-4310"
course11.name = "Cyber Ops"
course11.description = "Attack!"
course11.credits = 3
course11.save!
course12 = Course.new
course12.designator = "CS-4330"
course12.name = "Software Security"
course12.description = "Buffer overflow"
course12.credits = 3
course12.save!
course13 = Course.new
course13.designator = "CS-4410"
course13.name = "Parallel Computing"
course13.description = "Impossible"
course13.credits = 3
course13.save!
course14 = Course.new
course14.designator = "CS-4710"
course14.name = "Computer Graphics"
course14.description = "Just games"
course14.credits = 3
course14.save!
course15 = Course.new
course15.designator = "CS-4810"
course15.name = "Software Engr I"
course15.description = "Love Senior Design!"
course15.credits = 3
course15.save!
course16 = Course.new
course16.designator = "CS-4810"
course16.name = "Software Engr II"
course16.description = "Love Senior Design!!"
course16.credits = 3
course16.save!
course17 = Course.new
course17.designator = "EGCP-1010"
course17.name = "DLD"
course17.description = "Cool course"
course17.credits = 3
course17.save!
course18 = Course.new
course18.designator = "EGCP-3010"
course18.name = "C++ ADLD"
course18.description = "I AM ROBOT"
course18.credits = 3
course18.save!
course19 = Course.new
course19.designator = "EGCP-3210"
course19.name = "Computer Arch"
course19.description = "Build the pipeline!"
course19.credits = 3
course19.save!
course20 = Course.new
course20.designator = "EGCP-4210"
course20.name = "Adv Computer Arch"
course20.description = "We love Tomasulo"
course20.credits = 3
course20.save!
course21 = Course.new
course21.designator = "EGCP-4310"
course21.name = "Networks"
course21.description = "Networking is very important for finding a job"
course21.credits = 3
course21.save!
course22 = Course.new
course22.designator = "EGGN-3110"
course22.name = "Ethics"
course22.description = "Politicians need to take this course."
course22.credits = 3
course22.save!
course23 = Course.new
course23.designator = "EGGN-4010"
course23.name = "Software Engr I"
course23.description = "Wrong major!"
course23.credits = 3
course23.save!
course24 = Course.new
course24.designator = "MATH-2520"
course24.name = "Discrete Math"
course24.description = "We should always be discrete"
course24.credits = 3
course24.save!
course25 = Course.new
course25.designator = "CHEM-1050"
course25.name = "Chem for Engineers"
course25.description = "Bedroom course"
course25.credits = 3.5
course25.save!
course26 = Course.new
course26.designator = "MATH-1710"
course26.name = "Calc I"
course26.description = "A weedout course"
course26.credits = 5
course26.save!
course27 = Course.new
course27.designator = "MATH-1720"
course27.name = "Calc II"
course27.description = "For the few who passed Calc I"
course27.credits = 5
course27.save!
course28 = Course.new
course28.designator = "MAth-3500"
course28.name = "Number Theory"
course28.description = "Why?"
course28.credits = 3
course28.save!
course29 = Course.new
course29.designator = "MATH-3610"
course29.name = "Linear Algebra"
course29.description = "As opposed to non-linear algebra?"
course29.credits = 3
course29.save!
course30 = Course.new
course30.designator = "MATH-3760"
course30.name = "Numeric Analysis"
course30.description = "Painful!"
course30.credits = 3
course30.save!
course31 = Course.new
course31.designator = "PHYS-2110"
course31.name = "Physics I"
course31.description = "Distance Velocity Acceleration"
course31.credits = 4
course31.save!
course32 = Course.new
course32.designator = "PHYS-2120"
course32.name = "Physics II"
course32.description = "Why do we take this again?"
course32.credits = 4
course32.save!
course33 = Course.new
course33.designator = "BTGE-1720"
course33.name = "Bible and the Gospel"
course33.description = "Introductory Bible class"
course33.credits = 3
course33.save!

#catalog courses
catalogCourse1 = CatalogCourse.new
catalogCourse1.catalog_id = 1
catalogCourse1.course_id = 1
catalogCourse2 = CatalogCourse.new
catalogCourse2.catalog_id = 1
catalogCourse2.course_id = 2
catalogCourse3 = CatalogCourse.new
catalogCourse3.catalog_id = 1
catalogCourse3.course_id = 3
catalogCourse4 = CatalogCourse.new
catalogCourse4.catalog_id = 1
catalogCourse4.course_id = 4
catalogCourse5 = CatalogCourse.new
catalogCourse5.catalog_id = 1
catalogCourse5.course_id = 5
catalogCourse6 = CatalogCourse.new
catalogCourse6.catalog_id = 1
catalogCourse6.course_id = 6
catalogCourse7 = CatalogCourse.new
catalogCourse7.catalog_id = 1
catalogCourse7.course_id = 7
catalogCourse8 = CatalogCourse.new
catalogCourse8.catalog_id = 1
catalogCourse8.course_id = 8
catalogCourse9 = CatalogCourse.new
catalogCourse9.catalog_id = 1
catalogCourse9.course_id = 9
catalogCourse10 = CatalogCourse.new
catalogCourse10.catalog_id = 1
catalogCourse10.course_id = 10
catalogCourse11 = CatalogCourse.new
catalogCourse11.catalog_id = 1
catalogCourse11.course_id = 11
catalogCourse12 = CatalogCourse.new
catalogCourse12.catalog_id = 1
catalogCourse12.course_id = 12
catalogCourse13 = CatalogCourse.new
catalogCourse13.catalog_id = 1
catalogCourse13.course_id = 13
catalogCourse14 = CatalogCourse.new
catalogCourse14.catalog_id = 1
catalogCourse14.course_id = 14
catalogCourse15 = CatalogCourse.new
catalogCourse15.catalog_id = 1
catalogCourse15.course_id = 15
catalogCourse16 = CatalogCourse.new
catalogCourse16.catalog_id = 1
catalogCourse16.course_id = 16
catalogCourse17 = CatalogCourse.new
catalogCourse17.catalog_id = 1
catalogCourse17.course_id = 17
catalogCourse18 = CatalogCourse.new
catalogCourse18.catalog_id = 1
catalogCourse18.course_id = 18
catalogCourse19 = CatalogCourse.new
catalogCourse19.catalog_id = 1
catalogCourse19.course_id = 19
catalogCourse20 = CatalogCourse.new
catalogCourse20.catalog_id = 1
catalogCourse20.course_id = 20
catalogCourse21 = CatalogCourse.new
catalogCourse21.catalog_id = 1
catalogCourse21.course_id = 21
catalogCourse22 = CatalogCourse.new
catalogCourse22.catalog_id = 1
catalogCourse22.course_id = 22
catalogCourse23 = CatalogCourse.new
catalogCourse23.catalog_id = 1
catalogCourse23.course_id = 23
catalogCourse24 = CatalogCourse.new
catalogCourse24.catalog_id = 1
catalogCourse24.course_id = 24
catalogCourse25 = CatalogCourse.new
catalogCourse25.catalog_id = 1
catalogCourse25.course_id = 25
catalogCourse26 = CatalogCourse.new
catalogCourse26.catalog_id = 1
catalogCourse26.course_id = 26
catalogCourse27 = CatalogCourse.new
catalogCourse27.catalog_id = 1
catalogCourse27.course_id = 27
catalogCourse28 = CatalogCourse.new
catalogCourse28.catalog_id = 1
catalogCourse28.course_id = 28
catalogCourse29 = CatalogCourse.new
catalogCourse29.catalog_id = 1
catalogCourse29.course_id = 29
catalogCourse30 = CatalogCourse.new
catalogCourse30.catalog_id = 1
catalogCourse30.course_id = 30
catalogCourse31 = CatalogCourse.new
catalogCourse31.catalog_id = 1
catalogCourse31.course_id = 31
catalogCourse32 = CatalogCourse.new
catalogCourse32.catalog_id = 1
catalogCourse32.course_id = 32
catalogCourse33 = CatalogCourse.new
catalogCourse33.catalog_id = 1
catalogCourse33.course_id = 33
catalogCourse34 = CatalogCourse.new
catalogCourse34.catalog_id = 2
catalogCourse34.course_id = 1
catalogCourse35 = CatalogCourse.new
catalogCourse35.catalog_id = 2
catalogCourse35.course_id = 2
catalogCourse36 = CatalogCourse.new
catalogCourse36.catalog_id = 2
catalogCourse36.course_id = 3
catalogCourse37 = CatalogCourse.new
catalogCourse37.catalog_id = 2
catalogCourse37.course_id = 4
catalogCourse38 = CatalogCourse.new
catalogCourse38.catalog_id = 2
catalogCourse38.course_id = 5
catalogCourse39 = CatalogCourse.new
catalogCourse39.catalog_id = 2
catalogCourse39.course_id = 6
catalogCourse40 = CatalogCourse.new
catalogCourse40.catalog_id = 2
catalogCourse40.course_id = 7
catalogCourse41 = CatalogCourse.new
catalogCourse41.catalog_id = 2
catalogCourse41.course_id = 8
catalogCourse42 = CatalogCourse.new
catalogCourse42.catalog_id = 2
catalogCourse42.course_id = 9
catalogCourse43 = CatalogCourse.new
catalogCourse43.catalog_id = 2
catalogCourse43.course_id = 10
catalogCourse44 = CatalogCourse.new
catalogCourse44.catalog_id = 2
catalogCourse44.course_id = 11
catalogCourse45 = CatalogCourse.new
catalogCourse45.catalog_id = 2
catalogCourse45.course_id = 12
catalogCourse46 = CatalogCourse.new
catalogCourse46.catalog_id = 2
catalogCourse46.course_id = 13
catalogCourse47 = CatalogCourse.new
catalogCourse47.catalog_id = 2
catalogCourse47.course_id = 14
catalogCourse48 = CatalogCourse.new
catalogCourse48.catalog_id = 2
catalogCourse48.course_id = 15
catalogCourse49 = CatalogCourse.new
catalogCourse49.catalog_id = 2
catalogCourse49.course_id = 16
catalogCourse50 = CatalogCourse.new
catalogCourse50.catalog_id = 2
catalogCourse50.course_id = 17
catalogCourse51 = CatalogCourse.new
catalogCourse51.catalog_id = 2
catalogCourse51.course_id = 18
catalogCourse52 = CatalogCourse.new
catalogCourse52.catalog_id = 2
catalogCourse52.course_id = 19
catalogCourse53 = CatalogCourse.new
catalogCourse53.catalog_id = 2
catalogCourse53.course_id = 20
catalogCourse54 = CatalogCourse.new
catalogCourse54.catalog_id = 2
catalogCourse54.course_id = 21
catalogCourse55 = CatalogCourse.new
catalogCourse55.catalog_id = 2
catalogCourse55.course_id = 22
catalogCourse56 = CatalogCourse.new
catalogCourse56.catalog_id = 2
catalogCourse56.course_id = 23
catalogCourse57 = CatalogCourse.new
catalogCourse57.catalog_id = 2
catalogCourse57.course_id = 24
catalogCourse58 = CatalogCourse.new
catalogCourse58.catalog_id = 2
catalogCourse58.course_id = 25
catalogCourse59 = CatalogCourse.new
catalogCourse59.catalog_id = 2
catalogCourse59.course_id = 26
catalogCourse60 = CatalogCourse.new
catalogCourse60.catalog_id = 2
catalogCourse60.course_id = 27
catalogCourse61 = CatalogCourse.new
catalogCourse61.catalog_id = 2
catalogCourse61.course_id = 28
catalogCourse62 = CatalogCourse.new
catalogCourse62.catalog_id = 2
catalogCourse62.course_id = 29
catalogCourse63 = CatalogCourse.new
catalogCourse63.catalog_id = 2
catalogCourse63.course_id = 30
catalogCourse64 = CatalogCourse.new
catalogCourse64.catalog_id = 2
catalogCourse64.course_id = 31
catalogCourse65 = CatalogCourse.new
catalogCourse65.catalog_id = 2
catalogCourse65.course_id = 32
catalogCourse66 = CatalogCourse.new
catalogCourse66.catalog_id = 2
catalogCourse66.course_id = 33

#categories
Core1 = Category.new
Core1.name = "Core"
Core1.requirements_id = 1
Electives1 = Category.new
Electives1.name = "Electives"
Electives1.requirements_id = 1
Cognates1 = Category.new
Cognates1.name = "Cognates"
Cognates1.requirements_id = 1

Core2 = Category.new
Core2.name = "Core"
Core2.requirements_id = 2
Electives2 = Category.new
Electives2.name = "Electives"
Electives2.requirements_id = 2
Cognates2 = Category.new
Cognates2.name = "Cognates"
Cognates2.requirements_id = 2

Core3 = Category.new
Core3.name = "Core"
Core3.requirements_id = 3
Electives3 = Category.new
Electives3.name = "Electives"
Electives3.requirements_id = 3
Cognates3 = Category.new
Cognates3.name = "Cognates"
Cognates3.requirements_id = 3

Core4 = Category.new
Core4.name = "Core"
Core4.requirements_id = 4
Electives4 = Category.new
Electives4.name = "Electives"
Electives4.requirements_id = 4
Cognates4 = Category.new
Cognates4.name = "Cognates"
Cognates4.requirements_id = 4

#category courses
categoryCourse1 = CategoryCourse.new
categoryCourse1.category_id = 1
categoryCourse1.course_id = 1
categoryCourse2 = CategoryCourse.new
categoryCourse2.category_id = 2
categoryCourse2.course_id = 2
categoryCourse3 = CategoryCourse.new
categoryCourse3.category_id = 1
categoryCourse3.course_id = 5
categoryCourse4 = CategoryCourse.new
categoryCourse4.category_id = 2
categoryCourse4.course_id = 4
categoryCourse5 = CategoryCourse.new
categoryCourse5.category_id = 2
categoryCourse5.course_id = 19
categoryCourse6 = CategoryCourse.new
categoryCourse6.category_id = 2
categoryCourse6.course_id = 7
categoryCourse7 = CategoryCourse.new
categoryCourse7.category_id = 3
categoryCourse7.course_id = 13
categoryCourse8 = CategoryCourse.new
categoryCourse8.category_id = 3
categoryCourse8.course_id = 18
categoryCourse9 = CategoryCourse.new
categoryCourse9.category_id = 4
categoryCourse9.course_id = 8
categoryCourse10 = CategoryCourse.new
categoryCourse10.category_id = 4
categoryCourse10.course_id = 12
categoryCourse11 = CategoryCourse.new
categoryCourse11.category_id = 5
categoryCourse11.course_id = 21
categoryCourse12 = CategoryCourse.new
categoryCourse12.category_id = 5
categoryCourse12.course_id = 11
categoryCourse13 = CategoryCourse.new
categoryCourse13.category_id = 6
categoryCourse13.course_id = 7
categoryCourse14 = CategoryCourse.new
categoryCourse14.category_id = 6
categoryCourse14.course_id = 28
categoryCourse15 = CategoryCourse.new
categoryCourse15.category_id = 7
categoryCourse15.course_id = 15
categoryCourse16 = CategoryCourse.new
categoryCourse16.category_id = 7
categoryCourse16.course_id = 13
categoryCourse17 = CategoryCourse.new
categoryCourse17.category_id = 8
categoryCourse17.course_id = 30
categoryCourse18 = CategoryCourse.new
categoryCourse18.category_id = 8
categoryCourse18.course_id = 23
categoryCourse19 = CategoryCourse.new
categoryCourse19.category_id = 9
categoryCourse19.course_id = 9
categoryCourse20 = CategoryCourse.new
categoryCourse20.category_id = 9
categoryCourse20.course_id = 17
categoryCourse21 = CategoryCourse.new
categoryCourse21.category_id = 10
categoryCourse21.course_id = 18
categoryCourse22 = CategoryCourse.new
categoryCourse22.category_id = 10
categoryCourse22.course_id = 22
categoryCourse23 = CategoryCourse.new
categoryCourse23.category_id = 11
categoryCourse23.course_id = 17
categoryCourse24 = CategoryCourse.new
categoryCourse24.category_id = 11
categoryCourse24.course_id = 27
categoryCourse25 = CategoryCourse.new
categoryCourse25.category_id = 12
categoryCourse25.course_id = 3
categoryCourse26 = CategoryCourse.new
categoryCourse26.category_id = 12
categoryCourse26.course_id = 4

#plan courses
planCourse1 = PlanCourse.new
planCourse1.plan_id = 1
planCourse1.course_id = 1
planCourse1.term = "Fall"
planCourse1.year = 2017
planCourse1.save!
planCourse2 = PlanCourse.new
planCourse2.plan_id = 1
planCourse2.course_id = 17
planCourse2.term = "Fall"
planCourse2.year = 2017
planCourse2.save!
planCourse3 = PlanCourse.new
planCourse3.plan_id = 1
planCourse3.course_id = 26
planCourse3.term = "Fall"
planCourse3.year = 2017
planCourse3.save!
planCourse4 = PlanCourse.new
planCourse4.plan_id = 1
planCourse4.course_id = 2
planCourse4.term = "Spring"
planCourse4.year = 2018
planCourse4.save!
planCourse5 = PlanCourse.new
planCourse5.plan_id = 1
planCourse5.course_id = 23
planCourse5.term = "Spring"
planCourse5.year = 2018
planCourse5.save!
planCourse6 = PlanCourse.new
planCourse6.plan_id = 1
planCourse6.course_id = 27
planCourse6.term = "Spring"
planCourse6.year = 2018
planCourse6.save!
planCourse7 = PlanCourse.new
planCourse7.plan_id = 1
planCourse7.course_id = 5
planCourse7.term = "Fall"
planCourse7.year = 2018
planCourse7.save!
planCourse8 = PlanCourse.new
planCourse8.plan_id = 1
planCourse8.course_id = 32
planCourse8.term = "Fall"
planCourse8.year = 2018
planCourse8.save!
planCourse9 = PlanCourse.new
planCourse9.plan_id = 1
planCourse9.course_id = 3
planCourse9.term = "Spring"
planCourse9.year = 2019
planCourse9.save!
planCourse10 = PlanCourse.new
planCourse10.plan_id = 1
planCourse10.course_id = 7
planCourse10.term = "Spring"
planCourse10.year = 2019
planCourse10.save!
planCourse11 = PlanCourse.new
planCourse11.plan_id = 1
planCourse11.course_id = 24
planCourse11.term = "Spring"
planCourse11.year = 2019
planCourse11.save!
planCourse12 = PlanCourse.new
planCourse12.plan_id = 1
planCourse12.course_id = 19
planCourse12.term = "Spring"
planCourse12.year = 2019
planCourse12.save!
planCourse13 = PlanCourse.new
planCourse13.plan_id = 1
planCourse13.course_id = 8
planCourse13.term = "Fall"
planCourse13.year = 2019
planCourse13.save!
planCourse14 = PlanCourse.new
planCourse14.plan_id = 1
planCourse14.course_id = 21
planCourse14.term = "Fall"
planCourse14.year = 2019
planCourse14.save!
planCourse15 = PlanCourse.new
planCourse15.plan_id = 1
planCourse15.course_id = 6
planCourse15.term = "Fall"
planCourse15.year = 2019
planCourse15.save!
planCourse16 = PlanCourse.new
planCourse16.plan_id = 1
planCourse16.course_id = 4
planCourse16.term = "Spring"
planCourse16.year = 2020
planCourse16.save!
planCourse17 = PlanCourse.new
planCourse17.plan_id = 1
planCourse17.course_id = 10
planCourse17.term = "Spring"
planCourse17.year = 2020
planCourse17.save!
planCourse18 = PlanCourse.new
planCourse18.plan_id = 1
planCourse18.course_id = 29
planCourse18.term = "Spring"
planCourse18.year = 2020
planCourse18.save!
planCourse19 = PlanCourse.new
planCourse19.plan_id = 1
planCourse19.course_id = 15
planCourse19.term = "Fall"
planCourse19.year = 2020
planCourse19.save!
planCourse20 = PlanCourse.new
planCourse20.plan_id = 1
planCourse20.course_id = 14
planCourse20.term = "Fall"
planCourse20.year = 2020
planCourse20.save!
planCourse21 = PlanCourse.new
planCourse21.plan_id = 1
planCourse21.course_id = 16
planCourse21.term = "Spring"
planCourse21.year = 2021
planCourse21.save!
planCourse22 = PlanCourse.new
planCourse22.plan_id = 1
planCourse22.course_id =22
planCourse22.term = "Spring"
planCourse22.year = 2021
planCourse22.save!
planCourse23 = PlanCourse.new
planCourse23.plan_id = 1
planCourse23.course_id = 12
planCourse23.term = "Spring"
planCourse23.year = 2021
planCourse23.save!
planCourse24 = PlanCourse.new
planCourse24.plan_id = 2
planCourse24.course_id = 1
planCourse24.term = "Fall"
planCourse24.year = 2017
planCourse24.save!
planCourse25 = PlanCourse.new
planCourse25.plan_id = 2
planCourse25.course_id = 2
planCourse25.term = "Spring"
planCourse25.year = 2018
planCourse25.save!
planCourse26 = PlanCourse.new
planCourse26.plan_id = 2
planCourse26.course_id = 3
planCourse26.term = "Fall"
planCourse26.year = 2018
planCourse26.save!
planCourse27 = PlanCourse.new
planCourse27.plan_id = 2
planCourse27.course_id = 19
planCourse27.term = "Spring"
planCourse27.year = 2019
planCourse27.save!
planCourse28 = PlanCourse.new
planCourse28.plan_id = 2
planCourse28.course_id = 20
planCourse28.term = "Fall"
planCourse28.year = 2019
planCourse28.save!
planCourse29 = PlanCourse.new
planCourse29.plan_id = 2
planCourse29.course_id = 18
planCourse29.term = "Spring"
planCourse29.year = 2020
planCourse29.save!
planCourse30 = PlanCourse.new
planCourse30.plan_id = 2
planCourse30.course_id = 23
planCourse30.term = "Fall"
planCourse30.year = 2020
planCourse30.save!
planCourse31 = PlanCourse.new
planCourse31.plan_id = 2
planCourse31.course_id = 22
planCourse31.term = "Spring"
planCourse31.year = 2021
planCourse31.save!
planCourse32 = PlanCourse.new
planCourse32.plan_id = 3
planCourse32.course_id = 1
planCourse32.term = "Fall"
planCourse32.year = 2017
planCourse32.save!
planCourse33 = PlanCourse.new
planCourse33.plan_id = 3
planCourse33.course_id = 2
planCourse33.term = "Spring"
planCourse33.year = 2018
planCourse33.save!
planCourse34 = PlanCourse.new
planCourse34.plan_id = 3
planCourse34.course_id = 3
planCourse34.term = "Fall"
planCourse34.year = 2018
planCourse34.save!
planCourse35 = PlanCourse.new
planCourse35.plan_id = 3
planCourse35.course_id = 19
planCourse35.term = "Spring"
planCourse35.year = 2019
planCourse35.save!
planCourse36 = PlanCourse.new
planCourse36.plan_id = 3
planCourse36.course_id = 20
planCourse36.term = "Fall"
planCourse36.year = 2019
planCourse36.save!
planCourse37 = PlanCourse.new
planCourse37.plan_id = 3
planCourse37.course_id = 18
planCourse37.term = "Spring"
planCourse37.year = 2020
planCourse37.save!
planCourse38 = PlanCourse.new
planCourse38.plan_id = 3
planCourse38.course_id = 23
planCourse38.term = "Fall"
planCourse38.year = 2020
planCourse38.save!
planCourse39 = PlanCourse.new
planCourse39.plan_id = 3
planCourse39.course_id = 21
planCourse39.term = "Spring"
planCourse39.year = 2021
planCourse39.save!


#alternate syntax
#Plan.create(user_id: user1.id, name: "Plan1")
#Plan.create(user_id: user1.id, name: "Plan2")
