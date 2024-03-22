const FT_IN_MILE = 5280.0;

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("workoutForm");
  var resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    var hrTss = parseFloat(form.elements["hrtss"].value);
    var vertical = parseFloat(form.elements["vertical"].value);
    var distance = parseFloat(form.elements["distance"].value);
    var grade = parseFloat(form.elements["grade"].value);
    var weight = parseFloat(form.elements["weight"].value);
    var location = form.elements["location"].value;

    var result = calculateTssFudgeFactors(
      hrTss,
      calculateVertical(vertical, distance, grade),
      weight,
      location
    );

    // Display the result
    if (isNum(result)) {
      resultDiv.textContent = "Adjusted:  " + result + " TSS";
      resultDiv.hidden = false;
    }
  });
});

function distanceAndGradePresent(distance, grade) {
  return isNum(distance) && isNum(grade);
}

function calculateVertical(vertical, distance, grade) {
  if (isNum(vertical)) {
    return vertical;
  }

  if (distanceAndGradePresent(distance, grade)) {
    return distance * (grade / 100.0) * FT_IN_MILE;
  }

  alert(
    ```Please provide the vertical in ft OR the distance and grade.
    If you provide the vertical, the distance and grade will be ignored for the calculation.```
  );
}

function calculateTssFudgeFactors(hrTss, vertical, weight, location) {
  const verticalTss = (vertical / 1000) * 10; // 10 TSS for every 1000 ft
  const weightTss = (vertical / 1000) * weight; // 1 TSS for each % of body weight carried up 1000 ft
  var additionalTss = verticalTss + weightTss;
  if (location == "indoor") {
    additionalTss /= 2.0;
  }
  return Math.round(hrTss + additionalTss);
}

function isNum(num) {
  return !isNaN(num);
}
