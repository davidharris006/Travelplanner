$(document).ready(function () {
  // Creates yelp POIs
  function yelppoidata(somearr) {
    $('#yelppoi').css('display', 'block')
    var result = somearr.businesses;
    console.log(result)

    

    for (let i = 0; i < 9; i++) { 
      var poiDiv = $("<div class='table table-borderless yelppoi'>");

      var name = result[i].name
      var addressfirst = result[i].location.display_address[1]
      var addresssecond = result[i].location.display_address[2]
      var rating = result[i].rating

      // Creates text display for Points of Interest
      var text = "Name: " + name + "<br>" + "Address: " + addressfirst + " "  + "<br>" + "Rating: " + rating + "<br>";

      // Creates checkboxes
      var input = $(`<input type='checkbox' id='checkbox-${i}'></input>`);
      // Appends the text for Points of Interest
      var content = $(`<label for='checkbox-${i}'>${text}</label>`);
      // Displays the POI image
      var img = $(`<img class='images' style='width:100px;height:100px;' id='image-${i}' src='${result[i].image_url}'>`);


      poiDiv.append(img);
      poiDiv.append(content);
      poiDiv.append(input);

      poiDiv.css('display', 'block');
      $('#yelppoi').css('display', 'block')

      $('#yelppoi').append(poiDiv);

    }

  }

  // Yelp hotel data
  function yelpdata(somearr) {
    $('#yelp').css('display', 'block')
    var result = somearr.businesses;
    console.log(result);

   

    for (let i = 0; i < 9; i++) {

      // Creating a div to hold the hotel
      var hotelDiv = $("<div class='table table-borderless yelp'>");

      // Storing the name of the hotel
      var name = result[i].name;
      console.log(name);
      var address = result[i].location.address1 + ", " + result[i].location.city;
      console.log(address)

      // Storing the price of the hotel
      var price = result[i].price;
      console.log(price);

      // Storing the URL of the hotel
      var url = result[i].url;
      console.log(url)

      // Creating a p tag with info
   
      var img = $('<img class="images" style="width:100px;height:100px;" id ="image-' + i + '">')
      var text = 
      img.attr("src", result[i].image_url)
      var input = $(`<input type='checkbox' id='checkbox-${i}'></input>`);
      // Appends the text for Points of Interest
      var content = $(`<label for='checkbox-${i}'>${text}</label>`);

      // Appending the p tag to the Hotel Div we created
      
      hotelDiv.append( "Name: " + name + "<br>" + 'Price Range: ' + price + "<br>" + 'Address: ' + address + '<br>' + 'Phone Number: ' + result[i].phone + "<br>")

      hotelDiv.prepend(img)

      hotelDiv.css('display', 'block')
      // Append the hotelDiv to the "#yelp" div in the HTML
      $("#yelp").append(hotelDiv);
    };

    // // Extracts and displays Weather Report
    // function weather() {
    //   var weather = $("<tr>").append(
    //     $("<td>").append('<img src="./images/weather2.jpg" style="width:200px;height:200px;">')
    //   );
    //   $('#weather').append(weather)
    // }
    // weather();


  }


  function ticketmasterdata(somearr) {
    var result = somearr._embedded.events;
    console.log(result);

    

    // Extracts event info from Ticket Master

    for (let i = 0; i < 10; i++) {

      var nameevent = result[i].name;
      var startdate = moment(result[i].dates.start.localDate).format("MM-DD-YYYY")
      var starttime = moment(result[i].dates.start.localTime, "HH:mm").format("hh:mm")
      var type = result[i].classifications[0].segment.name
      var genre = result[i].classifications[0].genre.name
      var venue = result[i]._embedded.venues[0].name

      var tickets = $("<div id='ticketmasterdata'>");

      tickets.append(nameevent + "<br>" + venue + "<br>" + startdate + "&nbsp&nbsp&nbsp" + starttime
        + "<br>" + "Event Type: " + type + "&nbsp&nbsp&nbsp" + "Genre: " + genre + "<br> ");

      $('#ticket-master').css('display', 'block')
      $('#ticketmasterdata').css('display', 'block')
      $('#ticket-master').append(tickets);
      
      
    }
    
  }

  function reset() {

  }

  function createAirlinedata(somearr) {

    // Creates the thead  
    function firstRow() {
      var newRow = $("<tr>").append(
        $("<td>").text("Flight Price"),
        $("<td>").text("Departure Date"),
        $("<td>").text("Flight Class"),
      );

      $('#bodytable').append(newRow)
    }

    firstRow();

    // Lists actual Flight Price, Departure Date, Flight Class

    for (let i = 0; i < 10; i++) {
      var wordedclass = "";
      var tripclass = somearr.data[i].trip_class;

      var tr = $('<tr>')
      if (tripclass === 0) {
        wordedclass = "Economy"
      }
      else if (tripclass === 1) {
        wordedclass = "Coach"
      }

      tr.html('<td>' + somearr.data[i].value + '' + '</td>' + '<td>' + somearr.data[i].depart_date + '' + '</td>' + '<td>' + wordedclass + '' + '</td>')

      $('#bodytable').append(tr)

    }
  }

  $('#submit-btn').on('click', function (event) {
    event.preventDefault();

    $('#yelppoi').empty()
    $('#yelp').empty()
    $('#ticket-master').empty()


    let destination = "";
    let start = "";
    let end = "";

    // Takes the user inputs from the specified IDs

    destination = $("#destination").val().trim();
    start = moment($("#startDate").val().trim());
    end = moment($("#endDate").val().trim());

    console.log(end);

    // weather API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      destination + "&units=imperial&appid=0d696a008b1f28e271bde7e78f277a66&cnt=11";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);

        var weatherData = "";
        weatherData += "<h4>" + response.city.name + " Weather</h4>";
        $.each(response.list, function (index, val) {
          weatherData += "<p>"
          weatherData += "Day " + index + ": "
          weatherData += Math.round(val.main.temp) + "° F |"
          weatherData += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
          weatherData += "<span>" + val.weather[0].description + "</span>";
          weatherData += "</p>"
        });
        $('#weather').css('display', 'block')
        $("#weather").html(weatherData);

      });


    $("#destination").val("");
    $("#startDate").val("");
    $("#endDate").val("");

    $.ajaxPrefilter(function (options) {
      if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
      return start
    });


    // Yelp POI API

    if (sights.checked) {
      var settings1 = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.yelp.com/v3/businesses/search?term=points%20of%20interest&location=${destination}`,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer 8PjqRtWKJIqnBZiMXVyB_Vj0DSnztb_o9Nrn-vYpgAjiDiTmtoUn94UwnrLNfBYKa64OCp9zHcSsHaNfGOO2AaFqYuGjtmz2iJjgcNQ2Zo4UExt_foAbVBEfxAWwXHYx",
          "cache-control": "no-cache",
          "Postman-Token": "07addf4a-c766-4208-8aae-028e210c4bdb"
        }
      }

      $.ajax(settings1).done(function (response) {
        console.log("this response");
        console.log(response);
        yelppoidata(response)
      });
    }


    // // Flight API
    // $.ajax({
    //   url: `http://api.travelpayouts.com/v2/prices/month-matrix?currency=usd&origin=LAX&destination=JFK&month=${start.format("YYYY-MM-DD")}&show_to_affiliates=true&token=0ec4333c4c239dc2eae21220f6504c30`,
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response)
    //   createAirlinedata(response)
    // })
    // $.ajax({
    //   url: `http://api.travelpayouts.com/v2/prices/month-matrix?currency=usd&origin=${from}&destination=${destination}&month=${start.format("YYYY-MM-DD")}&show_to_affiliates=true&token=0ec4333c4c239dc2eae21220f6504c30`,
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response)
    // })


    // Ticketmaster API City 

    if (events.checked) {
      var settings2 = {
        "async": true,
        "crossDomain": true,
        "url": `https://app.ticketmaster.com/discovery/v2/events?apikey=pmgv5WgmN8XawGTxvYH4j912nx7ijBIw&city=${destination}&sort=date,asc&localStartDateTime=${start.format('YYYY-MM-DDTHH:mm:ss')}`,
        "method": "GET",
        "headers": {
          "cache-control": "no-cache",
          "Postman-Token": "7fc3d51f-16dd-494c-b5dd-60edb9a55979"
        }
      }

      $.ajax(settings2).done(function (response) {
        console.log(response);
        ticketmasterdata(response);
      });

    }

    // Yelp hotel API
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://api.yelp.com/v3/businesses/search?term=hotel&location=${destination}`,
      "method": "GET",
      "headers": {
        "Authorization": "Bearer 8PjqRtWKJIqnBZiMXVyB_Vj0DSnztb_o9Nrn-vYpgAjiDiTmtoUn94UwnrLNfBYKa64OCp9zHcSsHaNfGOO2AaFqYuGjtmz2iJjgcNQ2Zo4UExt_foAbVBEfxAWwXHYx",
        "cache-control": "no-cache",
        "Postman-Token": "9b6b8187-1188-4a33-a6b7-11e21b552914"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      yelpdata(response)
    });



  });

  $('#save-btn').on('click', function(event) {
    event.preventDefault();

    console.log($('#checkbox-1').text())

  })

  // Dynamically creates checkboxes with gifs to the right
  // function appendCheck() {
  //   var div = $("<div>");
  //   var gifs = ["<img src=./images/hotel-gif.gif>", "<img src=./images/car.gif>"];
  //   // var checkbox = ["<input type='checkbox' checked='yes'>"];


  //   for (var i = 0; i < gifs.length; i++) {

  //     div.append("&nbsp&nbsp&nbsp" + "<div id=submit-btn>"  + "" + "</input>"
  //      + "&nbsp&nbsp" + gifs[i] + "&nbsp&nbsp&nbsp");

  //   }
  //   $("#check").append(div);
  // }
  // appendCheck();

});
