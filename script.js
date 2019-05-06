
//Gif animate, pause, start function
// $(".gif").on("click", function () {

//     let animateUrl = $(this).attr("data-animate");
//     let stillUrl = $(this).attr("data-still");
//     let state = $(this).attr("data-state");

//     if (state === "still") {
//         $(this).attr("src", animateUrl),
//             $(this).attr("data-state", "animating")
//     }
//     else {
//         $(this).attr("src", stillUrl),
//             $(this).attr("data-state", "still")
//     };
// });

//Starting Gif Category buttons
var categories = ["Dogs", "Chris Farley", "Star Wars", "Sloth"];

// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    var category = $(this).attr("data-name");

    var apiKey = "um450KSCPU0N2DvYWIYBhflCy4GX34Mr"

    //Number of gifs returned
    var qty = "1"
    var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=" + apiKey + "&limit=" + qty;
    // Creates AJAX call for the specific movie button being clicked
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    console.log(response.data[0].rating)
        // Creates a div to hold the movie
        let wrapper = $("<div>");
        // Retrieves the Rating Data
        let i = 0;
        let rating = response.data[i].rating;
        // Creates an element to have the rating displayed
        let ratingElement = $("<p>");
        // Displays the rating
        ratingElement.text(rating);
        wrapper.append(ratingElement);

    
        
        // Creates an element to hold the image
        let posterElement = $("<img>");
        let posterUrl = response.data[i].images.fixed_height_still.url;
        // Appends the image
        posterElement.attr('src', posterUrl)
        wrapper.append(posterElement);
        // Puts the entire Movie above the previous movies.
        $("#category-view").prepend(wrapper);
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#gif-buttons").empty();
    // Loops through the array of movies
    for (var i = 0; i < categories.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("category");
        // Added a data-attribute
        a.attr("data-name", categories[i]);
        // Provided the initial button text
        a.text(categories[i]);
        // Added the button to the gif-buttons div
        $("#gif-buttons").append(a);
    }
}
//Step-1
// This function handles events where the add movie button is clicked
$("#add-category").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var categoryAdd = $("#category-input").val().trim();

    // The movie from the textbox is then added to our array
    categories.push(categoryAdd);
    console.log(categories)
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".category", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();