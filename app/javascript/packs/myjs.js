var currPlan = false;
var plan = false;
var selectedMajor = "Comp. Sci.";
var selectedCatalogYear = 2017;
var catalogLoaded = false;

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
        $("#hrsPlanned").html("Total Hours Planned: " + currPlan.hrsPlanned);

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
		}
		
        
        var requirements = plan.requirements;

        $('#accordion').empty();
        for (let i in requirements){
            let courses = requirements[i].courses;
            let itemHtml = "";
            for (let c in courses){
                itemHtml += '<li>' + courses[c] + ': ' + plan.catalog.courses[courses[c]].name + '</li>';
            }
            $('#accordion').append('<h3><a href="#">' + requirements[i].name + '</a></h3><div>' + itemHtml + '</div>').accordion('refresh');
        }
	});
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
        this.hrsPlanned = 0;
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
                urHTML += " notStarted";
            }
            urHTML += "'>";
            urHTML += "<header><span class='termHeader'>Fall " + (year.name - 1) + "</span><span class='termHours'>Hours: " + year.fallHrs + "</span></header>";
            urHTML += "<ul class='courses'>";
            for (let j = 0; j < year.fall.length; j++){
                let course = year.fall[j];
                this.hrsPlanned += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li>" + course.id + " " + course.name + "</li>";
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
                urHTML += " notStarted";
            }
            urHTML += "'>";
            urHTML += "<header><span class='termHeader'>Spring " + year.name + "</span><span class='termHours'>Hours: " + year.springHrs + "</span></header>";
            urHTML += "<ul class='courses'>";
            for (let j = 0; j < year.spring.length; j++){
                let course = year.spring[j];
                this.hrsPlanned += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li>" + course.id + " " + course.name + "</li>";
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
                urHTML += " notStarted";
            }
            urHTML += "'>";
            urHTML += "<header><span class='termHeader'>Summer " + year.name + "</span><span class='termHours'>Hours: " + year.summerHrs + "</span></header><ul class='courses'>";
            for (let j = 0; j < year.summer.length; j++){
                let course = year.summer[j];
                this.hrsPlanned += course.hours;
                if (beforeCurrent){
                    this.hrsCompleted += course.hours;
                }
                urHTML += "<li>" + course.id + " " + course.name + "</li>";
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
