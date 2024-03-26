var tablinks = document.getElementById("tab-links");
var tabcontents = document.getElementById("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tablink of tabcontents) {
        tabcontents.classList.remove("active-tab");
    }
}
