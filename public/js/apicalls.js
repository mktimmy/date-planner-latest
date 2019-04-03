$('#submit-button').on("click", function () {
    event.preventDefault();

    var getDiscount = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.discountapi.com/v2/deals?aumtHLbj=",
        "method": "GET", 
        "query": {
                "total": 10,
                "page": 1,
                "per_page": 10,
                "query": "food",
                "location": {
                  "latitude": 39.151958,
                  "longitude": -84.477405
                },
                "radius": 10
            },
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "1c44b74b-0fe2-4089-b538-970130cf56ef",
    }
}

    $.ajax(getDiscount).done(function (response) {
        var results = response.response.deals;
        console.log(results);        
    }
    )

    var getEvent = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.eventbriteapi.com/v3/users/me?token=DDH7KIA4IQYR5RLOTGDA",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Postman-Token": "51380402-7beb-4f01-a0ff-afff2326be91"
        }
    };

    $.ajax(getEvent).done(function (response) {
        var results = response.response.deals;
        console.log(response);
    });
});