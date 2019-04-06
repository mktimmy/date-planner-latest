// $(document).ready(function () {

//     $('#submit-button').on("click", function () {
//         event.preventDefault();

//         var userLocation = $("#user-location").val();
//         console.log(userLocation);


//         var options = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://api.discountapi.com/v2/deals",
//             "method": "GET",
//             "query": {
                
//             },
//             "headers": {
//                 "cache-control": "no-cache",
//                 "Postman-Token": "da5f4d45-eeb3-4c73-bd8c-af47e1fabfde"
//             }
//         };

//         $.ajax(settings).done(function (response) {
//             console.log(response);
//         });

//         $.ajax(eventb).done(function (response) {
//             var results = response.response.deals;
//             console.log(results);
//         });

//         var eventb = {
//             "async": true,
//             "crossDomain": true,
//             "url": "https://www.eventbriteapi.com/v3/users/me?token=DDH7KIA4IQYR5RLOTGDA",
//             "method": "GET",
//             "headers": {
//                 "cache-control": "no-cache",
//                 "Postman-Token": "51380402-7beb-4f01-a0ff-afff2326be91"
//             }
//         };

//         $.ajax(eventb).done(function (response) {
//             var results = response.response.deals;
//             console.log(response);
//         });
//     });


// });