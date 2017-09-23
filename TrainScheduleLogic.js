var config = {
    apiKey: "AIzaSyDvRClSA5hF1yhm1GB-a_7xx9rP5BMFdBg",
    authDomain: "train-scheduler-40761.firebaseapp.com",
    databaseURL: "https://train-scheduler-40761.firebaseio.com",
    projectId: "train-scheduler-40761",
    storageBucket: "",
    messagingSenderId: "1004657201566"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = $("#FirstTrain-input").val().trim();


  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trnName,
    destination: destination,
    start: firstTime,
    freq: frequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#FirstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log("blah");
  console.log(childSnapshot.val());
  console.log(prevChildKey);

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().freq;

  // train Info
  console.log(trnName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

var firstTimeConverted = moment(firstTime, "hh:mm");



  var currentTime = moment();
  console.log("Current Time:" + moment(currentTime).format("HH:mm"));
  var diffTime = currentTime -moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in Time" +diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log(tMinutesTillTrain); 


  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time" + moment(nextTrain).format("hh:mm"));

  var nextTrainConverted = moment(nextTrain).format("hh:mm");




  //current time - first train time to get the difference between now and the first train


  //divide the difference by the frequency (with remainder using modulus)

  //frequency minus remainder to get the time until the next train

// calculate the trains arrival time. 

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + destination +"</td><td>" + frequency 
    + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});