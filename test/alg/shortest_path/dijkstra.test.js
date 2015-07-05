import Dijkstra from '../../../src/alg/shortest_path/dijkstra'
import {expect} from 'chai'
import * as Graph from '../../fixtures/weighted_graph'
import * as Tree from '../../fixtures/shortest_path_tree'
import graph_edge_weight from '../../helpers/graph_edge_weight'

describe('Dijkstra', () => {
  let dijkstra

  beforeEach(() => {
    dijkstra = new Dijkstra(Graph.G)
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(dijkstra).to.be.an.instanceof(Dijkstra)
    })

    it('throws an error when no graph is given', () => {
      expect(() => {new Dijkstra()}).to.throw(TypeError)
    })
  })

  describe('#find', () => {
    context('when no source is given', () => {
      it('throws a type error', () => {
        expect(() => {dijkstra.find(null, Graph.v)}).to.throw(TypeError)
      })
    })

    context('when the target is not reachable', () => {
      it('returns an empty array', () => {
        expect(dijkstra.find(Graph.v, {})).to.be.empty
      })
    })

    context('when there is no target', () => {
      it('returns a shortest path tree rooted in source', () => {
        let tree = dijkstra.find(Graph.v)

        expect(tree.V.size).to.eql(6)
        expect(graph_edge_weight(tree)).to.eql(7)
      })
    })

    context('when there is a target', () => {
      it('returns the minimum cost path to target', () => {
        let answer = [Graph.v, Graph.u, Graph.w, Graph.x]
        expect(dijkstra.find(Graph.v, Graph.x)).to.eql(answer)
      })
    })
  })
})
