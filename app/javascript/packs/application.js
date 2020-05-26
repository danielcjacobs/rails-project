// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require ('packs/myjs')
require ('jquery')
require ('jquery-ui')
require ('datatables.net')
require ('datatables.net-bs4')


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
const images = require.context('../../assets/images', true)
const imagePath = (name) => images(name, true)

$(document).ready(function() {
    $("#addYear").on("click", function() { 
        alert("Got into add year function");
        if (currPlan.years.length >= 12) {
            alert("You can only have a maximum of 12 years in a plan!");
            return;
        }

        // let queryString = window.location.search;
        // let urlParams = new URLSearchParams(queryString);
        // let numYears = urlParams.get("numYears");

        let numYears = document.getElementById("numYears");

        if (numYears > 12 || currPlan.years.length + numYears >= 12) {
            alert("This will put you over the maximum of 12 years per plan! Try again.");
            return;
        }

        let lastTermHeaderInPlan = $(".termHeader").get(-1).split(" ");
        let lastYearInPlan = int (lastTermHeaderInPlan[1]);
        
        for (let i = 0; i < numYears; i++) {
            currPlan.years.push(new Year(lastYearInPlan + i));
        }

        currPlan.generateHTML();
        return;
    });
});
