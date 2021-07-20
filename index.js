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
// alternative to get an element from the DOM
// the BEM methodology allows to know which element is being brought
const screenContainer = document.getElementsByClassName('b-screen')[0]

let string1 = ''
let string2 = ''
let fullString = ''
let operator = ''
let result = ''

// Buttons with this function ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
function inputValue(input) {
	// If an operator has not been entered it will be written in String1
	if (operator == '') {
		string1 = addValue(string1, input)
		screen.textContent = string1
	} else {
		// if an operator has been entered but Result has a value
		// Result will be String1
		if(result !== ''){
			string1 = result
		}
		// Write in String2
		string2 = addValue(string2, input)
		screen.textContent = addValue(fullString, string2)
	}
}

// Buttons with this function ['+', '-', 'x', '/']
function inputOperator(input) {
	operator = input
	// After obtaining a result an operator is entered
	if (result !== '' && string1 == '') {
		fullString = `${result} ${operator} `
	} else {
		// After obtaining a result a new String1 is entered
		fullString = `${string1} ${operator} `
		// Important to reset Result so it doesn't overwrite String1 
		result = ''
	}
	screen.textContent = fullString
}

// Button with this function ['=']
function inputEqual() {
	result = solveCalculation(string1, string2, operator)
	if(result == 'error') {
		result = ''
	} else {		
		screen.textContent = result 
		reset()
	}
}

// Button with this function ['RESET']
function inputReset() {
	reset(true)
}

// Button with this function ['DEL']
function inputDel() {
	// Only delete characters from String1 and String2
	if(string2 !== ''){
		string2 = string2.substring(0, string2.length -1)
		screen.textContent = addValue(fullString, string2)
	} else if(operator == ''){
		if(string1 !== '') {
			string1 = string1.substring(0, string1.length -1)
			screen.textContent = string1
		}
	}
	if(string1.length + string2.length + 2 >= 13){
		if(string1.length + string2.length + 2 == 13) {
			screenContainer.style.fontSize = '40px'
		}
	}
}

// Concatenate a new value to a string
function addValue(valueString, value) {
	if(valueString.length >= 11 || fullString.length >=11){
		screenContainer.style.fontSize = '30px'
	}
	valueString = `${valueString}${value}`
	return valueString
}

function solveCalculation(value1, value2, operator) {
	if(value1 !== '' & value2 !== '' & operator !== '') {
		value1 = parseFloat(value1)
		value2 = parseFloat(value2)
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
	} else {
		return 'error'
	}
}


function reset(extrict) {
	string1 = ''
	string2 = ''
	operator = ''
	fullString = ''
	screenContainer.style.fontSize = '40px'
	if(extrict){
		result = ''
		screen.textContent = 0
	} 
}