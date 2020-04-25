var currPlan = false;
var plan = false;
var selectedMajor = "Comp. Sci.";
var selectedCatalogYear = 2017;
var catalogLoaded = false;
var draggedCourse = false;
var draggedReqOrigin = false;
var draggedPlanOrigin = false;

$(getPlans);

// changes plan, triggered on selection of new plan in dropdown
$(document).on('change', '#planSelect', function (){
    var selected = $(this).find("option:selected").text();
	console.log(selected);
    selected = selected.split(", ");
    console.log(selected);
    selectedMajor = selected[0];
    selectedCatalogYear = parseInt(selected[1]);
   
    // send request to load new plan
    getPlans();

});

function getPlans(){
	$.get("plans.json", function(plans){
		//console.log(plans);
        plan = false;
        $(".dropdown").html("<option selected disabled>Change Plan</option>");
        for (let i in plans){
            if (plans[i].major === selectedMajor && plans[i].catalog.year === selectedCatalogYear){
                plan = plans[i];
            }
            else{
                // Put other plan options in dropdown menu on nav bar
                $(".dropdown").append("<option>" + plans[i].major + ", " + plans[i].catalog.year + "</option>");
            }
        }
        if (plan === false){
            console.log("Error: did not find selected plan");
        }
		
		currPlan = new Plan(plan.user.login, plan.plan_name, plan.major, plan.curr_year, plan.curr_term, plan.courses, plan.catalog.year);
        currPlan.sortCourses();
        currPlan.generateHTML();
        $("#major").html(plan.major);
        $("#catYear").html(plan.catalog.year);

        $("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
        $("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
		$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
        $("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);

		let courses = [];
		for (let c in plan.catalog.courses){
			courses.push(plan.catalog.courses[c]);
		}
		if (!catalogLoaded){
			$("#catalogTable").DataTable( {
				"dom": '<"top"if>t',
				"data": courses,
				"columns": [
						{ "data": "designator" },
						{ "data": "name" },
						{ "data": "description" },
						{ "data": "credits"}
				],
				"scrollY": "95px",
				"paging": false,
				"scrollCollapse": false 
        	});
        	$('.dataTables_scrollHeadInner').css('padding', '0');
			catalogLoaded = true;
			$('tr.odd').attr('draggable', 'true');
			$('tr.odd').attr('ondragstart', 'dragFromCat(event)');
			$('tr.even').attr('draggable', 'true');
			$('tr.even').attr('ondragstart', 'dragFromCat(event)');
		}
		
        
        var requirements = plan.requirements;

        $( function() {
            $( "#accordion" ).accordion({collapsible: true, active: false});
        });

        $('#accordion').empty();
        for (let i in requirements){
            let reqCourses = requirements[i].courses;
            let itemHtml = "";
            for (let reqC in reqCourses){
				if (!courseInPlan(reqCourses[reqC])){
					itemHtml += '<li draggable="true" ondragstart="dragFromReq(event)">' + reqCourses[reqC] + ': ' + plan.catalog.courses[reqCourses[reqC]].name + '</li>';
				}
				else{
					itemHtml += '<li draggable="true" ondragstart="dragFromReq(event)" hidden="true">' + reqCourses[reqC] + ': ' + plan.catalog.courses[reqCourses[reqC]].name + '</li>';
				}
            }
            $('#accordion').append('<h3><a href="#">' + requirements[i].name + '</a></h3><div>' + itemHtml + '</div>').accordion('refresh');
        }
	});
}

function checkMissingReqs() {
    let requirements = plan.requirements;
    let planCourses = currPlan.courses;
    let reqsMissing = 0;
    for (req in requirements) {
        let reqType = requirements[req];
        for (courseIdx in reqType.courses) {
            let course = reqType.courses[courseIdx];
            let reqMet = false;
            for (id in planCourses) {
                if (id == course) {
                    reqMet = true;
                }
            }
            if (!reqMet) {
                reqsMissing++;
            } 
        }
    }
    if (reqsMissing == 0) {
        $("#requirments").html("Requirements Met!");
    } else {
        $("#requirments").html("Requirments missing: " + reqsMissing);
    }
}

function courseInPlan(designator){
	let c = plan.courses[designator];
	return c !== undefined;
}

window.dragFromReq = function(event){
	let desig = event.target.innerText.split(": ")[0];
	draggedCourse = plan.catalog.courses[desig];
	draggedPlanOrigin = null;
	draggedReqOrigin = event.target;
}

window.dragFromCat = function(event){
	let desig = event.target.children[0].innerText
	draggedCourse = plan.catalog.courses[desig];
	draggedPlanOrigin = null;
	draggedReqOrigin = null;
}

window.dragFromPlan = function(event){
	let desig = event.target.innerText.split(": ")[0];
	draggedCourse = plan.catalog.courses[desig];
	draggedReqOrigin = null;
    draggedPlanOrigin = event.target;
    checkMissingReqs();
}

window.hoverOverPlan = function(event){
	event.preventDefault();
}

window.dropOnPlan = function(event){
	event.preventDefault();
	event.target.children[1].innerHTML += "<li draggable='true' ondragstart='dragFromPlan(event)'>" + draggedCourse.designator + ": " + draggedCourse.name + "</li>";
	if (event.target.classList.contains('current')){
		currPlan.hrsCurrent += draggedCourse.credits;
	}
	else if (event.target.classList.contains('notStarted')){
		currPlan.hrsFuture += draggedCourse.credits;
	}
	else{
		currPlan.hrsCompleted += draggedCourse.credits;
	}
	let hours = parseInt(event.target.children[0].children[1].innerText.split(": ")[1]);
	event.target.children[0].children[1].innerText = "Hours: " + (hours + draggedCourse.credits);
	if (draggedReqOrigin !== null){
		// From requirements accordion
		currPlan.hrsTotal += draggedCourse.credits;
		draggedReqOrigin.hidden = true;
		draggedReqOrigin = null;
	}
	else if (draggedPlanOrigin !== null){
		// From another term
		if (draggedPlanOrigin.parentElement.parentElement.classList.contains('current')){
			currPlan.hrsCurrent -= draggedCourse.credits;
		}
		else if (draggedPlanOrigin.parentElement.parentElement.classList.contains('notStarted')){
			currPlan.hrsFuture -= draggedCourse.credits;
		}
		else{
			currPlan.hrsCompleted -= draggedCourse.credits;
		}
		let originHours = parseInt(draggedPlanOrigin.parentElement.previousSibling.children[1].innerText.split(": ")[1]);
		draggedPlanOrigin.parentElement.previousSibling.children[1].innerText = "Hours: " + (originHours - draggedCourse.credits);
		draggedPlanOrigin.remove();
		draggedPlanOrigin = null;
	}
	else{
		// From catalog table
		currPlan.hrsTotal += draggedCourse.credits;
	}
	$.post("/plan_courses", {
		plan: plan.plan_name, 
		user: plan.user.id, 
		designator: draggedCourse.designator, 
		term: event.target.children[0].children[0].innerText.split(" ")[0],
		year: parseInt(event.target.children[0].children[0].innerText.split(" ")[1]),
	});
	$("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
    $("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
	$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
    $("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
    checkMissingReqs();
	draggedCourse = null;
}

window.hoverOverTrash = function(event){
	event.preventDefault();
}

window.dropInTrash = function(event){
	event.preventDefault();
	if (draggedPlanOrigin !== null){
		currPlan.hrsTotal -= draggedCourse.credits;
		if (draggedPlanOrigin.parentElement.parentElement.classList.contains('current')){
			currPlan.hrsCurrent -= draggedCourse.credits;
		}
		else if (draggedPlanOrigin.parentElement.parentElement.classList.contains('notStarted')){
			currPlan.hrsFuture -= draggedCourse.credits;
		}
		else{
			currPlan.hrsCompleted -= draggedCourse.credits;
		}
		let originHours = parseInt(draggedPlanOrigin.parentElement.previousSibling.children[1].innerText.split(": ")[1]);
		draggedPlanOrigin.parentElement.previousSibling.children[1].innerText = "Hours: " + (originHours - draggedCourse.credits);
		draggedPlanOrigin.remove();
		draggedPlanOrigin = null;
		
		$.get("/plan_courses", {
			designator: draggedCourse.designator,
			user: plan.user.id,
			plan: plan.plan_name
		});
		$("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
		$("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
		$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
		$("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
	}
	draggedCourse = null;
}

class Course {
    constructor(desig, year, term){
        this.term = term;
        this.year = year;
        this.id = desig;
        this.name = plan.catalog.courses[desig].name;
        this.hours = plan.catalog.courses[desig].credits;
    }
}

class Plan {
    constructor(student, name, major, currYr, currTerm, courses, cat_yr){
        this.name = name;
        this.catalogYear = cat_yr;
        this.major = major;
        this.studentName = student;
        this.currTerm = currTerm;
        this.currYear = currYr;
        if (currTerm === "Fall"){
            currYear++;
        }
        this.courses = courses;
        this.years = [];
        this.hrsCompleted = 0;
        this.hrsCurrent = 0;
		this.hrsFuture = 0;
		this.hrsTotal = 0;
    }

    sortCourses(){
        for(let c in this.courses){
            let yrNum = this.courses[c].year;
            if (this.courses[c].term === "Fall"){
                yrNum++;
            }
            let course = new Course(c, yrNum, this.courses[c].term);
            let year = this.years.find(x => x.name === yrNum);
            if(typeof year === 'undefined'){
                year = new Year(yrNum);
                this.years.push(year);
            }
            year.addToYear(course);
        }
    }

    generateHTML(){
        this.years.sort((a, b) => (a.name > b.name) ? 1 : -1);
        let urHTML = "<header class='panelHeader'>Course Schedule</header><div class='container'>"; 
        var beforeCurrent = true;
        for (let i = 0; i < this.years.length; i++){
            let year = this.years[i];
            urHTML += "<div class='year'>";
            urHTML += "<div class='term";
            if (beforeCurrent){
                if (year.name === this.currYear && this.currTerm === "Fall"){
                    this.hrsCurrent += year.fallHrs;
                    urHTML += " current";
                    beforeCurrent = false;
                }
            }
            else{
				this.hrsFuture += year.fallHrs;
                urHTML += " notStarted";
            }
            urHTML += "' ondragover='hoverOverPlan(event)' ondrop='dropOnPlan(event)'>";
            urHTML += "<header><span class='termHeader'>Fall " + (year.name - 1) + "</span><span class='termHours'>Hours: " + year.fallHrs + "</span></header>";
            urHTML += "<ul class='courses'>";
            for (let j = 0; j < year.fall.length; j++){
                let course = year.fall[j];
                this.hrsTotal += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li draggable='true' ondragstart='dragFromPlan(event)'>" + course.id + ": " + course.name + "</li>";
            }
            urHTML += "</ul></div>";
                
            urHTML += "<div class='term";
            if (beforeCurrent){
                if (year.name === this.currYear && this.currTerm === "Spring"){
                    this.hrsCurrent += year.springHrs;
                    urHTML += " current";
                    beforeCurrent = false;
                }
            }
            else{
				this.hrsFuture += year.springHrs;
                urHTML += " notStarted";
            }
            urHTML += "' ondragover='hoverOverPlan(event)' ondrop='dropOnPlan(event)'>";
            urHTML += "<header><span class='termHeader'>Spring " + year.name + "</span><span class='termHours'>Hours: " + year.springHrs + "</span></header>";
            urHTML += "<ul class='courses'>";
            for (let j = 0; j < year.spring.length; j++){
                let course = year.spring[j];
                this.hrsTotal += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li draggable='true' ondragstart='dragFromPlan(event)'>" + course.id + ": " + course.name + "</li>";
            }
            urHTML += "</ul></div>";
                
            urHTML += "<div class='term";
            if (beforeCurrent){
                if (year.name === this.currYear && this.currTerm === "Summer"){
                    this.hrsCurrent += year.summerHrs;
                    urHTML += " current";
                    beforeCurrent = false;
                }
            }
            else{
				this.hrsFuture += year.summerHrs;
                urHTML += " notStarted";
            }
            urHTML += "' ondragover='hoverOverPlan(event)' ondrop='dropOnPlan(event)'>";
            urHTML += "<header><span class='termHeader'>Summer " + year.name + "</span><span class='termHours'>Hours: " + year.summerHrs + "</span></header><ul class='courses'>";
            for (let j = 0; j < year.summer.length; j++){
                let course = year.summer[j];
                this.hrsTotal += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li draggable='true' ondragstart='dragFromPlan(event)'>" + course.id + ": " + course.name + "</li>";
            }
            urHTML += "</ul></div></div>";
        }
        urHTML += "</div>";
        var upperRight = $("#upperRight").html(urHTML);
    }
}

class Year {
    constructor(name) {
        this.name = name;
        this.fall = [];
        this.fallHrs = 0;
        this.spring = [];
        this.springHrs = 0;
        this.summer = [];
        this.summerHrs = 0;

        this.maxCourses = 8;
        this.maxHrs = 30;
    }

    addToYear(course){
        if (course.term === "Fall"){
            if (this.fallHrs + course.hours > this.maxHrs || this.fall.length > this.maxCourses){
                alert("You ain't got time for that, fool!");
            }
            else{
                this.fall.push(course);
                this.fallHrs += course.hours;
            }
        }
        else if (course.term === "Spring"){
            if (this.springHrs + course.hours > this.maxHrs || this.spring.length > this.maxCourses){
                alert("You ain't got time for that, fool!");
            }
            else{
                this.spring.push(course);
                this.springHrs += course.hours;
            }
        }
        else {
            if (this.summerHrs + course.hours > this.maxHrs || this.summer.length > this.maxCourses){
                alert("You ain't got time for that, fool!");
            }
            else {
                this.summer.push(course);
                this.summerHrs += course.hours;
            }
        }
    }
}
