// initialize Firebase
var config = {
  apiKey: "AIzaSyApL7sbrjuHPBsX2jBgInz0pVO3F_s0t1c",
  authDomain: "deez-codez.firebaseapp.com",
  databaseURL: "https://deez-codez.firebaseio.com",
  projectId: "deez-codez",
  storageBucket: "deez-codez.appspot.com",
  messagingSenderId: "498884614841"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// target button click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // getting user inputs
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // temporary object for new train saved locally
  var newTrain = {
    name: trainName,
    place: destination,
    first: firstTrain,
    howOften: frequency
  };

  // push user input to database
  dataRef.ref().push(newTrain);

// log to console to check if working
  // console.log(newTrain.name);
  // console.log(newTrain.place);
  // console.log(newTrain.first);
  // console.log(newTrain.howOften);

  alert("New train has been added!"); // <-- turn into popup later

  // clear out form for next input session
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

});

// "firebase watcher" that runs the childSnapshot function when a child is added
dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

      // store input as variables on firebase
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().place;
      var firstTrain = childSnapshot.val().first;
      var frequency = childSnapshot.val().howOften;

    // log to console to check if working
      // console.log(trainName);
      // console.log(destination);
      // console.log(firstTrain);
      // console.log(frequency);

      $("#current-schedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        firstTrain + "</td><td>" + frequency + "</td></tr>");

      // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      function deleteIssue(id) { // creates function to delete the issue
        var issues = JSON.parse(localStorage.getItem('issues'));

        for (var i = 0; i < issues.length; i++) {
          if (issues[i].id == id) {
            issues.splice(i, 1); // uses splice method to "remove" just the one element
          }
        }

        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();
      }

      });

      //
      //   //creates bootstrap list in a well on the DOM with firebase data
      //   $("#full-train-list").append("<div class='well'><span id='name-input')
