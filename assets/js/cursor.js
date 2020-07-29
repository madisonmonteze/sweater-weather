// set cursor as a variable
const cursor = document.querySelector("div.cursor");

// on click, make cursor size bigger
const growCursor = function () {
	cursor.classList.add("is-down")
}

// on release, return cursor to original size
const shrinkCursor = function () {
	cursor.classList.remove("is-down")
}

growCursor()
shrinkCursor()