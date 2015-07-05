import Vertex from '../src/vertex'
import {expect} from 'chai'
import sinon from 'sinon'

describe('Vertex', () => {
  let v
  let oneSet = new Set([sinon.createStubInstance(Vertex)])
  let twoSet = new Set([sinon.createStubInstance(Vertex), sinon.createStubInstance(Vertex)])

  beforeEach(() => {
    v = new Vertex(999)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(v).to.be.an.instanceof(Vertex)
    })
  })

  describe('#degree', () => {
    it('returns the number of neighbours', () => {
      v.neighbours = twoSet
      expect(v.degree).to.eql(2)
    })
  })

  describe('#odd', () => {
    it('returns whether or not the vertex is odd', () => {
      v.neighbours = oneSet
      expect(v.odd).to.be.true
    })
  })

  describe('#even', () => {
    it('returns whether or not the vertex is even', () => {
      v.neighbours = twoSet
      expect(v.even).to.be.true
    })
  })

  describe('#arc', () => {
    it('adds the same vertex only once', () => {
      let u = new Vertex()

      v.arc(v)
      v.arc(v)

      expect(v.neighbours.size).to.eql(1)
    })

    context('when the arc has a weight', () => {
      it('adds the correct tuple to the neighbours of v', () => {
        let u = new Vertex(42)
        let w = 120

        v.arc(u, w)

        expect(v.weights).to.have.property(42, w)
      })
    })

    context('when a Vertex object is passed', () => {
      it('returns the instance itself and adds it to the neighbours of v', () => {
        let u = new Vertex()

        expect(() => {v.arc(u)}).not.to.throw(TypeError)
        expect(v.arc(u)).to.eql(v)
        expect(v.neighbours.size).to.eql(1)
      })
    })

    context('when an invalid object is passed', () => {
      it('throws an type error', () => {
        expect(() => {v.arc(new Object())}).to.throw(TypeError)
        expect(() => {v.arc(123456789012)}).to.throw(TypeError)
      })
    })
  })

  describe('#edge', () => {
    it('adds the same vertex only once', () => {
      let u = new Vertex()

      v.edge(v)
      v.edge(v)

      expect(v.neighbours.size).to.eql(1)
    })

    context('when the arc has a weight', () => {
      it('adds the correct tuple to the neighbours of both v and u', () => {
        let u = new Vertex(42)
        let w = 120

        v.edge(u, w)

        expect(v.weights).to.have.property(42, w)
        expect(u.weights).to.have.property(999, w)
      })
    })

    context('when a Vertex object is passed', () => {
      it('returns the instance itself and adds it to the neighbours of both v and u', () => {
        let u = new Vertex()

        expect(() => {v.edge(u)}).not.to.throw(TypeError)
        expect(v.edge(u)).to.eql(v)
        expect(v.neighbours.size).to.eql(1)
        expect(u.neighbours.size).to.eql(1)
      })
    })

    context('when an invalid object is passed', () => {
      it('throws an type error', () => {
        expect(() => {v.edge(new Object())}).to.throw(TypeError)
        expect(() => {v.edge(123456789012)}).to.throw(TypeError)
      })
    })
  })
})
