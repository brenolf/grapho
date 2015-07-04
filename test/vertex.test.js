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

  describe('#degree', () => {
    it('return the number of neighbours', () => {
      v.neighbours = new Set([new Vertex(), new Vertex()]);
      expect(v.degree).to.eql(2);
    });
  });

  describe('#arc', () => {
    it('adds the same vertex only once', () => {
      let u = new Vertex();

      v.arc(v);
      v.arc(v);

      expect(v.neighbours.size).to.eql(1);
    });

    context('when a Vertex object is passed', () => {
      it('returns the instance itself and adds it to the neighbours of v', () => {
        let u = new Vertex();

        expect(() => {v.arc(u)}).not.to.throw(TypeError);
        expect(v.arc(u)).to.eql(v);
        expect(v.neighbours.size).to.eql(1);
      });
    });

    context('when an invalid object is passed', () => {
      it('throws an type error', () => {
        expect(() => {v.arc(new Object())}).to.throw(TypeError);
        expect(() => {v.arc(123456789012)}).to.throw(TypeError);
      });
    });
  });

  describe('#edge', () => {
    it('adds the same vertex only once', () => {
      let u = new Vertex();

      v.edge(v);
      v.edge(v);

      expect(v.neighbours.size).to.eql(1);
    });

    context('when a Vertex object is passed', () => {
      it('returns the instance itself and adds it to the neighbours of both v and u', () => {
        let u = new Vertex();

        expect(() => {v.edge(u)}).not.to.throw(TypeError);
        expect(v.edge(u)).to.eql(v);
        expect(v.neighbours.size).to.eql(1);
        expect(u.neighbours.size).to.eql(1);
      });
    });

    context('when an invalid object is passed', () => {
      it('throws an type error', () => {
        expect(() => {v.edge(new Object())}).to.throw(TypeError);
        expect(() => {v.edge(123456789012)}).to.throw(TypeError);
      });
    });
  });
});
