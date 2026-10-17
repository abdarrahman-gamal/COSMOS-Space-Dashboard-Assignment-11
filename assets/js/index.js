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
    console.log(DateToTurn)
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

    activate: (nameOfEle) => {
        if (nameOfEle === undefined) { return }
        const sidebarEle = document.querySelector(`a[data-section="${nameOfEle}"]`)
        const sectionEle = document.querySelector(`#${nameOfEle}`)

        sidebarEle.classList.add("bg-blue-500/10", "text-blue-400")
        sidebarEle.classList.remove("text-slate-300", "hover:bg-slate-800")

        sectionEle.classList.remove("hidden")
        activeElement.lastActiveEle = nameOfEle
    }

}

document.addEventListener("DOMContentLoaded", () => {
    activeElement.deActivate(activeElement.lastActiveEle)
    activeElement.activate("today-in-space")
})

document.body.addEventListener("click", (e) => {
    console.log(e.target.closest("a"))
    clickedEle = e.target.closest("a")
    targetAtt = clickedEle.getAttribute("data-section")
    sideLinks = ["today-in-space", "launches", "planets"]
    if (sideLinks.includes(targetAtt)) {
        activeElement.deActivate(activeElement.lastActiveEle)
        activeElement.activate(targetAtt)
    }
})

// سحب محتوى صفحة الرحلات 



results = {
    "id": "69ebbcd2-b257-4070-9ef9-21e7d1f8a883",
    "url": "https://lldev.thespacedevs.com/2.3.0/launches/69ebbcd2-b257-4070-9ef9-21e7d1f8a883/",
    "name": "H3-24 | Martian Moons eXploration (MMX)",
    "response_mode": "normal",
    "slug": "h3-24-martian-moons-exploration-mmx", //اول شيئ اريده 1
    "launch_designator": null,
    "status": {
        "id": 1,
        "name": "Go for Launch",
        "abbrev": "Go", // سأستخدم هذا 0
        "description": "Current T-0 confirmed by official or reliable sources."
    },
    "last_updated": "2026-10-10T06:02:48Z",
    "net": "2026-10-19T19:41:03Z",
    "net_precision": {
        "id": 0,
        "name": "Second",
        "abbrev": "SEC",
        "description": "The T-0 is accurate to the second."
    },
    "window_end": "2026-10-19T19:41:03Z",
    "window_start": "2026-10-19T19:41:03Z", // سأستخدم هذا 6
    "image": {
        "id": 2493,
        "name": "H3-24 liftoff (HTV-X1)",
        "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/h3-24_liftoff__image_20251028184029.jpeg", // سأستخدم هذا 10
        "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/h3-24_liftoff__image_thumbnail_20251028184029.jpeg",
        "credit": "Mitsubishi Heavy Industries",
        "license": {
            "id": 1,
            "name": "Unknown",
            "priority": 9,
            "link": null
        },
        "single_use": false,
        "variants": []
    },
    "infographic": null,
    "probability": null,
    "weather_concerns": null,
    "failreason": "",
    "hashtag": null,
    "launch_service_provider": {
        "response_mode": "list",
        "id": 98,
        "url": "https://lldev.thespacedevs.com/2.3.0/agencies/98/",
        "name": "Mitsubishi Heavy Industries", // سأستخدم هذا 2
        "abbrev": "MHI",
        "type": {
            "id": 3,
            "name": "Commercial"
        }
    },
    "rocket": {
        "id": 7769,
        "configuration": {
            "response_mode": "list",
            "id": 204,
            "url": "https://lldev.thespacedevs.com/2.3.0/launcher_configurations/204/",
            "name": "H3-24", // سأستخدم هذا 3
            "families": [
                {
                    "response_mode": "list",
                    "id": 86,
                    "name": "H3"
                }
            ],
            "full_name": "H3-24",
            "variant": "24"
        }
    },
    "mission": {
        "id": 6287,
        "name": "Martian Moons eXploration (MMX)",
        "type": "Planetary Science",
        "description": "MMX is a Japanese scientific mission to land on Phobos, one of the two moons of Mars, to collect samples before bringing them back to Earth.\r\n\r\nThe mission includes a small French/German rover to explore the surface of Phobos.",
        "image": null,
        "orbit": {
            "id": 19,
            "name": "Mars Orbit",
            "abbrev": "Mars",
            "celestial_body": {
                "response_mode": "list",
                "id": 1,
                "name": "Earth"
            }
        },
        "agencies": [],
        "info_urls": [],
        "vid_urls": []
    },
    "pad": {
        "id": 209,
        "url": "https://lldev.thespacedevs.com/2.3.0/pads/209/",
        "active": true,
        "agencies": [
            {
                "response_mode": "normal",
                "id": 37,
                "url": "https://lldev.thespacedevs.com/2.3.0/agencies/37/",
                "name": "Japan Aerospace Exploration Agency",
                "abbrev": "JAXA",
                "type": {
                    "id": 1,
                    "name": "Government"
                },
                "featured": true, //سأستخدم هذا 01
                "country": [
                    {
                        "id": 28,
                        "name": "Japan",
                        "alpha_2_code": "JP",
                        "alpha_3_code": "JPN",
                        "nationality_name": "Japanese",
                        "nationality_name_composed": "Nippo"
                    }
                ],
                // سأستخدم هذا 9
                "description": "The Japan Aerospace Exploration Agency (JAXA) is Japan's national aero-space agency. Through the merger of three previously independent organizations, JAXA was formed on 1 October 2003. JAXA is responsible for research, technology development and the launch of satellites into orbit, and is involved in many more advanced missions, such as asteroid exploration and possible manned exploration of the Moon. JAXA launch their Epsilon vehicle from the Uchinoura Space Center and their H-II vehicles from the Tanegashima Space Center.",
                "administrator": "Administrator: Hiroshi Yamakawa",
                "founding_year": 2003,
                "launchers": "H-II",
                "spacecraft": "",
                "parent": null,
                "image": {
                    "id": 16,
                    "name": "[AUTO] Japan Aerospace Exploration Agency - image",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/japan2520aerospace2520exploration2520agency_image_20190207032440.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184621.jpeg",
                    "credit": null,
                    "license": {
                        "id": 1,
                        "name": "Unknown",
                        "priority": 9,
                        "link": null
                    },
                    "single_use": true,
                    "variants": []
                },
                "logo": {
                    "id": 151,
                    "name": "[AUTO] Japan Aerospace Exploration Agency - logo",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/japan2520aerospace2520exploration2520agency_logo_20190207032440.png",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305185023.png",
                    "credit": null,
                    "license": {
                        "id": 1,
                        "name": "Unknown",
                        "priority": 9,
                        "link": null
                    },
                    "single_use": true,
                    "variants": []
                },
                "social_logo": {
                    "id": 69,
                    "name": "[AUTO] Japan Aerospace Exploration Agency - social_logo",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/japan2520aerospace2520exploration2520agency_nation_20230531052930.png",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/255bauto255d__image_thumbnail_20240305184813.png",
                    "credit": null,
                    "license": {
                        "id": 1,
                        "name": "Unknown",
                        "priority": 9,
                        "link": null
                    },
                    "single_use": true,
                    "variants": []
                }
            }
        ],
        "name": "Yoshinobu Launch Complex LP-2",
        "image": {
            "id": 1751,
            "name": "H-IIB 304 liftoff from LP-2 (HTV-3)",
            "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/h-iib_304_lifto_image_20240325125154.jpg",
            "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/h-iib_304_lifto_image_thumbnail_20240325125154.jpeg",
            "credit": "JAXA",
            "license": {
                "id": 9,
                "name": "JAXA Image Usage Policy",
                "priority": 8,
                "link": "https://global.jaxa.jp/policy.html"
            },
            "single_use": false,
            "variants": []
        },
        "description": "",
        "info_url": null,
        "wiki_url": "https://en.wikipedia.org/wiki/Yoshinobu_Launch_Complex",
        "map_url": "https://www.google.com/maps?q=30.400938,130.97564",
        "latitude": 30.400938,
        "longitude": 130.97564,
        "country": {
            "id": 28,
            "name": "Japan", //سأستخدم هذا 8
            "alpha_2_code": "JP",
            "alpha_3_code": "JPN",
            "nationality_name": "Japanese",
            "nationality_name_composed": "Nippo"
        },
        "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/pad_yoshinobu_launch_complex_lp-2_20230707124715.jpg",
        "total_launch_count": 18,
        "orbital_launch_attempt_count": 18,
        "fastest_turnaround": "P57DT1H51M15S",
        "location": {
            "response_mode": "normal",
            "id": 26,
            "url": "https://lldev.thespacedevs.com/2.3.0/locations/26/",
            "name": "Tanegashima Space Center, Japan", // سأستخدم هذا 7
            "celestial_body": {
                "response_mode": "normal",
                "id": 1,
                "name": "Earth",
                "type": {
                    "id": 1,
                    "name": "Planet"
                },
                "diameter": 12742000.0,
                "mass": 5.972168e+24,
                "gravity": 9.80655,
                "length_of_day": "1 00:00:00",
                "atmosphere": true,
                "image": {
                    "id": 2040,
                    "name": "Earth (Apollo 17)",
                    "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_20240402194304.jpeg",
                    "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/earth_2528apol_image_thumbnail_20240402194305.jpeg",
                    "credit": "NASA",
                    "license": {
                        "id": 4,
                        "name": "NASA Image and Media Guidelines",
                        "priority": 0,
                        "link": "https://www.nasa.gov/nasa-brand-center/images-and-media/"
                    },
                    "single_use": true,
                    "variants": []
                },
                "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
                "wiki_url": "https://en.wikipedia.org/wiki/Earth",
                "total_attempted_launches": 7636,
                "successful_launches": 7079,
                "failed_launches": 557,
                "total_attempted_landings": 1377,
                "successful_landings": 1328,
                "failed_landings": 49
            },
            "active": true,
            "country": {
                "id": 28,
                "name": "Japan",
                "alpha_2_code": "JP",
                "alpha_3_code": "JPN",
                "nationality_name": "Japanese",
                "nationality_name_composed": "Nippo"
            },
            "description": "The Tanegashima Space Center is the largest rocket-launch complex in Japan. It is located on the southeastern tip of Tanegashima, an island located south of Kyushu, an island and region and Japan. It was established in 1969 when the National Space Development Agency of Japan (NASDA) was formed, and is now run by JAXA. The activities that take place at TNSC include assembly, testing, launching, and tracking satellites, as well as rocket engine firing tests.",
            "image": {
                "id": 2223,
                "name": "Tanegashima Space Center",
                "image_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/tanegashima_spa_image_20240920081514.jpg",
                "thumbnail_url": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/images/tanegashima_spa_image_thumbnail_20240920081514.jpeg",
                "credit": "JAXA",
                "license": {
                    "id": 9,
                    "name": "JAXA Image Usage Policy",
                    "priority": 8,
                    "link": "https://global.jaxa.jp/policy.html"
                },
                "single_use": true,
                "variants": []
            },
            "map_image": "https://thespacedevs-dev.nyc3.digitaloceanspaces.com/media/map_images/location_26_20200803142507.jpg",
            "longitude": 130.97,
            "latitude": 30.4,
            "timezone_name": "Asia/Tokyo",
            "total_launch_count": 99,
            "total_landing_count": 0
        }
    },
    "webcast_live": false,
    "program": [],
    "orbital_launch_attempt_count": 7416,
    "location_launch_attempt_count": 100,
    "pad_launch_attempt_count": 19,
    "agency_launch_attempt_count": 59,
    "orbital_launch_attempt_count_year": 243,
    "location_launch_attempt_count_year": 3,
    "pad_launch_attempt_count_year": 3,
    "agency_launch_attempt_count_year": 3
}


const thisDay = new Date()
const lunchDate = new Date(results.window_start)
// التاريخ فقط
const optionsDate = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }
const lunchDateDate = lunchDate.toLocaleDateString(undefined, optionsDate)
// الوقت فقط
const optionsTime = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }
const lunchDateTime = lunchDate.toLocaleTimeString(undefined, optionsTime).concat(" UTC")
//الوقت المتبقي
const remainingTime = ((lunchDate.getTime() - thisDay.getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)





finalRes = {
    abbrev: results.status.abbrev,
    featured: results.pad.agencies[0].featured,
    imageUrl: results.image.image_url,
    name: results.name,
    serviceProvider: results.launch_service_provider.name,
    rocket: results.rocket.configuration.name,
    lunchDate: lunchDateDate,
    lunchTime: lunchDateTime,
    location: results.pad.location.name,
    country: results.pad.country.name,
    description: results.mission.description,
    remainingTime: remainingTime
}
console.log(finalRes)


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

comingImg.src = finalRes.imageUrl
finalRes.featured || featured.remove()
comingName.lastChild.textContent = finalRes.name
comingAbbrev.lastChild.textContent = finalRes.abbrev
serviceProvider.lastChild.textContent = finalRes.serviceProvider
rocket.lastChild.textContent = finalRes.rocket
daysUntilLaunch.lastChild.textContent = finalRes.remainingTime
lunchDateTag.lastChild.textContent = finalRes.lunchDate
lunchTime.lastChild.textContent = finalRes.lunchTime
locationTag.lastChild.textContent = finalRes.location
country.lastChild.textContent = finalRes.country
description.lastChild.textContent = finalRes.description


