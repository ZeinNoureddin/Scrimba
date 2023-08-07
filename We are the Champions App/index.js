import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-270ee-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

const endorsementTextEl = document.getElementById("endorsement-el")
const fromInputEl = document.getElementById("from-el")
const toInputEl = document.getElementById("to-el")
const publishButtonEl = document.getElementById("publish")
const endorsementsListEl = document.getElementById("endorsementsList")


publishButtonEl.addEventListener("click", function(){
    let endorsementItem = {
        endorsementValue: endorsementTextEl.value,
        fromValue: fromInputEl.value,
        toValue: toInputEl.value
    }
    push(endorsementsListInDB, endorsementItem)
    clearInputFields()
})

onValue(endorsementsListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        // console.log(itemsArray)
        clearEndorsementListEl()
        for(let i = 0; i < itemsArray.length; i++){
            appendItemToEndorsementsListEl(itemsArray[i])
            // console.log(itemsArray[i])
            // console.log(itemsArray[i][1].endorsementValue)
        }
    }
})

function clearInputFields(){
    endorsementTextEl.value = ""
    fromInputEl.value = ""
    toInputEl.value = ""
}

function clearEndorsementListEl(){
    endorsementsListEl.innerHTML = ""
}

function appendItemToEndorsementsListEl(item){
    let newEndorsement = document.createElement("div")
    newEndorsement.className = "anEndorsement"
    newEndorsement.innerHTML = `
            <div class="tf">To: ${item[1].toValue}</div>
                ${item[1].endorsementValue}
            <div class="tf btmMargin">From: ${item[1].fromValue}</div>
    `
    endorsementsListEl.prepend(newEndorsement)
}