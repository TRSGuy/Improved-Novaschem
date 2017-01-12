Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}


function get_schedule(width, height, week, school_id, person_id) {
  var image_var = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=' + school_id + '/sv-se&type=-1&id=' + person_id + '&period=&week=' + week + '&mode=0&printer=0&colors=32&head=1&clock=1&foot=1&day=0&width=' + width + '&height=' + height + '&maxwidth=' + width + '&maxheight=' + height;
  return image_var;
}

function render_schedule(url){
  document.getElementById("schedule").src=url;
}

function get_values(form) {
  var width = 1920;
  var height = 1080;
  var week = (new Date()).getWeek();
  var school_id = form.select.value;
  var person_id = form.person_id.value;
  console.log('Width: ' + width);
  console.log('Height: ' + height);
  console.log('Week: ' + week);
  console.log('School ID: ' + school_id);
  console.log('Person ID: ' + person_id);
  var schedule_url = get_schedule(width, height, week, school_id, person_id);
  console.log('Schedule URL: ' + schedule_url);
  render_schedule(schedule_url);
}
document.getElementById("person_id")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("button").click();
    }
});
