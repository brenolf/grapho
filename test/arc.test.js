import Arc from '../src/arc'
import Vertex from '../src/vertex'
import {expect} from 'chai'
import sinon from 'sinon'

describe('Arc', () => {
  let e
  let f

  let u
  let v

  beforeEach(() => {
    v = sinon.createStubInstance(Vertex)
    u = sinon.createStubInstance(Vertex)

    e = new Arc(v, u)
    f = new Arc(v, u, 42)
  })

  describe('#constructor', () => {
    it('returns an instance of the class', () => {
      expect(e).to.be.an.instanceof(Arc)
    })

    it('throws an exception when any parameter is not a Vertex', () => {
      expect(() => {new Arc(v, null)}).to.throw(TypeError)
      expect(() => {new Arc(null, u)}).to.throw(TypeError)
    })

    it('assigns the ends of the arc correctly', () => {
      expect(e.start).to.eql(v)
      expect(e.start).to.eql(u)
    })

    it('assigns the arc weight correctly', () => {
      expect(e.weight).to.be.null
      expect(f.weight).to.eql(42)
    })
  })
})
