import AdjacencyList from '../src/adjacency_list'
import Vertex from '../src/vertex'
import Arc from '../src/arc'
import {expect} from 'chai'
import sinon from 'sinon'

describe('AdjacencyList', () => {
  let list
  let v = sinon.createStubInstance(Vertex)
  let u = sinon.createStubInstance(Vertex)

  beforeEach(() => {
    list = new AdjacencyList(v)
    u.index = 42;
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(list).to.be.an.instanceof(AdjacencyList)
    })

    it('sets an empty list of arcs', () => {
      expect(list.arcs).to.be.an('array')
      expect(list.arcs).to.be.empty
    })

    it('throws an exception if parameter is not a vertex', () => {
      expect(() => {new AdjacencyList(null)}).to.throw(TypeError)
    })
  })

  describe('#add', () => {
    context('when parameter is not a vertex', () => {
      it('throws an exception', () => {
        expect(() => {list.add(null)}).to.throw(TypeError)
      })
    })

    context('when parameter is a vertex', () => {
      it('adds an arc to the list and returns it', () => {
        let e = list.add(u)

        expect(e).to.be.an.instanceof(Arc)
        expect(list.arcs).to.have.length(1)
        expect(e.end).to.eql(u)
      })

      it('adds an weighted arc to the list and returns it', () => {
        let e = list.add(u, 42)

        expect(e).to.be.an.instanceof(Arc)
        expect(list.arcs).to.have.length(1)
        expect(e.end).to.eql(u)
        expect(e.weight).to.eql(42)
      })
    })
  })

  describe('#size', () => {
    it('returns the length of the list of arcs', () => {
      expect(list.size).to.eql(0)
    })
  })

  describe('#neighbours', () => {
    it('returns a list of all neighbours of the vertex', () => {
      list.add(u)
      expect(list.neighbours()).to.eql([u])
    })
  })

  describe('#weights', () => {
    it('returns an object with neighbours weights', () => {
      list.add(u, 84)
      expect(list.weights()).to.eql({42: 84})
    })
  })
})
