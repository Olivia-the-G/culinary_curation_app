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
