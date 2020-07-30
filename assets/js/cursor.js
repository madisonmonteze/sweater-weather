// set contsants / variables
const cursor = document.querySelector("div.cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")


let isMouseDown = false

// on click, make cursor size bigger
const growCursor = function () {
	cursor.classList.add("is-down")
	// cursor.innerHTML = `<span>Let go</span>`
}

// on release, return cursor to original size
const shrinkCursor = function () {
	cursor.classList.remove("is-down")
}

// move cursor based on mouse coordinates
const moveCursor = function (x,y) {
	cursor.style.left = x + "px"
	cursor.style.top = y + "px"
}

const setupCanvas = function (canvas) {
	const w = window.innerWidth
	const h = window.innerHeight
	const dpi = window.devicePixelRatio

	canvas.width = w * dpi
	canvas.height = h * dpi
	canvas.style.width = w + "px"
	canvas.style.height = h + "px"

	// canvas context
	const context = canvas.getContext("2d")
	context.scale(dpi, dpi)

	if (canvas.classList.contains("in")) {
		context.fillStyle = "#4A4A4A"
		context.strokeStyle = "#ffffff"
	} else {
		context.fillStyle = "#ffffff"
		context.strokeStyle = "#4A4A4A"
	}


	context.lineWidth = 80
	context.lineCap = "round"
	context.lineJoin = "round"

	context.shadowBlur = 10
	context.shadowColor = "#4A4A4A"

	context.rect(0,0, w, h)
	context.fill()

}

// start to draw, change color, based on canvas, x, y
const startDraw = function (canvas, x, y) {
	const context = canvas.getContext("2d")
	context.moveTo(x,y)
}


// drawing based on canvas, x, y
const moveDraw = function (canvas, x, y) {
	const context = canvas.getContext("2d")

	if (isMouseDown) {
		context.lineTo(x,y)
		context.stroke()
	}	
}



setupCanvas(canvasIn)
setupCanvas(canvasOut)

document.addEventListener("mousedown", function (e) {
	isMouseDown = true
	growCursor()
	startDraw(canvasIn, e.pageX, e.pageY)
	startDraw(canvasOut, e.pageX, e.pageY)
})

document.addEventListener("mouseup", function () {
	isMouseDown = false
	shrinkCursor()
})


document.addEventListener("mousemove", function (e) {
	console.log(e)
	// e.pageX => where mouse is on x-axis
	// e.pageY => where mouse is on y-axis

	moveCursor(e.pageX, e.pageY)
	moveDraw(canvasIn, e.pageX, e.pageY)
	moveDraw(canvasOut, e.pageX, e.pageY)
})

window.addEventListener("resize", function () {
	setupCanvas(canvasIn)
	etupCanvas(canvasOut)	
})