function getTime() { // docs:getTime
	Date.prototype.getWeek = function () { var oneJan = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7); };
	return [new Date().getWeek(), new Date().getDay() - 1, [1, 2, 4, 8, 16][$("#day").val()]];
};
function main() { // docs:main
	var uid = $("#person-id").val();
	if(uid.length < 3) firstVisit();
	else {
		$("#first-visit").slideUp();
		var sc = $("#schedule-container");
		var loader = $("#loading-animation");
		sc.on('load',function(){loader.hide(500);});
		var wi = Math.round(sc.width()); // The reason we round this is described in issues #16
		var he = Math.round(sc.height()); // The reason we round this is described in issue #16
		var ta = getTime();
		var sid = "58700";
		var link = genSchedLink(sid, uid, $("#week").val(), ta[2], he, wi);
		sc.attr("src", link);
		document.cookie = "json={\"uid\": \"" + uid + "\"};expires=Thu, 18 Dec 2020 12:00:00 UTC";
	}
};
function firstVisit() { // docs:firstVisit
	var siteGuideMessage = [
		"<span class=\"header\">Getting started</span>",
		"<ol><li>Enter your four character class ID in the text field up at the top, where it says Class ID</li><li>Hit the submit button!</li><li>The schedule will load!</li></ol>",
		"I'm sorry for any outages that may occur, our domain provider (DOT.TK) is having some issues with their redirects and Novasoftware is being generally shit at keeping their service up and running.",
		"If you would like to see another week, please use the week input in the top right<br/>",
		"Please report any bugs or give feedback at our <a href=\"https://github.com/TRSGuy/Improved-Novaschem/issues\">GitHub</a>.",
		"Thanks and enjoy your stay.</p>"
	].join("<br/>");
	$("#first-visit").text("");
	$("#first-visit").append(siteGuideMessage);
	$("#first-visit").slideDown();
};
function genSchedLink(sid, uid, we, da, he, wi) { // docs:genSchedLink
	var link = [
		"http://www.novasoftware.se/ImgGen/schedulegenerator.aspx",
		"?format=png",
		"&schoolid=" + sid,
		"/sv-se",
		"&type=-1",
		"&id=" + uid,
		"&period=",
		"&week=" + we,
		"&printer=0",
		"&mode=0",
		"&colors=32",
		"&head=1",
		"&clock=1",
		"&foot=1",
		"&day=" + da,
		"&width=" + wi,
		"&height=" + he,
		"&maxwidth=" + wi,
		"&maxheight=" + he
	].join("");
	return link
};
function grabCookie(cname) { // docs:grabCookie
var cookies = document.cookie.replace(/\s+/g, "").split(";");
	for(i = 0; i < cookies.length; i++) {
		console.log(cookies[i].split("="));
		if(cname == cookies[i].split("=")[0]) {
			return cookies[i].split("=")[1];
		}
	}
	return false;
};
window.onload = function() { // docs:onload
	$("#day").val(getTime()[1]);
	$("#week").val(getTime()[0]);
	if(!grabCookie("json")) {
		firstVisit();
	} else {
		$("#person-id").val(JSON.parse(grabCookie("json"))["uid"]);
		main();
	};
};
window.onresize = function() { window.onload(); };
