// Based off the sample code at https://api.nasa.gov/

var baseUrl = "https://api.nasa.gov/planetary/apod";
var apiKey = "8xnT3OmbSM2w40kc8cQQ3u2toOufqJe1vExGpC8H";
var dateIndex = moment();

var fetch = function(momentObject) {
  var dateString = dateIndex.format("YYYY-MM-DD");
  var finalUrl = baseUrl + "?api_key=" + apiKey + "&date=" + dateString;

  $.ajax({
    url: finalUrl,
    success: function(result) {
      if("copyright" in result) {
        $("#copyright").text("Image Credits: " + result.copyright);
      }
      else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      }
      
      if(result.media_type == "video") {
        $("#apod_vid_id").css("display", "block");
        $("#apod_img_id").css("display", "none");
        $("#apod_vid_id").attr("src", result.url);
      }
      else {
        $("#apod_img_id").css("display", "block");
        $("#apod_vid_id").css("display", "none");
        $("#apod_img_id").attr("src", result.url);
      }
      $("#reqObject").text(finalUrl);
      $("#returnObject").text(JSON.stringify(result, null, 4));  
      $("#apod_explaination").text(result.explanation);
      $("#apod_title").text(result.title);
    }, error: function() {
      //
    }
  });
}

var loadToday = function() {
  dateIndex = moment();
  fetch(dateIndex);
}

var minusOneDay = function() {
  var newDate = dateIndex.subtract(1, 'days');
  fetch(newDate);
}

var plusOneDay = function() {
  if (dateIndex.isSameOrAfter(moment().startOf('day'))) {
    return;
  }
  var newDate = dateIndex.add(1, 'days');
  fetch(newDate);
}

loadToday();
