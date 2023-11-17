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
  currentRecipeIndex = 0;
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
  var recipeApi = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientItem1LC},${ingredientItem2LC},${ingredientItem3LC}&apiKey=7a5414c1ec984a2bb38149115cb49f5f`;
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
        $("#recipeImage").attr("alt", `Recipe image for ${result[0].title}`);
        $("#recipeName").text(result[0].title);
        $("#nutritionLabel").attr(
          "src",
          `https://api.spoonacular.com/recipes/${result[0].id}/nutritionLabel.png?apiKey=7a5414c1ec984a2bb38149115cb49f5f`
        );
        $("#nutritionLabel").attr(
          "alt",
          `Nutrition label for ${result[0].title} recipe`
        );
        $("#recipeBtnLink").attr(
          "href",
          `https://spoonacular.com/${result[0].title}`
        );
        // Get Youtube video titles & video ids using YouTube api based on the recipe title returned by the Spoonacular api. Still require work to replace the video titles and ids when getting a different recipe.
        //Getting cooking videos based on the recipe title returned by the Spoonacular api and embed/display on the page
        fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${result[0].title}-receipe&key=AIzaSyCPQrlqDUzWQXG8L_DzMhfZ64M-WBvCY2Q`
        )
          .then(function (result) {
            return result.json();
          })
          .then(function (data) {
            console.log(data);
            var videoList = data.items;
            for (var i = 0; i < 4; i++) {
              var embeddedVideo = `<iframe id="video-player" type="text/html" width="60" height="30" src="https://www.youtube.com/embed/${videoList[i].id.videoId}" frameborder="0"></iframe>`;
              $(".videos").append(
                `<div class="recipe-video">${videoList[i].snippet.title} ${embeddedVideo}</div>`
              );

              console.log(videoList[i].snippet.title, videoList[i].id.videoId);
            }
          });
        // console.log(result);
        displayNextRecipe();
      }
    },
  });

  // currently only works for the first set of ingredients, does not work for if i restart the whole process
  function displayNextRecipe() {
    $("#regenerateBtn").on("click", function () {
      if (currentRecipeIndex < result.length) {
        $("#recipeImage").attr("src", result[currentRecipeIndex].image);
        $("#recipeImage").attr(
          "alt",
          `Recipe image for ${result[currentRecipeIndex].title}`
        );
        $("#recipeName").text(result[currentRecipeIndex].title);
        $("#nutritionLabel").attr(
          "src",
          `https://api.spoonacular.com/recipes/${result[currentRecipeIndex].id}/nutritionLabel.png?apiKey=d4fc8b0b2ddf4d65864d92dabf969944`
        );
        $("#nutritionLabel").attr(
          "alt",
          `Nutrition label for ${result[currentRecipeIndex].title} recipe`
        );

        $(".videos").html("")

        // Update youtube titles and videos when the find another recipe button is clicked
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${result[currentRecipeIndex].title}-receipe&key=AIzaSyCPQrlqDUzWQXG8L_DzMhfZ64M-WBvCY2Q`)
        .then (function (result){
          return result.json()
        }).then(function (data){
          console.log(data)
          var videoList = data.items;
          for(var i = 0; i < 4; i++){
            var embeddedVideo = `<iframe id="video-player" type="text/html" width="60" height="30" src="https://www.youtube.com/embed/${videoList[i].id.videoId}" frameborder="0"></iframe>`
            $(".videos").append(`<div class="recipe-video">${videoList[i].snippet.title} ${embeddedVideo}</div>`)

            console.log(videoList[i].snippet.title, videoList[i].id.videoId)
          }});
        // console.log(currentRecipeIndex);
        currentRecipeIndex++;
      } else {
        // console.log($("#recipeErrorHandler"));
        $("#recipeErrorHandler")[0].innerText = "No more recipes available.";
        currentRecipeIndex = 0;
      }
    });
  }
});

var requestOptions = {
  method: "GET",
};

function matchWeather(userWeather) {
  var bearSpeechBubble = $("#bearSpeechBubble");
  switch (userWeather) {
    case "Clouds":
      bearSpeechBubble.text(
        "Grey skies? Lets brighten up your day with something yummy."
      );
      break;
    case "Rain":
      bearSpeechBubble.text(
        "Don't forget your umbrella today. Maybe some soup today?"
      );
      break;
    case "Clear":
      bearSpeechBubble.text(
        "Your skies are so clear. Let's cook something pretty!"
      );
      break;
    case "Snow":
      bearSpeechBubble.text("Brr... It's cold! Warm up with something yummy!");
      break;
    default:
      bearSpeechBubble.text("Welcome! Let's find a delicious recipe for you.");
  }

  // Animate the bearSpeechBubble text
  i = 0;
  speed = 50;
  typeWriter(bearSpeechBubble.text());
}

function typeWriter(textContent) {
  var bearSpeechBubble = $("#bearSpeechBubble");
  if (i < textContent.length) {
    bearSpeechBubble.text(textContent.substring(0, i) + textContent.charAt(i));
    i++;
    setTimeout(function () {
      typeWriter(textContent);
    }, speed);
  }
}

function getUserCity() {
  fetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=ac81076e7bbd48f88fba77c2d523e8b2",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (response) {
      var userLocation = response.city.name;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=4d25c521dda0430b5616db00d103b5a4`,
        requestOptions
      )
        .then((response) => response.json())
        .then(function (response) {
          var userWeather = response.weather[0].main;
          matchWeather(userWeather);
        });
    })
    .catch((error) => console.log("error", error));
}

getUserCity();
