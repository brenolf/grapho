import BFS from '../../src/alg/bfs';
import {expect} from 'chai';
import * as Graph from '../fixtures/graph';

describe('BFS', () => {
  let bfs;

  beforeEach(() => {
    bfs = new BFS(Graph.G);
  })

  describe('#constructor', () => {
    it('returns an instance of the class and saves G', () => {
      expect(bfs).to.be.an.instanceof(BFS);
    });
  });

  describe('#find', () => {
    context('when a target vertex is given', () => {
      context('when there is no path to the target', () => {
        it('returns an empty array', () => {
          expect(bfs.find(Graph.u, Graph.w)).to.be.empty;
        });
      });

      context('when there is a path to the target', () => {
        it('returns a valid path to the target', () => {
          let answer = [Graph.w, Graph.x, Graph.y, Graph.z];
          expect(bfs.find(Graph.w, Graph.z)).to.eql(answer);
        });
      });
    });

    context('when no target vertex is given', () => {
      it('explores the whole component rooted in source', () => {
        expect(bfs.find(Graph.v)).to.eql([Graph.v, Graph.u]);
      });
    });
  });
});
