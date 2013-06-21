

describe("SquareSeq", function () {

    beforeAll(function () {
        var doc = document
        var elems = [
            doc.createElement('a'),
            doc.createElement('a'),
            doc.createElement('a'),
            doc.createElement('a')
        ]
        var ctx = new webkitAudioContext()
        this.nodes = []
        for (var i = 0; i < 4; ++i) { 

            this.nodes[i] = {}
            this.nodes[i].colour = elems[i]
            this.nodes[i].sound = ctx.createOscillator()
            this.nodes[i].sound.type = 3

        }

        this.nodes[0].sound.frequency.value = 330
        this.nodes[1].sound.frequency.value = 370
        this.nodes[2].sound.frequency.value = 392
        this.nodes[3].sound.frequency.value = 415

        this.s = new SquareSeq({ elems: this.nodes })
    })

    it ("has initially no colours", function () {
        var it = this.s.iter()
        expect(it.hasSquare()).toBeFalsy()
    })

    it ("append() adds a new element to the sequence", function () {
        this.s.append()
        var it = this.s.iter()
        expect(it.hasSquare()).toBeTruthy()
        expect(this.nodes).toContain(it.nextSquare())
    })

    it ("soundOf() returns the audio node bound to the input colour", function() {
        var it = this.s.iter()
        var c = it.nextSquare()
        expect(this.s.soundOf(c.colour)).toBe(c.sound)
    })

    it ("reset() empties the sequence", function () {
        var it = this.s.iter()
        expect(it.hasSquare()).toBeTruthy()
        this.s.reset()
        it = this.s.iter()
        expect(it.hasSquare()).toBeFalsy()
    })

    it ("the iterator returns the right sequence", function() {
        var i = 0
        var fourElem
        var indexSeq
        while (i++ < 5) this.s.append()
        var it = this.s.iter()
        i = 0
        fourElem = this.s._els
        indexSeq = this.s._seq
        while (it.hasSquare())
            expect(it.nextSquare()).toEqual(fourElem[indexSeq[i++]])

    })
})


















