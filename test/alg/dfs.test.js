import DFS from '../../src/alg/dfs'
import {expect} from 'chai'
import * as Graph from '../fixtures/graph'

describe('DFS', () => {
  let dfs

  beforeEach(() => {
    dfs = new DFS(Graph.G)
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(dfs).to.be.an.instanceof(DFS)
    })
  })

  describe('#find', () => {
    context('when a target vertex is given', () => {
      context('when there is no path to the target', () => {
        it('returns an empty array', () => {
          expect(dfs.find(Graph.u, Graph.w)).to.be.empty
        })
      })

      context('when there is a path to the target', () => {
        it('returns a valid path to the target', () => {
          let answer = [Graph.z, Graph.y, Graph.w]
          expect(dfs.find(Graph.z, Graph.w)).to.eql(answer)
        })
      })
    })

    context('when no target vertex is given', () => {
      it('explores the whole component rooted in source', () => {
        let answer = [Graph.w, Graph.x, Graph.y, Graph.z]
        expect(dfs.find(Graph.w)).to.eql(answer)
      })
    })
  })
})
