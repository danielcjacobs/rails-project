var currPlan = null;
var plan = null;
var selectedMajor = "Comp. Sci.";
var selectedCatalogYear = 2017;
var catalogLoaded = false;
var planTableLoaded = false;
var draggedCourse = null;
var draggedReqOrigin = null;
var draggedPlanOrigin = null;
var draggedCatOrigin = null;

// changes plan, triggered on selection of new plan in dropdown
$(document).on('change', '#planSelect', function (){
    var selected = $(this).find("option:selected").text();
	console.log(selected);
    selected = selected.split(", ");
    console.log(selected);
    selectedMajor = selected[0];
    selectedCatalogYear = parseInt(selected[1]);
   
    // send request to load new plan
    getPlan();

});

// For loading the table of plans
window.getAllPlans = function(){
	$.get("/plans.json", function(plans){
		//console.log(plans);
		let buttons = [];
		let colObjects = [];
		for (let p in plans){
			let openHtml = "<a href='/plans/" + plans[p].id + "'>Open</a>";
			colObjects.push({"plan": plans[p], "open": openHtml });
		}
		if (!planTableLoaded){
			$("#plansTable").DataTable( {
				"dom": '<"top"if>t',
				"data": colObjects,
				"columns": [
						{ "data": "plan.user.login" },
						{ "data": "plan.plan_name" },
						{ "data": "plan.major" },
						{ "data": "plan.catalog.year"},
						{ "data": "open" }
				],
				"paging": false,
			});
			$('.dataTables_scrollHeadInner').css('padding', '0');
			planTableLoaded = true;
		}
	});
}

// For loading a single plan
window.getPlan = function(){
	$.get("/plans.json", function(plans){
        plan = null;
        $(".dropdown").html("<option selected disabled>Change Plan</option>");
		// set current plan
        for (let i in plans){
            if (plans[i].major === selectedMajor && plans[i].catalog.year === selectedCatalogYear){
                plan = plans[i];
            }
            else{
                // Put other plan options in dropdown menu on nav bar
                $(".dropdown").append("<option>" + plans[i].major + ", " + plans[i].catalog.year + "</option>");
            }
        }
        if (plan == null){
            console.log("Error: did not find selected plan");
        }
		
		// dynamically generate years, terms, semesters on page
		currPlan = new Plan(plan.user.login, plan.plan_name, plan.major, plan.curr_year, plan.curr_term, plan.courses, plan.catalog.year);
        currPlan.sortCourses();
        currPlan.generateHTML();
        $("#major").html(plan.major);
        $("#catYear").html(plan.catalog.year);

        $("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
        $("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
		$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
        $("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
        checkMissingReqs();

		// load catalog table
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
		
        
		// load accordion with requirements
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
        $("#requirements").html("Requirements Met!");
    } else {
        $("#requirements").html("Requirements missing: " + reqsMissing);
    }
}

window.addYears = function() {
    if (currPlan.years.length >= 12) {
        alert("You can only have a maximum of 12 years in a plan!");
        return;
    }

    let numYears = parseInt($("#numYears").val());

    if (numYears > 12 || currPlan.years.length + numYears >= 12) {
        alert("This will put you over the maximum of 12 years per plan! Try again.");
        return;
    }

    let lastTermHeaderInPlan = $(".termHeader").get(-1);
    let lastYearInPlan = 0;
    if (lastTermHeaderInPlan == "undefined") {
        lastYearInPlan = currPlan.currYear - 1;
    } else {
        let termAndYear = lastTermHeaderInPlan.textContent.split(" ");
        lastYearInPlan = parseInt(termAndYear[1]);
    }
    
    for (let i = 1; i < numYears + 1; i++) {
        currPlan.years.push(new Year(lastYearInPlan + i));
    }

    currPlan.generateHTML();
    return;
}

window.deleteYear = function() {
    let yearToDelete = parseInt($("#yearToDelete").val());
    let isValidYear = validateYear(yearToDelete);
    if (!isValidYear) {
        alert("That's not valid year! Try again.");
        return;
    }

    deleteCoursesAndYear(yearToDelete);

    $("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
    $("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
	$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
    $("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
    checkMissingReqs();
    currPlan.generateHTML();
    
}

function validateYear(year) {
    let isValid = false;
    for (let i = 0; i < currPlan.years.length; i++) {
        if (year == parseInt(currPlan.years[i].name)) {
            isValid = true;
            break;
        }
    }
    return isValid;
}

function deleteCoursesAndYear(year) {
    let planYear = null;
    for (let i = 0; i < currPlan.years.length; i++) {
        if (year == parseInt(currPlan.years[i].name)) {
            planYear = currPlan.years[i];
            break;
        }
    }
    let fallCourses = planYear.fall;
    let springCourses = planYear.spring;
    let summerCourses = planYear.summer;

    let coursesToRemove = fallCourses.concat(springCourses).concat(summerCourses);

    let hoursRemoved = 0;
    let hoursCompletedRemoved = 0;
    let hoursRemainingRemoved = 0;
    let currentHoursRemoved = 0;

    let currYear = currPlan.currYear;
    let currTerm = currPlan.currTerm;

    for (x in coursesToRemove) {
        let course = coursesToRemove[x];
        hoursRemoved += course.hours;
        if (currYear > course.year) {
            hoursCompletedRemoved += course.hours;
        } else if (currYear < course.year) {
            hoursRemainingRemoved += course.hours;
        } else if (currTerm == "Fall") {
            if (course.term == "Fall") {
                currentHoursRemoved += course.hours;
            } else {
                hoursRemainingRemoved += course.hours;
            }
        } else if (currTerm == "Spring") {
            if (course.term == "Fall") {
                hoursCompletedRemoved += course.hours;
            } else if (course.term == "Spring") {
                currentHoursRemoved += course.hours;
            } else {
                hoursRemainingRemoved += course.hours;
            }
        } else if (currTerm == "Summer") {
            if (course.term == "Summer") {
                currentHoursRemoved += course.hours;
            } else {
                hoursCompletedRemoved += course.hours;
            }
        }
    }

    currPlan.hrsCompleted -= hoursCompletedRemoved;
    currPlan.hrsCurrent -= currentHoursRemoved;
    currPlan.hrsFuture -= hoursRemainingRemoved;
    currPlan.hrsTotal -= hoursRemoved;


    for (j in currPlan.courses) {
        for (k in coursesToRemove) {
            if (currPlan.courses[j].designator == coursesToRemove[k].id) {
                delete currPlan.courses[j];
                break;
            }
        }
    }

    for (l in currPlan.years) {
        if (parseInt(currPlan.years[l].name) == year) {
            currPlan.years.splice(l, 1);
        }
    }

    for (designator in coursesToRemove) {
        $.get("/plan_courses", {
			designator: coursesToRemove[designator].id,
			user: plan.user.id,
			plan: plan.plan_name
		});
    }

}

function courseInPlan(designator){
	let c = currPlan.courses[designator];
	return c !== undefined;
}

// check if course is already in the semester being dropped on
function courseInSemester(designator, droppedTerm){
	for (let i=0; i < droppedTerm.children.length; i++){
		if (droppedTerm.children[i].innerText.includes(designator)){
			return true;
		}
	}
	return false;
}

// set source course when dragging from requiremetns accordion
window.dragFromReq = function(event){
	let desig = event.target.innerText.split(": ")[0];
	draggedCourse = plan.catalog.courses[desig];
	draggedPlanOrigin = null;
	draggedCatOrigin = null;
	draggedReqOrigin = event.target;
}

// set source course when dragging from catalog table
window.dragFromCat = function(event){
	let desig = event.target.children[0].innerText
	draggedCourse = plan.catalog.courses[desig];
	draggedPlanOrigin = null;
	draggedReqOrigin = null;
	draggedCatOrigin = event.target;
}

// set source course when dragging from plan
window.dragFromPlan = function(event){
	let desig = event.target.innerText.split(": ")[0];
	draggedCourse = plan.catalog.courses[desig];
	draggedReqOrigin = null;
    draggedPlanOrigin = event.target;
	draggedCatOrigin = null;
    draggedPlanOrigin = event.target;
}

// indicate valid drop when hovering over plan
window.hoverOverPlan = function(event){
	event.preventDefault();
}

// update db when dropping course on plan
window.dropOnPlan = function(event){
	event.preventDefault();
	if (!(courseInSemester(draggedCourse.designator, event.target.children[1]) || (courseInPlan(draggedCourse.designator) && draggedCatOrigin != null))) {
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
			removeFromRequirements(draggedCourse.designator);
		}
		// add to javascript plan object
		let destTerm = event.target.children[0].children[0].innerText.split(" ")[0];
        let destYear = parseInt(event.target.children[0].children[0].innerText.split(" ")[1]);
        // if (destTerm == "Fall") {
        //     destYear++;
        // }
		let newCourse = {
			"designator": draggedCourse.designator,
			"term": destTerm,
			"year": destYear
        };
        currPlan.courses[draggedCourse.designator] = newCourse;
        // add full course to years array in plan
        let newYearCourse = new Course(draggedCourse.designator, destYear, destTerm);
        let year = null;
        for (let i = 0; i < currPlan.years.length; i++) {
            if (destYear == currPlan.years[i].name) {
                year = currPlan.years[i];
                break;
            }
        }
        if (destTerm == "Fall") {
            year.fall.push(newYearCourse);
            year.fallHrs += newYearCourse.hours;
        } else if (destTerm == "Spring") {
            year.spring.push(newYearCourse);
            year.springHrs += newYearCourse.hours;
        } else {
            year.summer.push(newYearCourse);
            year.summerHrs += newYearCourse.hours;
        }
		//update db
		$.post("/plan_courses", {
			plan: plan.plan_name, 
			user: plan.user.id, 
			designator: draggedCourse.designator, 
			term: destTerm,
			year: destYear
		});
		$("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
		$("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
		$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
		$("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
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
		delete currPlan.courses[draggedCourse.designator];
        draggedPlanOrigin = null;
        
        for (i in currPlan.courses) {
            if (currPlan.courses[i].designator == draggedCourse.designator) {
                delete currPlan.courses[i];
                break;
            }
        }
    
        let year = null;
        for (let i = 0; i < currPlan.years.length; i++) {
            if (this.draggedCourse.year == currPlan.years[i].name) {
                year = currPlan.years[i];
                break;
            }
        }
        if (this.draggedCourse.term == "Fall") {
            for (let i = 0; i < year.fall[i]; i++) {
                if (year.fall[i].id == draggedCourse.designator) {
                    year.fall.splice(i, 1);
                }
            }
            year.fallHrs -= draggedCourse.hours;
        } else if (destTerm == "Spring") {
            for (let i = 0; i < year.spring[i]; i++) {
                if (year.spring[i].id == draggedCourse.designator) {
                    year.spring.splice(i, 1);
                }
            }
            year.springHrs -= draggedCourse.hours;
        } else {
            for (let i = 0; i < year.summer[i]; i++) {
                if (year.summer[i].id == draggedCourse.designator) {
                    year.summer.splice(i, 1);
                }
            }
            year.summerHrs += draggedCourse.hours;
        }
		
		$.get("/plan_courses", {
			designator: draggedCourse.designator,
			user: plan.user.id,
			plan: plan.plan_name
		});
		$("#hrsCompleted").html("Hours Completed: " + currPlan.hrsCompleted);
		$("#hrsCurrent").html("Current Hours: " + currPlan.hrsCurrent);
		$("#hrsFuture").html("Remaining Hours: " + currPlan.hrsFuture);
		$("#hrsTotal").html("Total Hours Planned: " + currPlan.hrsTotal);
		
        addToRequirements(draggedCourse.designator);
        checkMissingReqs();
	}
	draggedCourse = null;
}

// Unhide requirement if removed from plan
window.addToRequirements = function(designator){
	let acc = $('#accordion').get()[0];
	for (let i=1; i<acc.children.length; i+=2){
		let accChild = acc.children[i];
		for (let j = 0; j<accChild.children.length; j++){
			let req = accChild.children[j];
			if (req.innerText.includes(designator)){
				req.removeAttribute('hidden');
				return;
			}
		}
	}
}

// Hide requirement if added from catalog table
window.removeFromRequirements = function(designator){
	let acc = $('#accordion').get()[0];
	for (let i=1; i<acc.children.length; i+=2){
		let accChild = acc.children[i];
		for (let j = 0; j<accChild.children.length; j++){
			let req = accChild.children[j];
			if (req.innerText.includes(designator)){
				req.setAttribute('hidden', true);
				return;
			}
		}
	}
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

var yearControlHtml = "<div id='yearControlContainer'>" +
                    "<div class='inlineForm'>" +
                    "<input type='submit' id='addYear' value='Add Year(s)' onclick='addYears()'>" +
                    "<label for='numYears' id='numYearsLabel'>Number of years to add:  </label>" +
                    "<input type='text' id='numYears' name='numYears' value='1'>" +
                    "</div>" +
                    "<div class='inlineForm'>" +
                    "<input type='submit' id='deleteYear' onclick='return deleteYear();' value='Delete Year'>" +
                    "<label for='numYears' id='yearToDeleteLabel'>Year to delete:  </label>" +
                    "<input type='text' id='yearToDelete' name='yearToDelete'>" +
                    "</div></div>";

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
        currPlan.hrsCompleted = 0;
        currPlan.hrsCurrent = 0;
        currPlan.hrsFuture = 0;
        currPlan.hrsTotal = 0;
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
        urHTML += yearControlHtml;
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