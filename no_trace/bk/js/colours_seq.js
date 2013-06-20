var ColoursSeq = (function () {

	/**
	Handles the colour sequece, initially empty.

	@class
	@constructor

	@param {Object} opts
		@param {Array} elems Four `Element` objects.
		@param {Number} [colourRepeat=3] Maximum times a colour is repeated in row. 
		@param {Number} [maxLength=25] Maximum number of colours into a sequence. 
		@param {Number} [glareInterval] Period of time, in ms,  of a square's glare.
		@param {Number} [gap] Period of time, in ms, between two glares.
		@param {Function} [cb] - callback called when the user overcome the last sequece.
	**/
	function ColoursSeq (opts) {

		if (!opts || !opts.elems || opts.elems.length != 4)
			return

		this._els = opts.elems

		/**

		@property colourRepeat
		@type Number
		@default 3
		**/
		this.colourRepeat = opts.colourRepeat || 3

		/**

		@property maxLength
		@type Number
		@default 25
		**/
		this.maxLength = opts.maxLength || 25

		this._cb = opts.cb //|| function () {}

		this._seq = [] // a seq of numbers between 0 and 3

		// elem of the seq that should be played by the player
		this._actualElIndex = -1

		/**

		@property glareInteral
		@type Number
		@default 300
		**/
		this.glareInterval = opts.glareInterval || 300

		/**
		Given by the sum of `glareInterval` and the submitter value.

		@property gap
		@type Number
		@default `this.glareInterval + 200`
		**/
		this.gap = this.glareInterval + (opts.gap || 200)
	}

	ColoursSeq.prototype = {

		/**
		Generates a pseudo-random number between zero and 
		the number of `Element` object submitted.

		@method _extract
		@return {Number}
		**/
		_extract: function () {

			var repeated = true
			var h, r
			var len =this._seq.length
			var i = len - 1

			for (; i > 0 && repeated; --i)
				repeated = this._seq[i - 1] === this._seq[i]

			r = Math.floor(Math.random() * 4)

			if (len - i >= this.colourRepeat) 
				while (r == this._seq[len - 1])
					r = Math.floor(Math.random() * 4)

			return r
		},

		/**
		Adds a colour to the sequence and plays it.
		After the call, the colour iterator "poiter" is
		set to the first colour of the sequence.

		@method run
		**/
		run: function () {

			if (this.cb && this._seq.length === this.maxLength) {
				this.stop()
				return
			}

			this._actualElIndex = -1

			this._seq.push(this._extract())

			this._play()

			// $(this._seq[0]).trigger('played')

		},

		/**
		Stops the sequece execution and call the submitted callback
		**/
		stop: function () {

			this._stop = true
			this._cb && this._cb.call()

		},

		/**
		Restores the colour sequence and the colour iterator at the original state.
		**/
		reset: function () {
			this._seq = []
			this._actualElIndex = -1
		},

		length: function () {
			return this._seq.length
		},

		/**
		Tells us if the user hasn't end the sequence yet.
		This is like a poiter iterator: as the user chooses the colours and they are
		correct, the iterator goes on until there is a next colour.

		@return {Boolean}
		**/
		hasColour: function () {
			return this._actualElIndex !== this._seq.length-1
		},

		/**
		This is the right colour to choose.

		@return {Element} The colour pointed by the iterator.
		**/
		nextColour: function () {
			return this._els[this._seq[++this._actualElIndex]]
		},

		_play: function () {
			// there could be a better solution

			for (var i = 0; i < this._seq.length; ++i) {
				var self = this;

				(function () {

					var e = self._els[self._seq[i]]
					var c = 'glare-'+ e.id

					console.log(e.id)

					setTimeout(function () {

						e.classList.add(c)
						
						setTimeout(function () {

							e.classList.remove(c)						

						}, self.glareInterval)
					}, self.gap * i)
				})()
			}
		}

	}

	return ColoursSeq

})()






















