$(document).ready(function(){
  var topics = [
                "Vince Carter","Shaquille O'Neal",
                "Dominique Wilkins","Michael Jordan",
                "Kobe Bryant","Blake Griffen",
                "Shawn Kemp","Charles Barkley",
                "LeBron James","Julius Erving"
              ];

  renderButtons();

  function renderButtons(){
    $("#gif-buttons-go-here").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifButtons = $("<button>");
        gifButtons.addClass("btn btn-default btn-lg");
        gifButtons.attr("data-text", topics[i]);
        gifButtons.text(topics[i]);
        $("#gif-buttons-go-here").append(gifButtons);
    }
  };

  $("#addButton").on("click", function(event){
    event.preventDefault();
    var input = $("#input").val().trim();
    if(topics.includes(input)){

    }else {
      topics.push(input);
    }
    $("#input").val("");
    console.log(topics);
    renderButtons();

  }); //end addButton click event

  $(document).on("click",".btn-lg", function(event){
      event.preventDefault();
      $("#gifs-go-here").html("");
      var dunkGifs = $(this).attr("data-text");
      var queryURL = "https://api.giphy.com/v1/gifs/search";

        queryURL += "?" + $.param({
          "api_key": "357f62e928494ad3be07c6ad01e8b42d",
          "q": dunkGifs + "+dunk" + "+NBA",
          "rating": "PG-13",
          "limit": 5,
        });

        $.ajax({
          url: queryURL,
          method: "GET",
        }).done(function(result){
          var results = result.data;
          console.log(results);
          console.log(queryURL);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='col-md-6'>");
            var stillGifImage = $("<img>");
            animateGifImage = $("<img>")

            stillGifImage.addClass("img-thumbnail");
            stillGifImage.attr("data-state", "still");
            stillGifImage.attr("data-animate", results[i].images.fixed_height.url);
            stillGifImage.attr("data-still", results[i].images.fixed_height_still.url);
            stillGifImage.attr("src", results[i].images.fixed_height_still.url);

            gifDiv.append(stillGifImage);
            $("#gifs-go-here").append(gifDiv);
        };
      }) //end ajax call
    }); //end gifButton click event

    $(document).on("click", ".img-thumbnail", function(event){
      event.preventDefault();
      var state = $(this).attr("data-state");

      if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); //end animate button event

}); //end document ready
