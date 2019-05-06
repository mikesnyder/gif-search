

//Starting Gif Category buttons
var categories = ["Dogs", "Chris Farley", "Star Wars", "Sloth"];

// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    var category = $(this).attr("data-name");

    var apiKey = "um450KSCPU0N2DvYWIYBhflCy4GX34Mr"

    //Number of gifs returned
    var qty = 1;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=" + apiKey + "&limit=" + qty;
    var i = 0;
    // Creates AJAX call for the specific category button being clicked
    
   


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Creates a div to hold the category
        let wrapper = $("<div>");
        // Retrieves the Rating Data
       
        let rating = response.data[i].rating;
        // Creates an element to have the rating displayed
        let ratingElement = $("<p>");
        // Displays the rating
        ratingElement.text(rating);
        wrapper.prepend(ratingElement);

    
        
        // Creates an element to hold the image
        var gifElement = $("<img>");
        var gifUrl = response.data[i].images.fixed_height_still.url;
        var gifAnimate = response.data[i].images.fixed_height.url;
        var gifStill = response.data[i].images.fixed_height_still.url;
        // Appends the image
        gifElement.attr('src', gifUrl);
        gifElement.attr('data-still', gifStill);
        gifElement.attr('data-animate', gifAnimate);
        gifElement.attr('data-state', 'still');
        gifElement.attr('class', 'gif');
        wrapper.append(gifElement);
        // Puts the gif above other gifs
        $("#category-view").prepend(wrapper);


        $(".gif").on("click", function () {

            let animateUrl = $(this).attr("data-animate");
            let stillUrl = $(this).attr("data-still");
            let state = $(this).attr("data-state");
        
            if (state == "still") {
                $(this).attr("src", animateUrl),
                    $(this).attr("data-state", "animating")
            }
            else {
                $(this).attr("src", stillUrl),
                    $(this).attr("data-state", "still")
            };
        });
    });



}

// Function for displaying category data
function renderButtons() {

    // Deletes the gif buttons prior to adding new buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#gif-buttons").empty();
    // Loops through the array of categories
    for (var i = 0; i < categories.length; i++) {

        // Then dynamicaly generates buttons for each category in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of 'category' to our button
        a.addClass("category");
        // Added a data-attribute
        a.attr("data-name", categories[i]);
        // Provided the initial button text
        a.text(categories[i]);
        // Added the button to the gif-buttons div
        $("#gif-buttons").append(a);
    }
}

$("#add-category").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var categoryAdd = $("#category-input").val().trim();

    // The input from text box is pushed  
    categories.push(categoryAdd);
    // Calling renderButtons which handles the processing of our category array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "category"
$(document).on("click", ".category", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();


//Gif animate, pause, start function
