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
    layer.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})` // Maintain the scale
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
    document.querySelector(".container").style.pointerEvents = "auto"
  })
