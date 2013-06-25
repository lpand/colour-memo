
var Player = (function () {

	var doc = document
	var cont = doc.getElementById('container')
	var start = doc.getElementById('start')
	var volume = doc.getElementById('volume')
	var touchstart = 'touchstart'
	var touchend = 'touchend'

	function Player (squareSeq) {

		var sound
		var self = this

		this._sSeq = squareSeq

		sound = this._sSeq.sqrs[0].sound
		this._volume = sound.context.createGain()
		this._volume.gain.value = 0.1
		this._volume.connect(this._volume.context.destination)

		this._isMute = false

		this._clickListener = this._clickCb.bind(this)

		this._timeouts = []

		start.addEventListener(touchend, function () { 

			for (var i = 0, len = self._timeouts.length; i < len; ++i)
				window.clearTimeout(self._timeouts[i])

			// firefox doesn't support innerText and this is the fastest way.
			start.innerHTML = 'restart'

			self._sSeq.reset()

			cont.removeEventListener(touchend, this._clickListener)

			setTimeout(function () { self._cycle() }, 1000)

		})


		volume.addEventListener(touchend, function (e) {

			// e.preventDefault()

			if (e.target.getAttribute('data-icon') == volumeIconsCodes.unmuted) {
				
				self.mute()
				
				e.target.setAttribute('data-icon', volumeIconsCodes.muted)

			} else {

				self.unmute()

				e.target.setAttribute('data-icon', volumeIconsCodes.unmuted)		
			
			}
		})

		cont.addEventListener(touchstart, function (e) {

			if (self._isMute || e.target === cont) return

			var sound = self._sSeq.soundOf(e.target)

			if (sound) {

				sound.connect(self._volume)

				setTimeout(function () {

					sound.disconnect(self._volume)

				}, self._sSeq.glareInterval)
			}

		})

	}

	Player.prototype = {

		_play: function () {

			var sIt = this._sSeq.iter()
			var i = 0
			var self = this

			self.timeouts = []

			while (sIt.hasSquare()) {

				self._timeouts.push(+function () {
					
					var s = sIt.nextSquare()
					var c = 'glare-'+ s.colour.id

					return setTimeout(function () {

						s.colour.classList.add(c)
						self._isMute || s.sound 
										&&	s.sound.connect(self._volume)
						
						setTimeout(function () {

							s.colour.classList.remove(c)
							self._isMute || s.sound
										&& s.sound.disconnect(self._volume)

						}, self._sSeq.glareInterval) // soon as possible

					}, self._sSeq.gap * i++)					
				}())
			}
		},

		unmute: function () {

			this._isMute = false

		},

		mute: function () {
			
			this._isMute = true

		},

		_cycle: function () { 

			var self = this
			var it

			this._sSeq.append() 

			this._play()

			this._it = this._sSeq.iter()

			cont.addEventListener(touchend, this._clickListener)

		},

		_clickCb: function (e) { 

			if (e.target === cont) return

			var self = this
			var sq = this._it.nextSquare()

			// if the player chose the right colour and the seq isn't
			// completed yet, do nothing.
			if (sq && sq.colour !== e.target) {
				
				cont.removeEventListener(touchend, this._clickListener)

				this._wrong()

				this._sSeq.reset()

				// the game restart after one sec
				setTimeout(function () { self._cycle() }, 1000)
			}
			// if the played chose the right sequence
			else if (! this._it.hasSquare()) {

				cont.removeEventListener(touchend, this._clickListener)

				setTimeout(function () { self._cycle() }, 1000)
			}

		},

		_wrong: function () {
		
			var bgColour = window.getComputedStyle(doc.body).backgroundColor

			doc.body.style.backgroundColor = 'rgb(255, 0, 0)'

			setTimeout(function () { 

				doc.body.style.backgroundColor = bgColour

			}, 150)
		}		

	} /* Player.prototype */

	return Player
})()



