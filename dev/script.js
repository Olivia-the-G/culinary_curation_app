var ingredientPage = document.querySelector(".ingredientPage");
var recipePage = document.querySelector(".recipePage");
var startPage = document.querySelector(".startPage");
var startBtn = document.querySelector("#startBtn");
var ingredientBtn = document.querySelector("#ingredientBtn");
var regenerateBtn = document.querySelector("#regenerateBtn");
var restartBtn = document.querySelector("#restartBtn");
// global variables for the regenerateBtn
var result = [];
var currentRecipeIndex = 0;

// Function to hide the selected HTML element and its nested HTML elements by adding an "inactive" CSS class
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

restartBtn.addEventListener("click", function () {
    // tried to reset the results array but it doesn't seem to work
  result = [];
  hide(ingredientPage);
  hide(recipePage);
  show(startPage);
  document.getElementById("startPageTitle").innerText =
    "Miss me already? Let's see what else is in your fridge!";
  document.getElementById("ingri1").value = "";
  document.getElementById("ingri2").value = "";
  document.getElementById("ingri3").value = "";
  $("#errorHandler")[0].innerText = "";
});

$("#ingredientBtn").on("click", function () {
  var ingredientItem1 = $("#ingri1").val();
  var ingredientItem2 = $("#ingri2").val();
  var ingredientItem3 = $("#ingri3").val();
  let ingredientItem1LC = ingredientItem1.toLowerCase();
  let ingredientItem2LC = ingredientItem2.toLowerCase();
  let ingredientItem3LC = ingredientItem3.toLowerCase();
  var recipeApi = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientItem1LC},${ingredientItem2LC},${ingredientItem3LC}&apiKey=f2ff7323d7874b7aa2f8de38094d02e7`;
  // tried to reset the results array but it doesn't seem to work
  result = [];
  $.ajax({
    url: recipeApi,
    dataType: "json",
    success: function (response) {
      result = response;
      if (result == false) {
        console.log($("#errorHandler"));
        $("#errorHandler")[0].innerText =
          "Please enter at least 1 VALID ingredient";
        return;
      } else {
        hide(ingredientPage);
        show(recipePage);
        $("#recipeImage").attr("src", result[0].image);
        console.log(result);
        displayNextRecipe();
      }
    },
  });
// currently only works for the first set of ingredients, does not work for if i restart the whole process
function displayNextRecipe() {
  if (currentRecipeIndex < result.length) {
    $("#recipeImage").attr("src", result[currentRecipeIndex].image);
    currentRecipeIndex++;
  } else {
    console.log($("#recipeErrorHandler"));
    $("#recipeErrorHandler")[0].innerText = "No more recipes available.";
  }
}

$("#regenerateBtn").on("click", function () {
  displayNextRecipe();
});
});

