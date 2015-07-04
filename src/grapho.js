import Vertex from './vertex';

export default class Grapho {
  constructor () {
    this.V = new Set();
  }

  vertex (v = new Vertex()) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.V.add(v);

    return v;
  }
}
