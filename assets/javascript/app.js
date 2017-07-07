$(document).ready(function(){

    $("#goButton").on("click", function(){
      var query = $("#input").val();
      console.log(query);

      var queryURL = "https://api.giphy.com/v1/gifs/search";

      queryURL += "?" + $.param({
        "api_key": "357f62e928494ad3be07c6ad01e8b42d",
        "q": query,
        "rating": "PG-13",
        "limit": 5
      });

    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(result){
      console.log(result);

    })//end ajax call
  }) //end search button click event


}); //end document ready
