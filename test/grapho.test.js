import Grapho from '../src/grapho'
import Vertex from '../src/vertex'
import {expect} from 'chai'
import sinon from 'sinon'
import BFS from '../src/alg/traversal/bfs'
import DFS from '../src/alg/traversal/dfs'
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
    let dfs_stub;
    let answer_dfs_1 = [sinon.createStubInstance(Vertex)];
    let answer_dfs_2 = [sinon.createStubInstance(Vertex), sinon.createStubInstance(Vertex)];
    let answer_bfs_1 = [sinon.createStubInstance(Vertex), sinon.createStubInstance(Vertex)];

    before(() => {
      dfs_stub = sinon.stub(DFS.prototype, 'find')

      dfs_stub.withArgs(Graph.u, null).returns(answer_dfs_1)
      dfs_stub.withArgs(Graph.u, Graph.v).returns(answer_dfs_2)
      sinon.stub(BFS.prototype, 'find').withArgs(Graph.v, null).returns(answer_bfs_1)
    })

    after(() => {
      dfs_stub.restore()
      BFS.prototype.find.restore()
    })

    context('when the algorithm does not exist', () => {
      it('throws a reference error', () => {
        expect(() => {Graph.G.find(Graph.u, null, 'invalid')}).to.throw(ReferenceError)
      })
    })

    context('when no source is given', () => {
      it('throws a type error', () => {
        expect(() => {G.find()}).to.throw(TypeError);
      })
    })

    context('when there is a source', () => {
      context('when there is no target', () => {
        it('explores the whole component rooted in source using the default algorithm', () => {
          expect(Graph.G.find(Graph.u)).to.eql(answer_dfs_1)
        })

        it('explores the whole component rooted in source using the given algorithm', () => {
          expect(Graph.G.find(Graph.v, null, 'bfs')).to.eql(answer_bfs_1)
        })
      })

      context('when there is a target', () => {
        it('finds a path to the target', () => {
          expect(Graph.G.find(Graph.u, Graph.v)).to.eql(answer_dfs_2)
        })
      })
    })
  })
})
