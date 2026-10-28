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



async function getIt(dateFromUser = "", url = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/") {
    // const res = await fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic/${dateFromUser}`)

    const res = await fetch(`${url}${dateFromUser}`)

    const end = await res.json()
    return end
}


function dateValueToCode(DateToTurn) {
    DateToTurn = DateToTurn.split("-")
    DateToTurn[0] = DateToTurn[0].slice(2,)
    DateToTurn = DateToTurn.join("")
    return DateToTurn
}

todayApodBtn.addEventListener("click", () => {
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
    // console.log(DateToTurn)
    return DateToTurn
}

// الشريط الجانبي 
// ظهور وإختفاء الشريط الجانبي
// ---------------------------------


const sidebarToggle = document.querySelector("#sidebar-toggle")
const sideBar = document.querySelector("#sidebar")
const sidebarOverlay = document.createElement("div")
sidebarOverlay.classList.add("sidebar-overlay")

sidebarToggle.addEventListener("click", () => {
    sideBar.classList.add("sidebar-open")
    document.body.appendChild(sidebarOverlay)
})
sidebarOverlay.addEventListener("click", () => {
    sideBar.classList.remove("sidebar-open")
    document.body.removeChild(sidebarOverlay)
})

// التنقل فى الشريط الجانبي
// ---------------------------------
// كله هيتمسح 
// هيكون في دالة الدالة دي هتاخد اسم الجزء الي هيظهر فتعمل عليه التغييرات المطلوبة 
// بس هنحتاج نحفظ احنا فين عشان نشيله لما نرجع يبقى كائن فيه حفظ حالة ودالتين واحدة تفعيل وواحدة إلغاء تفعيل
// 
activeElement = {
    lastActiveEle: undefined,
    deActivate: (nameOfEle) => {
        if (nameOfEle === undefined) { return }
        const sidebarEle = document.querySelector(`a[data-section="${nameOfEle}"]`)
        const sectionEle = document.querySelector(`#${nameOfEle}`)

        sidebarEle.classList.remove("bg-blue-500/10", "text-blue-400")
        sidebarEle.classList.add("text-slate-300", "hover:bg-slate-800")

        sectionEle.classList.add("hidden")
    },

    activate(nameOfEle) {
        if (nameOfEle === undefined) { return }
        const sidebarEle = document.querySelector(`a[data-section="${nameOfEle}"]`)
        const sectionEle = document.querySelector(`#${nameOfEle}`)

        sidebarEle.classList.add("bg-blue-500/10", "text-blue-400")
        sidebarEle.classList.remove("text-slate-300", "hover:bg-slate-800")

        sectionEle.classList.remove("hidden")
        this.lastActiveEle = nameOfEle
    }

}

document.addEventListener("DOMContentLoaded", () => {
    activeElement.deActivate(activeElement.lastActiveEle)
    activeElement.activate("today-in-space")
})

document.body.addEventListener("click", (e) => {
    console.log(e.target.closest("a"))
    clickedEle = e.target.closest("a")
    targetAtt = clickedEle?.getAttribute("data-section")
    sideLinks = ["today-in-space", "launches", "planets"]
    if (sideLinks.includes(targetAtt)) {
        activeElement.deActivate(activeElement.lastActiveEle)
        activeElement.activate(targetAtt)
    }
})

// سحب محتوى صفحة الرحلات 

function creatFinslCurrentResult(currentResult) {
    const storedLunchDateTimeRemain = creatLunchDateTimeRemain(currentResult)
    return {
        abbrev: currentResult.status.abbrev,
        featured: currentResult.pad.agencies[0]?.featured,
        imageUrl: currentResult.image.image_url,
        name: currentResult.name,
        serviceProvider: currentResult.launch_service_provider.name,
        rocket: currentResult.rocket.configuration.name,
        lunchDate: storedLunchDateTimeRemain.lunchDateDate,
        lunchTime: storedLunchDateTimeRemain.lunchDateTime,
        location: currentResult.pad.location.name,
        country: currentResult.pad.country.name,
        description: currentResult.mission.description,
        remainingTime: storedLunchDateTimeRemain.remainingTime
    }
}

//سؤال هنا

function creatLunchDateTimeRemain(currentResult) {
    const thisDay = new Date()
    const lunchDate = new Date(currentResult.window_start)
    const optionsDate = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }
    const optionsTime = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }

    const data = {
        // التاريخ فقط
        lunchDateDate: lunchDate.toLocaleDateString(undefined, optionsDate),
        // الوقت فقط
        lunchDateTime: lunchDate.toLocaleTimeString(undefined, optionsTime),
        //الوقت المتبقي
        remainingTime: ((lunchDate.getTime() - thisDay.getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)
    }
    return data
}

const comingImg = document.querySelector("#coming-img")
const featured = document.querySelector("#featured")
const comingName = document.querySelector("#coming-name")
const comingAbbrev = document.querySelector("#coming-abbrev")
const serviceProvider = document.querySelector("#service-provider")
const rocket = document.querySelector("#rocket")
const daysUntilLaunch = document.querySelector("#days-until-launch")
const lunchDateTag = document.querySelector("#lunch-date")
const lunchTime = document.querySelector("#lunch-time")
const locationTag = document.querySelector("#location")
const country = document.querySelector("#country")
const description = document.querySelector("#description")

function creatMainCard(results) {
    const result = creatFinslCurrentResult(results[0])
    comingImg.src = result.imageUrl
    result.featured || featured.remove()
    comingName.lastChild.textContent = result.name
    comingAbbrev.lastChild.textContent = result.abbrev
    serviceProvider.lastChild.textContent = result.serviceProvider
    rocket.lastChild.textContent = result.rocket
    daysUntilLaunch.lastChild.textContent = result.remainingTime
    lunchDateTag.lastChild.textContent = result.lunchDate
    lunchTime.lastChild.textContent = result.lunchTime
    locationTag.lastChild.textContent = result.location
    country.lastChild.textContent = result.country
    description.lastChild.textContent = result.description
}


// تحديد الكروت ووضع البيانات فيها

const mainCard = document.querySelector("#main-card")
mainCard.remove()
let eterator = 0

function fillCard(card, dataSource) {
    const cardCopy = card.cloneNode(true)
    const cardObj = {
        cardComingImg: cardCopy.querySelector("#card-coming-img"),
        cardAbbrev: cardCopy.querySelector("#card-abbrev"),
        cardName: cardCopy.querySelector("#card-name"),
        cardServiceProvider: cardCopy.querySelector("#card-service-provider"),
        cardLunchDate: cardCopy.querySelector("#card-lunch-date"),
        cardLunchTime: cardCopy.querySelector("#card-lunch-time"),
        cardRocket: cardCopy.querySelector("#card-rocket"),
        cardLocation: cardCopy.querySelector("#card-location")
    }

    cardObj.cardComingImg.src = dataSource.imageUrl
    cardObj.cardName.lastChild.textContent = dataSource.name
    cardObj.cardAbbrev.lastChild.textContent = dataSource.abbrev
    cardObj.cardServiceProvider.lastChild.textContent = dataSource.serviceProvider
    cardObj.cardRocket.lastChild.textContent = dataSource.rocket
    cardObj.cardLunchDate.lastChild.textContent = dataSource.lunchDate
    cardObj.cardLunchTime.lastChild.textContent = dataSource.lunchTime
    cardObj.cardLocation.lastChild.textContent = dataSource.location
    cardCopy.removeAttribute('id')
    for (const element of Object.values(cardObj)) {
        element.removeAttribute('id')
    }

    return cardCopy


}


const launchesGrid = document.querySelector("#launches-grid")


getIt("", "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10").then((data) => {
    console.log("----data-----\n", data)
    const results = data.results
    creatMainCard(results)
    for (const launchData of results.slice(1)) {
        let data = creatFinslCurrentResult(launchData)
        launchesGrid.appendChild(fillCard(mainCard, data))
    }
})


const imageSrc = {
    earth: 'images/earth.png',
    favicon: 'images/favicon.png',
    jupiter: 'images/jupiter.png',
    mars: 'images/mars.png',
    mercury: 'images/mercury.png',
    neptune: 'images/neptune.png',
    saturn: 'images/saturn.png',
    uranus: 'images/uranus.png',
    venus: 'images/venus.png'
}

const renderHolders = {
    planetImage: document.querySelector('#planet-detail-image'),
    planetName: document.querySelector('#planet-detail-name'),
    planetDescription: document.querySelector('#planet-detail-description'),
    planetDistance: document.querySelector('#planet-distance'),
    planetRadius: document.querySelector('#planet-radius'),
    planetMass: document.querySelector('#planet-mass'),
    planetDensity: document.querySelector('#planet-density'),
    planetOrbitalPeriod: document.querySelector('#planet-orbital-period'),
    planetRotation: document.querySelector('#planet-rotation'),
    planetMoons: document.querySelector('#planet-moons'),
    planetGravity: document.querySelector('#planet-gravity'),
    planetDiscoverer: document.querySelector('#planet-discoverer'),
    planetDiscoveryDate: document.querySelector('#planet-discovery-date'),
    planetBodyType: document.querySelector('#planet-body-type'),
    planetVolume: document.querySelector('#planet-volume'),
    planetPerihelion: document.querySelector('#planet-perihelion'),
    planetAphelion: document.querySelector('#planet-aphelion'),
    planetEccentricity: document.querySelector('#planet-eccentricity'),
    planetInclination: document.querySelector('#planet-inclination'),
    planetAxialTilt: document.querySelector('#planet-axial-tilt'),
    planetTemp: document.querySelector('#planet-temp'),
    planetEscape: document.querySelector('#planet-escape'),
    quickFacts: {
        planetMass: document.querySelector('#planet-facts [data-field="mass"]'),
        planetSurfaceGravity: document.querySelector('#planet-facts [data-field="surface-gravity"]'),
        planetDensity: document.querySelector('#planet-facts [data-field="density"]'),
        planetAxialTilt: document.querySelector('#planet-facts [data-field="axial-tilt"]')
    }
}




const planetColors = {
    non: "#000000",
    uranus: "#22d3ee",
    neptune: "#2563eb",
    jupiter: "#fdba74",
    mars: "#ef4444",
    mercury: "#6b7280",
    saturn: "#fde047",
    earth: "#3b82f6",
    venus: "#fb923c"
}

const planetType = {
    non: {
        background: ["black"]
    },
    "Ice Giant": {
        background: ["bg-blue-500/50", "text-blue-200"],
        name: "Ice Giant"
    },
    "Terrestrial": {
        background: ["bg-orange-500/50", "text-orange-200"],
        name: "Terrestrial"
    },
    "Gas Giant": {
        background: ["bg-purple-500/50", "text-purple-200"],
        name: "Gas Giant"
    }
}




const planetRenderRowTemplate = document.querySelector('#planet-comparison-tbody [data-field="planet-render-row-template"]')
function renderRow(planet) {
    const planetRow = planetRenderRowTemplate.cloneNode(true)
    console.log(planetRow)
    console.log(planetRow.querySelector('[data-field="background-color"]'))
    const planetRowRenderHolders = {
        backGround: planetRow.querySelector('[data-field="background-color"]'),
        name: planetRow.querySelector('[data-field="name"]'),
        distance: planetRow.querySelector('[data-field="distance"]'),
        diameter: planetRow.querySelector('[data-field="diameter"]'),
        mass: planetRow.querySelector('[data-field="mass"]'),
        orbitalPeriod: planetRow.querySelector('[data-field="orbital-period"]'),
        moons: planetRow.querySelector('[data-field="moons"]'),
        type: planetRow.querySelector('[data-field="type"]'),
        typeBackGround: planetRow.querySelector('[data-field="type"]'),
    }
    planetRowRenderHolders.backGround.style.backgroundColor = planet.backGround;
    planetRowRenderHolders.name.textContent = planet.name;
    planetRowRenderHolders.distance.textContent = planet.distance;
    planetRowRenderHolders.diameter.textContent = planet.diameter;
    planetRowRenderHolders.mass.textContent = planet.mass;
    planetRowRenderHolders.orbitalPeriod.textContent = planet.orbitalPeriod;
    planetRowRenderHolders.moons.textContent = planet.moons;
    planetRowRenderHolders.type.textContent = planet.type;
    planetRowRenderHolders.typeBackGround.classList.add(...(planet.typeBackGround))

    return planetRow
}

function toYearsIfNeed(dayes) {

    let result = dayes + " dayes"
    if (dayes >= 30) {
        const monthes = dayes /= 30
        result = monthes.toFixed(1) + " monthes"
        if (monthes >= 12) {
            const years = monthes / 12
            result = years.toFixed(1) + " years"
        }
    }
    return result

}


function createPlanetsObj(planets) {
    const returnedPlanets = {}
    for (const planet of planets) {
        const newPlanet = {
            backGround: planetColors[planet.englishName.toLowerCase() ?? "non"],
            name: planet.englishName ?? "not there",
            distance: ((planet.semimajorAxis ?? 0) / 149_597_870.7).toFixed(2),
            diameter: ((planet.meanRadius ?? 0) * 2).toFixed(3),
            mass: (planet.mass.massValue ?? 0) * 10 ** (planet.mass.massExponent ?? 0),
            orbitalPeriod: toYearsIfNeed(planet.sideralOrbit ?? 0),
            moons: planet.moons?.length ?? 0,
            type: planet.type ?? "not there",
            typeBackGround: planetType[planet.type ?? "non"].background,
            image: imageSrc[planet.englishName.toLowerCase()],
            description: planet.description ?? "not description",
            semimajorAxis: ((planet.semimajorAxis ?? 0) / 1000_000) + " M km",
            meanRadius: ((planet.meanRadius ?? 0).toLocaleString()) + " km",
            massHTML: `${planet.mass.massValue} × 10<sup>${planet.mass.massExponent}</sup> kg`,
            densityHTML: `${planet.density} g/cm<sup>3</sup>`,
            planetRotation: Math.abs(planet.sideralRotation) + " h",
            gravityHTML: `${planet.gravity} m/s<sup>2</sup>`,
            volumeHTML: `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> kg`,
            discoveryDate: planet.discoveryDate || "Ancient times",
            discoverer: planet.discoveredBy || "Known since antiquity",
            bodyType: planet.bodyType,
            perihelion: ((planet.perihelion ?? 0) / 1_000_000).toFixed(1) + " M km",
            aphelion: ((planet.aphelion ?? 0) / 1_000_000).toFixed(1) + " M km",
            eccentricity: planet.eccentricity ?? "N/A",
            inclination: (planet.inclination ?? 0) + "°",
            axialTilt: (planet.axialTilt ?? 0) + "°",
            avgTempCelsius: ((planet.avgTemp ?? 0) - 273.15).toFixed(1) + " °C",
            escapeVelocity: ((planet.escape ?? 0) / 1000).toFixed(2) + " km/s",
        }
        console.log(`____________________${planet.englishName}__________________`, planet.discoveryDate)
        console.log(`____________________${planet.englishName}__________________`, planet.discoveredBy)
        returnedPlanets[`${(newPlanet.name).toLowerCase()}`] = newPlanet
    }
    return returnedPlanets
}

function renderPlanetPage(planets, name) {
    const planet = planets[name]
    const {
        planetImage,
        planetName,
        planetDescription,
        planetDistance,
        planetRadius,
        planetMass,
        planetDensity,
        planetOrbitalPeriod,
        planetRotation,
        planetMoons,
        planetGravity,
        planetDiscoverer,
        planetDiscoveryDate,
        planetBodyType,
        planetVolume,
        planetPerihelion,
        planetAphelion,
        planetEccentricity,
        planetInclination,
        planetAxialTilt,
        planetTemp,
        planetEscape,
        quickFacts
    } = renderHolders
    const {
        name: pName,
        distance,
        orbitalPeriod,
        moons,
        image,
        description,
        meanRadius,
        massHTML,
        densityHTML,
        planetRotation: rotation,
        gravityHTML,
        volumeHTML,
        discoveryDate,
        discoverer,
        bodyType,
        perihelion,
        aphelion,
        eccentricity,
        inclination,
        axialTilt,
        avgTempCelsius,
        escapeVelocity
    } = planet


    planetImage.src = "./assets/" + image
    planetName.textContent = pName
    planetDescription.textContent = description
    planetDistance.textContent = distance + " AU"
    planetRadius.textContent = meanRadius
    planetMass.innerHTML = massHTML
    planetDensity.innerHTML = densityHTML
    planetOrbitalPeriod.textContent = orbitalPeriod
    planetRotation.textContent = rotation
    planetMoons.textContent = moons
    planetGravity.innerHTML = gravityHTML
    planetDiscoverer.textContent = discoverer
    planetDiscoveryDate.textContent = discoveryDate
    planetBodyType.textContent = bodyType
    planetVolume.innerHTML = volumeHTML
    planetPerihelion.textContent = perihelion
    planetAphelion.textContent = aphelion
    planetEccentricity.textContent = eccentricity
    planetInclination.textContent = inclination
    planetAxialTilt.textContent = axialTilt
    planetTemp.textContent = avgTempCelsius
    planetEscape.textContent = escapeVelocity
    quickFacts.planetMass.innerHTML = "Mass: " + massHTML
    quickFacts.planetSurfaceGravity.innerHTML = "Surface gravity: " + gravityHTML
    quickFacts.planetDensity.innerHTML = "Density: " + densityHTML
    quickFacts.planetAxialTilt.textContent = "Axial tilt: " + axialTilt
}

const activePlanetGrid = document.querySelector("#planets-grid")

getIt("", "https://solar-system-opendata-proxy.vercel.app/api/planets").then((data) => {
    console.log("----data of planets-----\n", data)
    const results = data.bodies
    const planets = createPlanetsObj(results)
    console.log(planets)

    // تغيير عشان الجدول
    const ref = planets.earth.mass
    for (const one of Object.values(planets)) {
        one.mass = (one.mass / ref).toFixed(2)
    }
    const tableBody = document.querySelector('#planet-comparison-tbody')
    tableBody.innerHTML = "";
    for (const planet of Object.values(planets)) {
        console.log(renderRow(planet))
        tableBody.appendChild(renderRow(planet))
    }
    // الجدول خلص
    // بقية الصفحة
    activePlanetGrid.addEventListener("click", (e) => {
        const targetPlanet = e.target.closest("[data-planet-id]")
        const activePlanet = targetPlanet.getAttribute("data-planet-id")
        renderPlanetPage(planets, activePlanet)
    })
})
