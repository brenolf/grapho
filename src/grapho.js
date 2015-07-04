import Vertex from './vertex';

export default class Grapho {
  constructor () {
    this.V = new Set();
    this.N = 0;
  }

  vertex (v = new Vertex()) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.V.add(v);

    v.index = this.N++;

    return v;
  }
}
