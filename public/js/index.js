// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);



// var cardDiv = $("<div class='card-div' class='col s3'style='margin:30px;width:350px;'></div>");
// var card = $("<div class='card' style='width: 330px;'data-id={{this.id}}></div>");
// var cardImg = $("<div class='card-image' style='margin:0 auto; width:328px; height:210px;'></div>");
// var cardBodyDiv = $(" <div class='card-body'>");
// var cardTitleSpan = $("<span><h5 class='card-title' id='card-title' style='font-size:25px;font-family: 'Signika', sans-serif;'><strong></strong></h5></span>");
// var cardTextSpan = $("<span class='card-text'id='card-location' style='font-size:16px;font-family: 'Signika', sans-serif;'><a href='#' target='blank'></a></span><br><br>");
// var cardAddresSpan = $("<span class='card-text' id='card-address' style='font-size:16px;font-family: 'Signika', sans-serif;margin:20px 0px;'></span>");
// var cardPrice = $("<span class='card-text' id='card-price' style='text-align:right;font-size:20px;font-family: 'Satisfy', cursive;margin:20px;'></span>");
// var likeButton = $("<a href='#' class='btn btn-primary'style='font-size:15px;' data-id='1'>&hearts;</a>");

$.ajax("../routes/apiRoutes").done(function (body) {
  // console.log(body);
});