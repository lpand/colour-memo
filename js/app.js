/* NB
 * Assolutamente da migliorare il fatto che i quadrati
 * cliccati s'illuminano anche durante l'esecuzione 
 * della sequenza.
 */

"use strict";

var doc = document
var cont = doc.getElementById('container')
var elems = cont.querySelectorAll('a')
var ctx = new webkitAudioContext()
var nodes = []
for (var i = 0; i < 4; ++i) { 

	nodes[i] = {}
	nodes[i].colour = elems[i]
	nodes[i].sound = ctx.createOscillator()
	nodes[i].sound.type = 3

}

nodes[0].sound.frequency.value = 330
nodes[1].sound.frequency.value = 370
nodes[2].sound.frequency.value = 392
nodes[3].sound.frequency.value = 415

var seq = new SquareSeq({ elems: nodes })

var player = new Player(seq)
