function getTime() { // docs:getTime
	Date.prototype.getWeek = function () { var oneJan = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7); };
	return [new Date().getWeek(), new Date().getDay() - 1, [1, 2, 4, 8, 16][$("#day").val()]];
}
function firstVisit() { // docs:firstVisit
	var siteGuideMessage = [
		"<p class=\"header\">Getting started</p>",
		"<ol><li>Enter your four character Class ID</li><li>Hit the submit button!</li><li>Profit!</li></ol>",
		"<p>I'm sorry for any outages that may occur. <br/><br/>Our domain provider (DOT.TK) is having some issues and Novasoftware is being generally shit.<br/>",
		"If you would like to see another week, please use the week input in the top right<br/>",
		"Please report any bugs or give feedback at our <a href=\"https://github.com/TRSGuy/Improved-Novaschem/issues\">GitHub</a>.",
		"Thanks and enjoy your stay.</p>"
	].join("<br/>");
	$("#first-visit").text("");
	$("#first-visit").append(siteGuideMessage);
	$("#first-visit").slideDown();
};
function genSchedLink(ao) { // docs:genSchedLink
	ao["wi"] = Math.round(ao["sc"].width());
	ao["he"] = Math.round(ao["sc"].height());
	var link = [
		"http://www.novasoftware.se/ImgGen/schedulegenerator.aspx", "?format=png",
		"&schoolid=" + ao["sid"], "/sv-se", "&type=-1",
		"&id=" + ao["uid"], "&period=",
		"&week=" + $("#week").val(),
		"&printer=0", "&mode=0", "&colors=32", "&head=1", "&clock=1", "&foot=1",
		"&day=" + getTime()[2],
		"&width=" + ao["wi"],
		"&height=" + ao["he"],
		"&maxwidth=" + ao["wi"],
		"&maxheight=" + ao["he"],
	].join("");
	return link;
};
function grabCookie(cname) { // docs:grabCookie
var cookies = document.cookie.replace(/\s+/g, "").split(";");
	for(var i = 0; i < cookies.length; i++) {
		if(cname === cookies[i].split("=")[0]) {
			return cookies[i].split("=")[1];
		}
	}
	return false;
};
function update() { // docs:update	
	if($("#person-id").val().length < 3) { firstVisit(); }
	else {
		$("#first-visit").slideUp();
		main();
	}
};
function main() { // docs:main
		"uid": $("#person-id").val(),
		"sc": $("#schedule-container"),
		"lo": $("#loading-animation"),
		"sid": "58700"
	};
	ao["sc"].on("load", function(){ao["lo"].hide(500);});
	ao["sc"].attr("src", genSchedLink(ao));
	document.cookie = "json={\"uid\": \"" + ao["uid"] + "\"};expires=Thu, 18 Dec 2020 12:00:00 UTC";
};
window.onload = function() { // docs:onload
	$("#day").val(getTime()[1]);
	$("#week").val(getTime()[0]);
	if(!grabCookie("json")) {
		firstVisit();
	} else {
		$("#person-id").val(JSON.parse(grabCookie("json"))["uid"]);
		update();
	};
};
window.onresize = function() { update(); };
