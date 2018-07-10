// list of cartoons
var topics = ['aahh!!! real monsters', 'courage the cowardly dog', "dexter's laboratory", "ed, edd n eddy", 'johnny bravo', "rocko's modern life"];

// function display cartoon button
function renderButton(){
    // delete the cartoons prior adding new cartoon
    $('#list').empty();

    // loop through the array of cartoons
    for(var i = 0; i < topics.length; i++ ){
        // create a button
        var button = $('<button class="view">');
        // stores the cartoon name on the button
        button.text(topics[i]);
        button.attr('data-cartoon', topics[i]);
        // add the button to the page
        $('#list').append(button);
    }
}

function displayCartoonInfo(){
    var cartoon = $(this).attr('data-cartoon');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cartoon + "&api_key=o2bM2c8pLLSSFwsMQ3Yxd3ZD8ziQ4wOx&limit=5";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        var results = response.data;
        for(var j = 0; j < results.length; j++){
            // create a div
            var gifDiv = $("<div class='item'>");
            // store the rating of the gif
            var rating = results[j].rating;
            // store it in a paragraph tag
            var p = $('<p>').text('Rating: ' + rating);
            // create a image tag
            var cartoonGif = $('<img>');
            // add a class to the gif
            cartoonGif.addClass('gif');
            // create four attributes to the image tag
            cartoonGif.attr('data-still', results[j].images.original_still.url);
            cartoonGif.attr('data-animate', results[j].images.original.url);
            cartoonGif.attr('src', results[j].images.original_still.url);
            cartoonGif.attr('data-state', 'still');
            // append to the cartoon div
            gifDiv.append(cartoonGif);
            gifDiv.append(p);
            // append to the main div
            $('#main').append(gifDiv);

        }

            // on click function that animates and stills the gif
             $('.gif').on('click', function(){
                var state = $(this).attr('data-state');
                    
                    // if the click image is still, update the src to the animate and set the state to animate
                    // else set the src to still
                        if(state === 'still'){
                            $(this).attr('src', $(this).attr('data-animate'));
                            $(this).attr('data-state', 'animate');
                        } else{
                            $(this).attr('src', $(this).attr('data-still'));
                            $(this).attr('data-state', 'still');
                        }
                    });

    });
}




// function handles events where a cartoon button is clicked
$('#add-a-cartoon').on('click', function(event){
    event.preventDefault();
    // grabs the input to the textbox
    var cartoons = $('input[type="text"]').val();
    // pushes the cartoon to the topic array
    topics.push(cartoons);
    // create the button
    renderButton();
});

// create a on click event to all elements with a class of 'view'
$(document).on('click', '.view', displayCartoonInfo);

renderButton();