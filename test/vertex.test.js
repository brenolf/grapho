import Vertex from '../src/vertex'
import {expect} from 'chai';

describe('Vertex', () => {
  let v;

  beforeEach(() => {
    v = new Vertex();
  });

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(v).to.be.an.instanceof(Vertex);
    });
  });
});
