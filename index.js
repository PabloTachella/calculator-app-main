/** -----------Theme switch----------- */

const radioThemeBlue = document.getElementById('blue')
const radioThemeWhite = document.getElementById('white')
const radioThemePurple = document.getElementById('purple')
const calculator = document.body

const themes = ['b-body_theme_blue', 'b-body_theme_white', 'b-body_theme_purple']

const classThemeBlue = themes[0]
const classThemeWhite = themes[1]
const classThemePurple = themes[2]

radioThemeBlue.checked = true

function selectTheme() {
  if(radioThemeBlue.checked) { 
		if(!calculator.classList.contains(classThemeBlue)) {
			applayClass(classThemeBlue)
		}
	} else if(radioThemeWhite.checked) {
		if (!calculator.classList.contains(classThemeWhite)) {
			applayClass(classThemeWhite)
		}
	} else if(radioThemePurple.checked){
		if (!calculator.classList.contains(classThemePurple)) {
			applayClass(classThemePurple)
		}
	}
}

function applayClass(classTheme) {
	calculator.classList.remove(...themes)
	calculator.classList.add(classTheme)
}

selectTheme()

/** --------Calculator functionality---------- */

const screen = document.getElementById('screen')

let string1 = ''
let string2 = ''
let fullString = ''
let operator = ''
let result = ''

function inputValue(input) {
	if (operator == '') {
		string1 = addValue(string1, input)
		screen.textContent = string1
	} else {
		if(result !== ''){
			string1 = result
		}
		string2 = addValue(string2, input)
		screen.textContent = addValue(fullString, string2)
	}
}

function inputOperator(input) {
	operator = input
	if (result !== '' && string1 == '') {
		fullString = `${result} ${operator} `
	} else {
		fullString = `${string1} ${operator} `
		result = ''
	}
	screen.textContent = fullString
}

function inputEqual() {
	string1 = parseFloat(string1)
	string2 = parseFloat(string2)
	result = solveCalculation(string1, string2, operator)
	screen.textContent = result 
	reset()
}

function inputReset() {
	reset('extrict')
}

function inputDel() {
	if(string2 !== ''){
		string2 = string2.substring(0, string2.length -1)
		screen.textContent = addValue(fullString, string2)
	} else if(operator == ''){
		if(string1 !== '') {
			string1 = string1.substring(0, string1.length -1)
			screen.textContent = string1
		}
	}
}

function addValue(valueString, value) {
	valueString = `${valueString}${value}`
	return valueString
}

function solveCalculation(value1, value2, operator) {
	switch(operator) {
		case '+':
			return value1 + value2
		case '-':
			return value1 - value2
		case '/':
			return value1 / value2
		case 'x':
			return value1 * value2
	}
}

function reset(extrict) {
	string1 = ''
	string2 = ''
	operator = ''
	fullString = ''
	if(extrict){
		result = ''
		screen.textContent = 0
	} 
}