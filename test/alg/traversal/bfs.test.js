import BFS from '../../../src/alg/traversal/bfs'
import {expect} from 'chai'
import * as Graph from '../../fixtures/graph'

describe('BFS', () => {
  let bfs

  beforeEach(() => {
    bfs = new BFS(Graph.G)
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(bfs).to.be.an.instanceof(BFS)
    })

    it('throws an error when no graph is given', () => {
      expect(() => {new BFS()}).to.throw(TypeError);
    })
  })

  describe('#find', () => {
    context('when no source is given', () => {
      it('throws a type error', () => {
        expect(() => {bfs.find()}).to.throw(TypeError);
      })
    })

    context('when a target vertex is given', () => {
      context('when there is no path to the target', () => {
        it('returns an empty array', () => {
          expect(bfs.find(Graph.u, Graph.w)).to.be.empty
        })
      })

      context('when there is a path to the target', () => {
        it('returns a valid path to the target', () => {
          let answer = [Graph.w, Graph.x, Graph.y, Graph.z]
          expect(bfs.find(Graph.w, Graph.z)).to.eql(answer)
        })
      })
    })

    context('when no target vertex is given', () => {
      it('explores the whole component rooted in source', () => {
        expect(bfs.find(Graph.v)).to.eql([Graph.v, Graph.u])
      })
    })
  })
})
