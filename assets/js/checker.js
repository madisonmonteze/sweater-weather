const API_KEY = '7f46449027e8d930fcda9eaf6e7f0df6'

// set constants
const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')
const checkerEl = document.querySelector('.checker')
const clearEl = document.querySelector('.search-clear')


function createChecker (name, temp) {

	// create html element with response
	const check = document.createElement('div')

	// format text
	
	if (temp >= 55 && temp <= 65) {
		var checkContent = document.createTextNode('Yes, it\'s sweater weather in ' + name + ". The current temperature is " + temp + ".")
	} else {
		var checkContent = document.createTextNode('Sorry, it\'s not sweater weather in ' + name + ". The current temperature is " + temp + ".")
	}
	
	// add text to div
	check.appendChild(checkContent)

	// add a new class to the div 
	check.className = "tempCheck"
	
	console.log(check)
	
	// return the div
	return check
}

// when search, show loading spinner by adding class to body
// when successful, change loading hint to say 'clear'
// on fail, let user know there was an error

const toggleLoading = state => {
	// toggle page loading state between on and off
	console.log('we are loading', state)

	if (state) {
		document.body.classList.add('loading')
	} else {
		document.body.classList.remove('loading')
	}


}

const searchWeather = searchTerm => {
	// toggle loading screen on search
	toggleLoading(true)
	
	
	console.log('search for', searchTerm)
	
	// embed API key and search term var 
	fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchTerm}&appid=${API_KEY}`)

	.then(response =>  { 
		// Convert to JSON
		return response.json()
	})
	.then(json => {
		// now it's a JS object
		const name = json.name
		const main = json.main
		const kelvin = main.temp
		const temp = ((kelvin - 273.15) * 9/5 + 32).toFixed(0)
		console.log(name, kelvin, temp)

		const checker = createChecker(name, temp)

		checkerEl.appendChild(checker)

		checker.classList.add('visible')
		
		document.body.classList.add('has-results')

		// change hint text to search again
		hintEl.innerHTML = ''

		toggleLoading(false)

	})
	.catch(error => {

	})
}



// seperate out keyup function 
const doSearch = event => {
	var searchTerm = null

	// check if search input is 5 numbers long
	if (searchEl.length = 5) {
		searchTerm = searchEl.value
		if (event.key === 'Enter') {
			searchWeather(searchTerm)
		}
	}

	// set search hint to show when term is inputted
	if (searchTerm.length > 2) {

		// set text to embed variable as the hint suggestion
		hintEl.innerHTML = `Hit enter to search ${searchTerm}`
		
		// add class to body tag to show the hint
		document.body.classList.add('show-hint')
	} else {
		// otherwise remove class and hide hint
		document.body.classList.remove('show-hint')

	}

	// only run search when search term is a five number zip code
	// if (event.key === 'Enter') {
	// 	searchWeather(searchTerm)
	// }
}

const clearSearch = event => {
	document.body.classList.remove('has-results')
	checkerEl.innerHTML = ''
	hintEl.innerHTML = ''
	searchEl.value = ''
	searchEl.focus()
}

// listen for keyup event on search input
searchEl.addEventListener('keyup', (doSearch))
clearEl.addEventListener('click', clearSearch)
