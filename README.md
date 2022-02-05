# Calculator app solution - Frontend Mentor

Esta es una solución al [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

## Tabla de contenido

- [Descripción general](#descripción-general)
  - [Challenge](#challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Mi proceso](#mi-proceso)
  - [Construido con](#construido-con)
  - [Que aprendí](#que-aprendí)
  - [Desarrollo continuo](#desarrollo-continuo)
  - [Recursos útiles](#recursos-útiles)
- [Autor](#autor)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Descripción general

### Chalenge

Los usuarios deben ser capaces de:

- Vea cómo se ajusta el tamaño de los elementos según el tamaño de la pantalla de su dispositivo
- Realizar operaciones matemáticas como suma, resta, multiplicación y división.
- Ajuste el tema de color según su preferencia
- **Bonificación**: verifique su preferencia de tema inicial usando `prefers-color-scheme` y guarde cualquier cambio adicional en el navegador

### Screenshot

![](./images/screenshot.png)

### Links

- Solución URL: [github.com/PabloTachella/calculator-app-main](https://github.com/PabloTachella/calculator-app-main)
- Sitio web URL: [pablotachella.github.io/calculator-app-main/](https://pablotachella.github.io/calculator-app-main/)

## Mi proceso

### Construido con

- HTML5
- Metodología BEM
- Flexbox
- CSS Grid
- CSS media queries
- Vanilla JS

**Nota: toda la lógica, algoritmos y decisiones en el proyecto son de mi autoría, no contiene nada de código copiado**

### Que aprendí

En este reto implementé la metodología BEM (b-block__element_mod), con la que te olvidas por completo de los problemas de especificidad.
El prefijo b significa "bloque" y es el predeterminado en muchas implementaciones de BEM.
```html
<h1 class="b-head__title">calc</h1>

<body class="b-body_theme_blue"> 
```
Incluso manipulando el DOM con JS, BEM puede proporcionarnos un nombre de clase único o no (según el caso de uso) con el que acceder a los elementos HTML sin necesidad de asignar un ID.

```js
// alternative to get an element from the DOM
// the BEM methodology allows to know which element is being brought
const screenContainer = document.querySelector('.b-screen')
```

### Desarrollo continuo

Completar este reto me ayudó a poner en práctica varios conocimientos y me motivó a seguir realizando ejercicios prácticos para afrontar nuevos retos y tener un mejor portfolio.

### Recursos útiles

- [www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/) - Este recurso contiene información sobre como implementar la metodología BEM
- [marabelia.com/css-font-size-responsive/](https://marabelia.com/css-font-size-responsive/) - Abordar la unidad de medida escalable 'EM', Me ayudó a encontrar una alternativa para manipular el tamaño de fuente desde JS que afecta a cualquier tamaño de pantalla.

## Autor

- Website - [Pablo Tachella](https://pablotachella.github.io/)
- Platzi Profile - [@PabloTachella](https://platzi.com/p/tachella/)
