import Grapho from '../src/grapho'
import Vertex from '../src/vertex'
import {expect} from 'chai'
import * as Graph from './fixtures/graph'

describe('Grapho', () => {
  let G

  beforeEach(() => {
    G = new Grapho()
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(G).to.be.an.instanceof(Grapho)
    })
  })

  describe('#vertex', () => {
    context('when no parameter is passed', () => {
      it('adds a new vertex to the graph', () => {
        let v = G.vertex()

        expect(v).to.be.instanceof(Vertex)
        expect(G.V.size).to.eql(1)
        expect(v.index).to.not.be.undefined
      })
    })

    context('when a parameter is passed', () => {
      context('when a Vertex object is passed', () => {
        it('returns the added object and adds it to the graph', () => {
          let u = new Vertex()

          expect(() => {G.vertex(u)}).not.to.throw(TypeError)
          expect(G.vertex(u)).to.eql(u)
          expect(G.V.size).to.eql(1)
          expect(u.index).to.not.be.undefined
        })
      })

      context('when an invalid object is passed', () => {
        it('throws an type error', () => {
          expect(() => {G.vertex(new Object())}).to.throw(TypeError)
          expect(() => {G.vertex(123456789012)}).to.throw(TypeError)
        })
      })
    })
  })
})
