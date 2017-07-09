$(document).ready(function(){
  //declare and initialize topics array
  var topics = [
                "Vince Carter","Shaquille O'Neal",
                "Dominique Wilkins","Michael Jordan",
                "Kobe Bryant","Blake Griffen",
                "Shawn Kemp","Charles Barkley",
                "LeBron James","Julius Erving"
              ];

  //call rendorbuttons function to create buttons for items already in array
  renderButtons();

  /*
    renderButtons function dynamically adds buttons to the document, based on values
    in the topics array
  */
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

  /*
    addButton click event allows user to input into text field, submit that value
    and if the value does not already exist, will push the value into the topices array.
    it will then call the rendorbuttons function to render new buttons to the dom
  */

  $("#addButton").on("click", function(event){
    event.preventDefault();
    var input = $("#input").val().trim();

    //checks to see if input value is already included in topics array
    //if so, do nothing, if not, push value into array
    if(topics.includes(input)){

    }else {
      topics.push(input);
    }
    $("#input").val("");
    renderButtons();

  }); //end addButton click event

  /*
    button click event makes a call to the Giphy library using the appropriate API
    url, key, and search structure
  */

  $(document).on("click",".btn-lg", function(event){
      event.preventDefault();
      $("#gifs-go-here").html("");

      //get value of the data-text field of the button clicked and assign to a variable
      var dunkGifs = $(this).attr("data-text");
      var queryURL = "https://api.giphy.com/v1/gifs/search";

      //concatenate url, api_key, value of dunkGifs, rating, and limit and store
      //value into queryURL variable
        queryURL += "?" + $.param({
          "api_key": "357f62e928494ad3be07c6ad01e8b42d",
          "q": dunkGifs + "+dunk" + "+NBA",
          "rating": "PG-13",
          "limit": 5,
        });

      //make ajax call with value in queryURL
        $.ajax({
          url: queryURL,
          method: "GET",
        }).done(function(result){
          var results = result.data;

          //loop through data array in object
          for (var i = 0; i < results.length; i++) {
            //create div and assign column class
            var gifDiv = $("<div class='col-md-6'>");
            var stillGifImage = $("<img>");

            //assign data attributes to variable with img tag
            stillGifImage.addClass("img-thumbnail");
            stillGifImage.attr("data-state", "still");
            stillGifImage.attr("data-animate", results[i].images.fixed_height.url);
            stillGifImage.attr("data-still", results[i].images.fixed_height_still.url);
            stillGifImage.attr("src", results[i].images.fixed_height_still.url);

            //append image variable to created div
            gifDiv.append(stillGifImage);
            //append created div to our html id
            $("#gifs-go-here").append(gifDiv);
        };
      }) //end ajax call
    }); //end gifButton click event

    /*
      thumbnail click will switch between still picture of gif and animated gif
    */
    $(document).on("click", ".img-thumbnail", function(event){
      event.preventDefault();
      var state = $(this).attr("data-state");

      //if the state of the picture clicked is still, assign new source from
      //the picture's data-animate attribute, then assign the data-state to animate
      //If data state is animate, change src and data-state back to still 
      if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); //end animate button event

}); //end document ready
