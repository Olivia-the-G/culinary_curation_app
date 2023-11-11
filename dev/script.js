var ingredientPage = document.querySelector(".ingredientPage");
var recipePage = document.querySelector(".recipePage");
var startPage = document.querySelector(".startPage");
var startBtn = document.querySelector("#startBtn");
var ingredientBtn = document.querySelector("#ingredientBtn");
var regenerateBtn = document.querySelector("#regenerateBtn");
var restartBtn = document.querySelector("#restartBtn");

// Function to hide the selected HTML element and its nest HTML elements by adding a "inactive" CSS class
function hide(element) {
  element.classList.add("inactive");
}

// Function to show the selected HTML element and its nested HTML elements by removing the "inactive" CSS class
function show(element) {
  element.classList.remove("inactive");
}

window.addEventListener("load", function () {
  hide(ingredientPage);
  hide(recipePage);
});

startBtn.addEventListener("click", function () {
  hide(startPage);
  show(ingredientPage);
});

ingredientBtn.addEventListener("click", function () {
  hide(ingredientPage);
  show(recipePage);
});

restartBtn.addEventListener("click", function () {
  hide(ingredientPage);
  hide(recipePage);
  show(startPage);
  document.getElementById("startPageTitle").innerText = "Miss me already? Let's see what else is in your fridge!";
});

$("#ingredientBtn").on("click", function () {
  var ingredientItem1 = $("#ingri1").val();
  var ingredientItem2 = $("#ingri2").val();
  var ingredientItem3 = $("#ingri3").val();
  var recipeApi = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientItem1},${ingredientItem2},${ingredientItem3}&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`;
  $.ajax({
    url: recipeApi,
    success: function (result) {
      console.log(result);
    },
  });
});
