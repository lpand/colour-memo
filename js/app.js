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
var _level = 0

for (var i = 0; i < 4; ++i) 
{ 
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

function resetLevel() 
{
    $('#level').html('Level 0')
    _level = 0
}

cont.addEventListener('colourmemo:wrong', function (e) 
{
    var body = doc.body
    var bgColour = window.getComputedStyle(doc.body).backgroundColor
    var mex = doc.createElement('h1')
    var relativePos = $(cont).find('a:first').position()

    resetLevel()

    mex.innerHTML = 'Sbagliato!'
    var s = mex.style
    s.position = "absolute"
    s.top = +relativePos.top - 50 + 'px'
    s.left = relativePos.left + 'px'

    body.appendChild(mex)
    body.style.backgroundColor = 'rgb(255, 0, 0)'

    setTimeout(function () { body.style.backgroundColor = bgColour }, 150)

    setTimeout(function() { body.removeChild(mex) }, 1300)
})

$('#control ul').append('<li id="level">Level '+ _level +'</li>')
cont.addEventListener('colourmemo:rightsequence', function (e) 
{
    $('#level').html('Level '+ ++_level)
})

doc.body.addEventListener('colourmemo:reset', resetLevel)