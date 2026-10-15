const loader = document.querySelector("#apod-loading")
const dateIn = document.querySelector("#apod-date-input")
const myImage = document.querySelector("#apod-image")
const apodTitle = document.querySelector("#apod-title")
const apodDateDetail = document.querySelector("#apod-date-detail")
const apodDateInfo = document.querySelector("#apod-date-info")
const apodExplanation = document.querySelector("#apod-explanation")
const apodMediaType = document.querySelector("#apod-media-type")
const apodDateInput = document.querySelector("#apod-date-input")
const todayApodBtn = document.querySelector("#today-apod-btn")



async function getIt(dateFromUser) {
    const res = await fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic/${dateFromUser}`)
    const end = await res.json()
    return end
}


function dateValueToCode(DateToTurn) {
    DateToTurn = DateToTurn.split("-")
    DateToTurn[0] = DateToTurn[0].slice(2,)
    DateToTurn = DateToTurn.join("")
    return DateToTurn
}

todayApodBtn.addEventListener("click", ()=>{
    dateIn.valueAsDate = new Date()
    addData()
})

document.addEventListener("DOMContentLoaded", addData)
dateIn.addEventListener("change", addData)

function addData() {
    const code = dateValueToCode(dateIn.value)
    myImage.classList.toggle("hidden")
    loader.classList.toggle("hidden")
    getIt(code).then(console.log)
    getIt(code).then((msg) => {
        myImage.src = msg.hdurl
        loader.classList.toggle("hidden")
        myImage.classList.toggle("hidden")
        apodTitle.textContent = msg.title
        apodDateDetail.lastChild.textContent = msg.date
        apodDateInfo.textContent = msg.date
        apodExplanation.innerHTML = msg.explanation
        apodMediaType.textContent = msg.media_type
        apodDateInput.nextElementSibling.textContent = dateToUser(dateIn.value)

    })

}

function dateToUser(DateToTurn) {
    DateToTurn = new Date(DateToTurn)
    DateToTurn = DateToTurn.toDateString()
    DateToTurn = DateToTurn.split(" ")
    DateToTurn.shift()
    DateToTurn[1] = DateToTurn[1].concat(",")
    DateToTurn = DateToTurn.join(" ")
    console.log(DateToTurn)
    return DateToTurn
}