var SquareSeq = (function () {
    "use strict"

	/**
	Handles the colour sequece, initially empty.

	@class
	@constructor

	@param {Object} opts
		@param {Array}  elems
		@param {Number} [squareRepeat=3] Maximum times a colour is repeated in row. 
		@param {Number} [glareInterval=150] Period of time, in ms,  of a square's glare.
		@param {Number} [gap=glareInterval+200] Period of time, in ms, between two glares.
	**/
	function SquareSeq (opts) 
	{
		if (!opts || !opts.elems || opts.elems.length != 4)
			throw new Error("elems must be provided...")

		var i = 0, len

		this.sqrs = []
		for (; i < 4; ++i) 
		{
			this.sqrs[i] = opts.elems[i]
		}
		/**

		@property squareRepeat
		@type Number
		@default 3
		**/
		this.squareRepeat = opts.squareRepeat || 3

		// a seq of numbers between 0 and 3
		this._seq = [] 

		/**

		@property glareInteral
		@type Number
		@default 300
		**/
		this.glareInterval = opts.glareInterval || 150

		/**
		Given by the sum of `glareInterval` and the submitted value.

		@property gap
		@type Number
		@default `this.glareInterval + 200`
		**/
		this.gap = this.glareInterval + (opts.gap || 200)
		
	}

	SquareSeq.prototype = {

		iter: function () {

			var self = this

			return {

				_index: -1,

				hasSquare: function () {

					return this._index !== self._seq.length - 1

				},

				/**
				This is the right colour to choose.
				Calling SquareSeq#reset() invalidates the iterator.

				@return {Element} The colour pointed by the iterator.
				**/
				nextSquare: function () {
					if (self._seq.length) 
						return self.sqrs[self._seq[++this._index]]
			   		else throw new Error("Invalid Iterator")
				}
			}

		},

		_squareSeq: function () {

			var i = 0
			var len = this._seq.length
			var a = [] 

			for (; i < len; ++i)
				a.push(this.sqrs[this._seq[i]])

			return a

		},

		/**
		Generates a pseudo-random number between zero and 
		the number of item objects submitted (opts.elems).

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

			if (len - i >= this.squareRepeat) 
				while (r == this._seq[len - 1])
					r = Math.floor(Math.random() * 4)

			return r
		},

		/**
		Adds a square to the sequence and plays it.

		@method append
		**/
		append: function () {

			this._seq.push(this._extract())

		},

		/**
		Restores the square sequence at the original state: empty.
		**/
		reset: function () {

			this._seq = []
		
		},

		soundOf: function (colour) {

			for (var i = 0; i < 4; ++i) {
				if (this.sqrs[i].colour === colour)
					return this.sqrs[i].sound
			}

		},

		length: function() {

			return this._seq.length
			
		}
		
	}

	return SquareSeq

})()
