var config = {
    apiKey: "AIzaSyAs3JEA2_UGLaQHq-MlprtQQFfgIruRJNU",
    authDomain: "bannana-24273.firebaseapp.com",
    databaseURL: "https://bannana-24273.firebaseio.com",
    projectId: "bannana-24273",
    storageBucket: "bannana-24273.appspot.com",
    messagingSenderId: "805204442777"
};
firebase.initializeApp(config);
var database = firebase.database();
var time = moment()
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "h:mm a").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        train: trainName,
        destination: trainDest,
        start: trainStart,
        frequency: trainFreq,
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function autoUpdate (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    var trainStartConvert = moment(trainStart, "h:mm a").subtract(1, "years");

    // ct
    var currentTime = moment()

    // Difference between the times
    var diffTime = moment().diff(moment(trainStartConvert), "minutes");

    var trainRemainder = diffTime % trainFreq;


    var minAway = trainFreq - trainRemainder;

    var arrivalTime = moment().add(minAway, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td class='timeNow'>").text(moment(currentTime).format("h:mm a")),
        $("<td class='nextArrival'>").text(moment(arrivalTime).format("h:mm a")),
        $("<td class='timeAway'>").text(minAway),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
    


// console.log(autoUpdate)
});
// console.log(autoUpdate)
// if (time = moment()) {
//     autoUpdate()
//     setInterval(autoUpdate, 30000)
// }
// database.ref().on("child_changed", function (childSnapshot) {
//     function nextTrain() {
//         updateCurrentTime = $("<td class='timeNow'>").text(moment(currentTime).format("h:mm a"));
//         $("<td class='timeNow'>").replaceWith(updateCurrentTime);
//         updateArrival = $("<td class='nextArrival'>").text(moment(arrivalTime).format("h:mm a"));
//         $("<td class='nextArrival'>").replaceWith(updateArrival);
//         updateMinAway = $("<td class='timeAway'>").text(minAway);
//         $("<td class='timeAway'>").replaceWith(updateMinAway)

// }
// nextTrain()
//     setInterval(nextTrain, 30000)
//     console.log(nextTrain)
//     console.log(setInterval)
// })