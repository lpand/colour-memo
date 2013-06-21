

describe("SquareSeq", function () {

    var self = this
    var doc = document
    var elems = [
        doc.createElement('a'),
        doc.createElement('a'),
        doc.createElement('a'),
        doc.createElement('a')
    ]
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

    var s = new SquareSeq({ elems: nodes })

    it ("throws an error if elems is not provided", function() {
        var e = function () { new SquareSeq() }
        expect(e).toThrow()
    })

    it ("has initially no colours", function () {
        var it = s.iter()
        expect(it.hasSquare()).toBeFalsy()
    })

    it ("append() adds a new element to the sequence", function () {
        s.append()
        var it = s.iter()
        expect(it.hasSquare()).toBeTruthy()
        expect(nodes).toContain(it.nextSquare())
    })

    it ("soundOf() returns the audio node bound to the input colour", function() {
        var it = s.iter()
        var c = it.nextSquare()
        expect(s.soundOf(c.colour)).toBe(c.sound)
    })

    it ("reset() empties the sequence", function () {
        var it = s.iter()
        expect(it.hasSquare()).toBeTruthy()
        s.reset()
        it = s.iter()
        expect(it.hasSquare()).toBeFalsy()
    })

    it ("the iterator returns the right number of squares", function () {
        var i = 0, j = 0
        while (i++ < 5) s.append()
        var it = s.iter()
        while (j++ < i)
            expect(it.nextSquare).not.toThrow()
    })

//  Avoid to use internal api for this...
    it ("the iterator returns the right sequence", function() {
        var i = 0, j = 0, fourElem, indexSeq
        while (i++ < 5) s.append()
        var it = s.iter()
        fourElem = s._els
        indexSeq = s._seq
        while (it.hasSquare())
            expect(it.nextSquare()).toEqual(fourElem[indexSeq[j++]])
    })
})
