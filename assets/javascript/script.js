$(document).ready(function() {
// Golbal Variables
var topics = ["Guitars", "The Office", "Baseball", "Adult Swim", "Harry Potter", "Coding"];
var stillImgUrl = '';
var imgURL = '';
var gifCondition = '';
var stillUrl = '';
var animateUrl = '';

// displayGifInfo function re-renders the HTML to display the appropriate content
var displayGifInfo = function () {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + movie + "&limit=10&offset=0&rating=PG&lang=en";
    

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#show-view").empty();
      for (var i = 0; i < 10; i++) {
      // Retrieving the URL for the still and regular animated image
      stillImgUrl = response['data'][i]['images']['fixed_width_still']['url'];
      imgURL = response['data'][i]['images']['fixed_width']['url'];
      // Creating a div to hold the gifs
      var gifDivCard = $("<div class='card' style='width: 250px;'>");
      // Creating an element to hold the image
      var image = $("<img class='gifImage' 'card-img-top' style='height:230px;'>");
      //Give img element stillImgUrl, animated  & src attribute
      image.attr('data-still', stillImgUrl);
      image.attr('data-animate', imgURL);
      image.attr('src', stillImgUrl);
      image.attr('data-type', 'still');
      // Appending the image
      gifDivCard.append(image);
      var gifDivCardBody = $("<div class='card-body'>");
      // Storing the rating data
      var rating = response['data'][i]['rating'];
      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);
      // Displaying the rating
      gifDivCardBody.append(pOne);
      gifDivCard.append(gifDivCardBody);
      // Putting the entire gif above the previous gifs
      $("#show-view").prepend(gifDivCard);
          };
      });
};

var gifAnimate = function() {
  //sets gifCondition to either still or animate
  gifCondition = $(this).data('type');
  stillUrl = $(this).data('still');
  animateUrl = $(this).data('animate');
  if (gifCondition === 'still') {
      //Changes the gif to an animated image by switching the URL
      $(this).attr('src', animateUrl);
      //Switch the data-type to animate
      $(this).data('type', 'animate');
  } else if (gifCondition === 'animate') {
      //Change src to still
      $(this).attr('src', stillUrl);
      //Switch the data-type to still
      $(this).data('type', 'still');
  };
};

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("show");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        };
      };

      // This function handles events where one button is clicked
      $("#add-show").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var show = $("#show-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(show);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
        });

        // Adding a click event listener to all elements with a class of "show"
        $(document).on("click", ".show", displayGifInfo);
        $(document).on("click", ".gifImage", gifAnimate);
        
        // Calling the renderButtons function at least once to display the initial list of topics
        renderButtons();

});        