/* NB
 * Assolutamente da migliorare il fatto che i quadrati
 * cliccati s'illuminano anche durante l'esecuzione 
 * della sequenza.
 */

"use strict";

var doc = document
var cont = doc.getElementById('container')
var elems = cont.querySelectorAll('a')
var game = new ColoursSeq({ elems: elems })
var start = doc.getElementById('start')

var wrong = function () {
	var bgColour = window.getComputedStyle(doc.body).backgroundColor

	doc.body.style.backgroundColor = 'rgb(255, 0, 0)'

	setTimeout(function () { 

		doc.body.style.backgroundColor = bgColour

	}, 100)
}

var cycle = function () { 

	game.run() 

	cont.addEventListener('mouseup', clickListener)

}

var clickListener = function (e) { 

	e.preventDefault()

	if (game.nextColour() !== e.target) {
		
		cont.removeEventListener('mouseup', clickListener)

		wrong()

		game.reset()

		// the game restart after two sec
		setTimeout(function () { cycle() }, 1000)
	}
	// if the played chose the right sequence
	else if (! game.hasColour()) {

		cont.removeEventListener('mouseup', clickListener)

		setTimeout(function () { cycle() }, 1000)
	}

}


start.addEventListener('click', function () { 

	// firefox doesn't support innerText and this is the fastest way.
	start.innerHTML = 'restart'

	game.reset()

	setTimeout(function () { cycle() }, 500)

})

























