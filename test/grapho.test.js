import Grapho from '../src/grapho.js'
import {expect} from 'chai';

describe('Grapho', () => {
  describe('when a new instance is created', () => {
    let G = new Grapho();

    it('returns an instance of the class', () => {
      expect(G.constructor).to.eql(Grapho);
    });
  });
});
