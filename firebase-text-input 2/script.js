// Your web app's Firebase configuration
//const firebaseConfig = {
//  apiKey: "AIzaSyAFajdu_Y13KgwcZA3LPJmj2j_nw7SoB0s",
//  authDomain: "collective-input.firebaseapp.com",
//  projectId: "collective-input",
//  storageBucket: "collective-input.appspot.com",
//  messagingSenderId: "338519851864",
//  appId: "1:338519851864:web:5fb3b64d1cad63b20b1b2d",
//  measurementId: "G-G0J7EQCZPC"
//};

const firebaseConfig = {
  apiKey: "AIzaSyCY_paGXJ_BV0BAgch29U37N_V67AGgOwQ",
  authDomain: "iml300-firebase-demo-39948.firebaseapp.com",
  databaseURL: "https://iml300-firebase-demo-39948-default-rtdb.firebaseio.com",
  projectId: "iml300-firebase-demo-39948",
  storageBucket: "iml300-firebase-demo-39948.firebasestorage.app",
  messagingSenderId: "244591779401",
  appId: "1:244591779401:web:784bd3ae62ab11dda4e998",
  measurementId: "G-BJJ1ZTS6VK"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
let dbRef = db.ref("text");

  //var data ={
  //  name: "q",
  //  word: "hello"
  //}
//
 //dbRef.push(data);

let chatContainer = document.getElementById("chat-container");
let entry = document.getElementById("text-input-entry");
let share = document.getElementById("text-input-submit");

dbRef.on("child_added", gotText);

function gotText(data) {
  let id = data.key;
  let value = data.val();
  console.log(value);
  chatContainer.innerHTML =
    "<div class='response'>" + value + "</div>" + chatContainer.innerHTML;
}

//click button will run this function
const textInputSubmit = document.getElementById("text-input-submit");
textInputSubmit.addEventListener("click", submitText);

let textContainerElement = document.getElementById("text-input-entry");

function submitText() {
  let textToSubmit = textContainerElement.value; //gets text value from textbox
  let newKey = dbRef.push().key; //ask firebase to give you a new key / 'name'
  let updates = {}; //send firebase list of values
  updates[newKey] = textToSubmit;
  dbRef.update(updates);
}

function submitlock() {
  entry.remove();
  share.value = "Thanks for telling me.";
  share.disabled = true;
  share.style.width = "70%";
}