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

