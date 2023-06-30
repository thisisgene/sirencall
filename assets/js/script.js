// const img = document.getElementById("background-image")
// var imgLoader = new Image()
// imgLoader.src = img.getAttribute("src")
// imgLoader.onload = function () {
//   console.log("imgLoader complete")
//   const imgSrc = img.getAttribute("src")
//   const body = document.querySelector("body")
//   body.style.backgroundImage = `url(${imgSrc})`
//   body.classList.add("bg-loaded")
// }

// const video = document.getElementById("background-video")
// video.playbackRate = 0.8

// Values to control amount of movement in each layer
const movementFactor = {
  layer1: -1.4, // moves the least
  layer2: 2.2,
  layer3: 0.3, // moves the most
  fog: 0.5,
  layer4: 0.01,
}

const scale = 1.04 // Set the scale factor here

window.onload = function () {
  // Scale the layers when the page is loaded
  const layers = document.querySelectorAll("#parallax .layer")
  layers.forEach((layer) => {
    layer.style.transform = `scale(${scale})`
  })
}

document.addEventListener("mousemove", function (e) {
  const layers = document.querySelectorAll("#parallax .layer")
  layers.forEach((layer) => {
    const depth = movementFactor[layer.id] // Get layer id
    const moveX = (e.clientX * depth) / 100
    const moveY = (e.clientY * depth) / 100
    layer.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})` // Maintain the scale
  })
})

function handleDeviceOrientation(event) {
  const layers = document.querySelectorAll("#parallax .layer")
  layers.forEach((layer) => {
    const depth = movementFactor[layer.id] // Get layer id
    const moveX = (event.gamma * depth) / 100
    const moveY = (event.beta * depth) / 100
    layer.style.transform = `translate(${moveX * 10}px, ${
      moveY * 3
    }px) scale(${scale})` // Maintain the scale
  })
}

// Check if the DeviceOrientationEvent API is available
if (
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  // iOS 13+ and some latest Android devices

  // Button to request permission
  const button = document.createElement("button")
  button.innerText = "Enable Gyroscope"
  document.body.appendChild(button)

  button.addEventListener("click", function () {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          // Permission granted
          window.addEventListener(
            "deviceorientation",
            handleDeviceOrientation,
            true
          )
        }
      })
      .catch(console.error)
  })
} else {
  // Other devices
  window.addEventListener("deviceorientation", handleDeviceOrientation, true)
}

document
  .querySelector(".title-image")
  .addEventListener("animationend", function () {
    document.querySelector("#container1").style.pointerEvents = "auto"
  })

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: "OQTTZwLRB2A",
    playerVars: {
      playsinline: 1,
      autoplay: 0, // Don't autoplay the video initially
      controls: 1, // Don't show controls
      showinfo: 0, // Don't show video info
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerStateChange(event) {
  // Here you can handle player state changes, if necessary
}

const container1 = document.getElementById("container1")
const container2 = document.getElementById("container2")
const container3 = document.getElementById("container3")

// move camera up
document.querySelector("#change-video").addEventListener("click", function () {
  // Begin the fade out of the first video and fade in of the second video
  let video1 = document.querySelector("#video1")
  let video2 = document.querySelector("#video2")
  video1.style.opacity = "0"
  video2.style.opacity = "1"
  video2.playbackRate = 1.3
  video2.play()

  // Move out the first container
  let container1 = document.querySelector("#container1")
  // document.querySelector("#layer2").classList.remove("layer")
  document.querySelector("#layer2").classList.add("to-left")
  document.querySelector("#layer3").classList.add("to-right")
  container1.style.animation = "move-out 2s forwards"
  container1.addEventListener(
    "animationend",
    function () {
      container2.style.display = "flex"
      container2.style.animation = "move-in 2s"
      container2.style.pointerEvents = "auto"
    },
    { once: true }
  ) // Remove the event listener after it has been called once
  container2.addEventListener(
    "animationend",
    function () {
      container2.style.animation = "fade-in-background .5s forwards"
      player.playVideo()
    },
    { once: true }
  ) // Remove the event listener after it has been called once
})

document
  .querySelector("#reverse-button")
  .addEventListener("click", function () {
    // Restart and fade in the first video
    let video1 = document.querySelector("#video1")
    let video2 = document.querySelector("#video2")
    video2.pause()
    video2.currentTime = 0
    video2.style.opacity = "0"
    video1.style.opacity = "1"
    video1.playbackRate = 1.8
    video1.play()

    // Move out the second container
    // document.querySelector("#youtube-video").src += "&autoplay=0"
    player.stopVideo()

    container2.style.animation = "fade-out-background .5s forwards"
    container2.addEventListener(
      "animationend",
      function () {
        container2.style.animation = "move-out-up 2s forwards"
        container1.style.display = "flex"
        container1.style.animation = "move-in-up 2s"
        container1.style.pointerEvents = "auto"
        document.querySelector("#layer2").classList.remove("to-left")
        document.querySelector("#layer3").classList.remove("to-right")
        container2.addEventListener("animationend", function () {}, {
          once: true,
        }) // Remove the event listener after it has been called once
      },
      { once: true }
    )
  })

// Get the button
const streamingButton = document.getElementById("streaming-button")

streamingButton.addEventListener("click", function () {
  // Move container1 up
  container1.style.animation = "move-out-up 1s forwards"

  container3.style.display = "block"
  container3.style.pointerEvents = "auto"
  container3.style.animation = "move-in-up 1s forwards"
})

const backUpButton = document.getElementById("back-up-button")

backUpButton.addEventListener("click", function () {
  container3.style.animation = "move-out 1s forwards"

  container1.style.display = "flex"
  container1.style.animation = "move-in 1s forwards"
})
