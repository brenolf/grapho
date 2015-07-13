import Vertex from '../src/vertex'
import Arc from '../src/arc'
import {expect} from 'chai'
import sinon from 'sinon'

describe('Vertex', () => {
  let v
  let u
  let list_v
  let list_u

  beforeEach(() => {
    v = new Vertex(42)
    u = new Vertex(999)

    list_v = v.adjacency.arcs
    list_u = u.adjacency.arcs
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(v).to.be.an.instanceof(Vertex)
    })

    it('sets correctly the vertex id', () => {
      expect(v.index).to.eql(42)
    })
  })

  describe('#arc', () => {
    it('adds parallel arcs', () => {
      v.edge(u)
      v.edge(u)

      expect(list_v).to.have.length(2)
    })

    context('when the arc has a weight', () => {
      it('adds the correct tuple to the neighbours of v', () => {
        v.arc(u, 120)
        expect(list_v[0]).to.have.property('weight', 120)
      })
    })

    context('when a Vertex object is passed', () => {
      it('returns the arc and adds it to the neighbours of v', () => {
        let u = new Vertex()
        expect(v.arc(u)).to.be.an.instanceof(Arc)
        expect(list_v).to.have.length(1)
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
    it('adds parallel edges', () => {
      v.edge(u)
      v.edge(u)

      expect(list_v).to.have.length(2)
      expect(list_u).to.have.length(2)
    })

    context('when the edge has a weight', () => {
      it('adds the correct tuple to the neighbours of both v and u', () => {
        v.edge(u, 120)

        expect(list_v[0]).to.have.property('weight', 120)
        expect(list_u[0]).to.have.property('weight', 120)
      })
    })

    context('when a Vertex object is passed', () => {
      it('returns the edge and adds it to the neighbours of both v and u', () => {
        expect(v.edge(u)).to.be.an.instanceof(Arc)
        expect(list_v).to.have.length(1)
        expect(list_u).to.have.length(1)
      })
    })

    context('when an invalid object is passed', () => {
      it('throws an type error', () => {
        expect(() => {v.edge(null)}).to.throw(TypeError)
        expect(() => {v.edge(1234)}).to.throw(TypeError)
      })
    })
  })
})
