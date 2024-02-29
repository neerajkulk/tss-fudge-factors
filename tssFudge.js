document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("workoutForm");
  var resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    var hrTss = parseFloat(form.elements["hrtss"].value);
    var vertical = parseFloat(form.elements["vertical"].value);
    var weight = parseFloat(form.elements["weight"].value);
    var location = form.elements["location"].value;

    var result = calculateTssFudgeFactors(hrTss, vertical, weight, location);

    // Display the result
    resultDiv.textContent = "Adjusted:  " + result + " TSS";
    resultDiv.hidden = false;
  });
});

function calculateTssFudgeFactors(hrTss, vertical, weight, location) {
  const verticalTss = (vertical / 1000) * 10; // 10 TSS for every 1000 ft
  const weightTss = (vertical / 1000) * weight; // 1 TSS for each % of body weight carried up 1000 ft
  var additionalTss = verticalTss + weightTss;
  if (location == "indoor") {
    additionalTss /= 2.0;
  }
  return Math.round(hrTss + additionalTss);
}
