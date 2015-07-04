import Grapho from '../src/grapho'
import Vertex from '../src/vertex'
import {expect} from 'chai'
import sinon from 'sinon'
import BFS from '../src/alg/bfs'
import DFS from '../src/alg/dfs'
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

  describe('#find', () => {
    let answer_dfs = [sinon.createStubInstance(Vertex)];
    let answer_bfs = [sinon.createStubInstance(Vertex), sinon.createStubInstance(Vertex)];

    before(() => {
      sinon.stub(DFS.prototype, 'find').returns(answer_dfs)
      sinon.stub(BFS.prototype, 'find').returns(answer_bfs)
    })

    after(() => {
      DFS.prototype.find.restore()
      BFS.prototype.find.restore()
    })

    context('when no source is given', () => {
      it('throws a type error', () => {
        expect(() => {G.find()}).to.throw(TypeError);
      })
    })

    context('when there is a source', () => {
      context('when there is no target', () => {
        it('explores the whole component rooted in source using the default algorithm', () => {
          expect(Graph.G.find(Graph.u, Graph.v)).to.eql(answer_dfs)
        })

        it('explores the whole component rooted in source using the given algorithm', () => {
          expect(Graph.G.find(Graph.v, Graph.u, 'bfs')).to.eql(answer_bfs)
        })

        it('throws a reference error when the algorithm does not exist', () => {
          expect(() => {Graph.G.find(Graph.u, Graph.v, 'invalid')}).to.throw(ReferenceError)
        })
      })

      context('when there is a target', () => {})
    })
  })
})
