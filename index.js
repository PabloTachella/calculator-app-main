/** ----------- SELECTOR DE TEMA ----------- */

const radioButtons = [...document.querySelectorAll('.b-switch__radio')]
const [radioThemeBlue, radioThemeWhite, radioThemePurple] = [...radioButtons]
const calculator = document.body

const themes = ['b-body_theme_blue', 'b-body_theme_white', 'b-body_theme_purple']
const [classThemeBlue, classThemeWhite, classThemePurple] = [...themes]

radioButtons.forEach(radio => radio.addEventListener("click", selectTheme, false))

function selectTheme() {
	if (radioThemeBlue.checked) {
		if (!calculator.classList.contains(classThemeBlue)) {
			applayClass(classThemeBlue)
		}
	} else if (radioThemeWhite.checked) {
		if (!calculator.classList.contains(classThemeWhite)) {
			applayClass(classThemeWhite)
		}
	} else if (radioThemePurple.checked) {
		if (!calculator.classList.contains(classThemePurple)) {
			applayClass(classThemePurple)
		}
	}
}

function applayClass(classTheme) {
	calculator.classList.remove(...themes)
	calculator.classList.add(classTheme)
}

radioThemeBlue.checked = true
selectTheme()

/* -------- CALCULADORA ---------- */

const screen = document.querySelector('#screen')
const screenContainer = document.querySelector('.b-screen') // Utilizado para adaptar fontSize.
const buttons = document.querySelectorAll('button')

// 40px es el fontSize inicial, necesito establecerlo como un string para luego poder manipularlo.
screenContainer.style.fontSize = '40px'

let firstValue = ''
let secondValue = ''
let operator = ''
let result = ''
let concatenatedValues = ''

const KEYS_THAT_INCREASE_FONT_SIZE = ['=', 'DEL', 'RESET'] // Estos botones pueden hacer necesario
// el incrementar el fontSize cuando ya no se muestran tantos carácteres en pantalla.
const OPERATORS = ['+', '-', 'x', '/']

const calculations = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'x': (a, b) => a * b,
	'/': (a, b) => a / b
}


function performCalculation() {
	let preResult
	firstValue = parseFloat(firstValue)
	secondValue = parseFloat(secondValue)

	preResult = calculations[operator](firstValue, secondValue)

	// Si el resultado es un número decimal me aseguro que no supere los 7 decimales
	// y con parseFloat elimino terminaciones en cero en caso de que ocurra 
	if (!Number.isInteger(preResult)) {
		preResult = parseFloat(preResult.toFixed(7))
	}

	preResult = preResult.toString()
	return preResult
}

// Función para el botón 'RESET'
// Solo se resetea 'result' cuando se presiona la tecla 'RESET', de lo contario
// se conserva para ser utilizado como 'firstValue' en una siguiente operacion
function resetValues(extrict) {
	firstValue = ''
	secondValue = ''
	operator = ''
	concatenatedValues = ''
	if (extrict) {
		result = ''
		screen.textContent = '0'
	}
}

function concatenateValues(valueString, value) {
	valueString = `${valueString}${value}`
	return valueString
}

// Función para el botón 'DEL'
function deleteLastCharacter() {
	// Eliminar solo caracteres de firstValue y secondValue
	if (secondValue !== '') {
		secondValue = secondValue.substring(0, secondValue.length - 1)
		screen.textContent = concatenateValues(concatenatedValues, secondValue)
	} else if (operator == '') {
		if (firstValue !== '') {
			firstValue = firstValue.substring(0, firstValue.length - 1)
			screen.textContent = firstValue
		}
	} // Si secondValue se encuentra vacío y hay un operador no se realiza ninguna acción
	// al presionar 'DEL', para modificar operador basta con presionar el que lo reemplazará,
	// y si se quiere modificar el 'firstValue' habiendo introducido un operador posteriormente,
	// ya sería lo indicado presionar 'RESET'
}

// Función para los botones ['+', '-', 'x', '/']
function inputOperator(key) {
	if (result !== '' && firstValue === '') {
		// Cuando inmediatamente luego de obtener un resultado se ingresa un operador
		operator = key
		concatenatedValues = `${result} ${operator} `
	} else if (secondValue === '') {
		// Cuando solo se ingresó 'firstValue' o luego de obtener un resultado, inmediatamente 
		// se ingresó un nuevo número y seguido de un operador
		operator = key
		concatenatedValues = `${firstValue} ${operator} `
		// Cuando luego de obtener un resultado se ingresó un nuevo número es importante
		// resetear 'result' ya que ya no será usado y causa conflicto en la lógica
		result = ''
	} else {
		// cuando se tiene 'firstValue' y 'secondValue' y se vuelve a presionar un operador
		result = performCalculation()
		resetValues()
		inputOperator(key)
	}

	screen.textContent = `${concatenatedValues} ${secondValue}`
}

function inputValue(key) {
	if (operator == '') {
		// Si no se ha ingresado un operador, se escribirá en 'firstValue'
		firstValue = concatenateValues(firstValue, key)
		screen.textContent = firstValue
	} else {
		// Si se ingresó un operador pero 'result' tiene un valor
		// El resultado será firstValue
		if (result !== '') {
			firstValue = result
		}
		// Escribo en 'secondValue'
		secondValue = concatenateValues(secondValue, key)
		screen.textContent = concatenateValues(concatenatedValues, secondValue)
	}
}

// Se ejecuta al presionar cualquier tecla, y solo ciertas teclas pueden desatar el evento de
// necesitar agrandar el fontSize devido a que reducen el número de carácteres en pantalla
function adjustFontSize(key) {
	// Esto solo funciona porque al inicio del script establecí fontSize como un string
	const fontSize = parseFloat(screenContainer.style.fontSize.toString().replace('px', ''))
	// 50 son los pixeles de pading de screenContainer
	if (screen.clientWidth + 50 >= screenContainer.clientWidth) {
		const newFontSize = fontSize * 0.8
		screenContainer.style.fontSize = `${newFontSize}px`
		adjustFontSize()
	} else if (KEYS_THAT_INCREASE_FONT_SIZE.includes(key) &
		fontSize < 40 &
		screen.clientWidth <= screenContainer.clientWidth) {

		screenContainer.style.fontSize = `40px`
		adjustFontSize()
	} // Es necesaria la recursividad en el llamado hasta que el ajuste sea el esperado y
	// la función ya no entre en los condicionales
}

// Función del evento 'click' en cada botón, recibe el innerText del mismo
function executeInput(key) {
	if (key === 'RESET') {
		resetValues(true)
	} else if (key === 'DEL') {
		deleteLastCharacter()
	} else if (key === '=') {
		// Solo realizaré el cálculo si cuento con todos los parametros necesarios
		// de lo contrario, la tecla '=' fué presionada indevidamente y no debo hacer nada
		if (firstValue !== '' & secondValue !== '' & operator !== '') {
			result = performCalculation()
			screen.textContent = result
			resetValues()
		}
	} else if (OPERATORS.includes(key)) {
		inputOperator(key)
	} else {
		inputValue(key)
	}

	adjustFontSize(key)
}

buttons.forEach(button => button.addEventListener('click', () => executeInput(button.innerText)), false)