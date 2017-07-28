function getTime() { // docs:getTime
	Date.prototype.getWeek = function () { var oneJan = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);}
	return [new Date().getWeek(), new Date().getDay() - 1, [1, 2, 4, 8, 16][$("#day").val()]];
}
var ta;
function initialize() {
	ta = getTime();
	$("#week").val(ta[0]);
	$("#day").val(ta[1]);
	ta = getTime();
}
function genSchedLink(ao) { // docs:genSchedLink
	ao["wi"] = Math.round(ao["sc"].width());
	ao["he"] = Math.round(ao["sc"].height());
	ta = getTime();
	var link = [
		"http://www.novasoftware.se/ImgGen/schedulegenerator.aspx", "?format=png",
		"&schoolid=" + ao["sid"], "/sv-se", "&type=-1",
		"&id=" + ao["uid"], "&period=",
		"&week=" + $("#week").val(),
		"&printer=0", "&mode=0", "&colors=32", "&head=1", "&clock=1", "&foot=1",
		"&day=" + ta[2],
		"&width=" + ao["wi"],
		"&height=" + ao["he"],
		"&maxwidth=" + ao["wi"],
		"&maxheight=" + ao["he"],
	].join("");
	return link;
}
function help(hostile) {
	var help = $("#help");
	console.log("Help was called");
	if(hostile) {
		help.removeClass("highlightRed");
		help.removeClass("highlightGreen");
		help.addClass("highlightRed");
	} else {
		help.removeClass("highlightRed");
		help.removeClass("highlightGreen");
		help.addClass("highlightGreen");
	}
}
function toggleMenu() {$("#form-container").animate({width: "toggle"}, 200);}
function grabCookie(cname) {
	var cookies = document.cookie.replace(/\s+/g, "").split(";");
	for(var i = 0; i < cookies.length; i++) {
		if(cname === cookies[i].split("=")[0]) {
			return cookies[i].split("=")[1];
		}
	}
	return false;
}
function main(shouldToggle) {
	if(shouldToggle) {toggleMenu();}
	var uid = $("#uid").val();
	if(uid.length < 3) {
		help(true);
		if(shouldToggle) {
			toggleMenu();
		}
	} else {
		$("#help").removeClass("highlightRed").removeClass("highlightGreen");
		document.cookie = "json={\"uid\": \"" + uid + "\"};expires=Thu, 18 Dec 2020 12:00:00 UTC";
		$("#schedule").attr("src", genSchedLink({"uid": uid, "sid": "58700", "sc": $("#schedule")}));
	}
}
window.onload = function() {
	initialize();
	if(grabCookie("json")) {
		$("#uid").val(JSON.parse(grabCookie("json"))["uid"]);
		main(true);
	} else {
		help(false);
window.onresize = function () { main(); }
	}
}
