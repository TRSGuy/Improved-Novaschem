var now = new Date();
var day_array = [1, 2, 4, 8, 16]
var page_loaded = false;
window.onload = function () {
    page_loaded = true;
}
function time() {
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };
    var weekNumber = (new Date()).getWeek();
    var day_number = now.getDay() - 1;
    var array_day = day_array[day_number];
    return [weekNumber, array_day];
}

function main() {
    //This will be the main function that is going to be used for getting all the values and calling differnet functions. Will be trying to make as many small functions as possible so that I easily can reuse them
    var today_only = get_value('checkbox', 'current_day_only');
    var student_id = get_value('text', 'person_id');
    var width = get_value('width', 'col_1');
    var height = get_value('height', 'col_1');
    var time_array = time();
    var day = time_array[1];
    var week = time_array[0];
    var school_id = get_value('select', 'school_id');
    document.cookie = "studentid=" + student_id +"; expires=Thu, 18 Dec 2018 12:00:00 UTC";
    console.log('Student ID = ' + student_id);
    console.log('Current Day Only = ' + today_only);
    console.log('Width = ' + width);
    console.log('Height = ' + height);
    console.log("Day: " + day);
    console.log("Week: " + week);
    grab_sched_links(today_only, school_id, student_id, week, day, height, width);
}

function grab_sched_links(today_only, school_id, student_id, week, day, height, width) {
    if (today_only) {
        var link = schedule_api(school_id, student_id, week, day, height, width);
        append_schedule(link, 'col_1')
    }
    else {
        var link_array = [''];
        day_array.forEach(function(e){
            var link = schedule_api(school_id, student_id, week, e, height, width);
            link_array.push(link);
        });
        console.log(link_array);
        for(var i = 1; i < 6; i++) {
            append_schedule(link_array[i], 'col_' + i);
        }

    }
}

function append_schedule(link, tag_id) {
    document.getElementById(tag_id).src = link;
}
function get_value(type, element_id) {
    if(type === 'checkbox') {
        return document.getElementById(element_id).checked;
    }
    else if(type === 'text' || type === 'checkbox' || type === 'select') {
        return document.getElementById(element_id).value;    
    }
    else if(type === 'width') {
        return document.getElementById(element_id).offsetWidth;
    }
    else if(type === 'height') {
        return document.getElementById(element_id).offsetHeight;
    }
}

function schedule_api(school_id ,user_id, week, day, height, width) {
    var schedule_link = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=' + school_id + '/sv-se&type=-1&id=' + user_id + '&period=&week=' + week + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=' + day + '&width=' + width + '&height=' + height + '&maxwidth=' + width + '&maxheight=' + height;
    return schedule_link;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}
window.onload = function() {
    if (getCookie('studentid') !== false) {
        console.log('It is not false');
        var tmptmp = document.getElementById('person_id').value = getCookie('studentid');
        main();
    }
}
