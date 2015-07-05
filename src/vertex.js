export default class Vertex {
  constructor (index) {
    this.index = index;
    this.neighbours = new Set();
    this.weights = {};
  }

  arc (v, w = null) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.neighbours.add(v);
    this.weights[v.index] = w;

    return this;
  }

  edge (v, w = null) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.neighbours.add(v);
    v.neighbours.add(this);

    this.weights[v.index] = w;
    v.weights[this.index] = w;

    return this;
  }

  get degree () {
    return this.neighbours.size;
  }

  get even () {
    return this.neighbours.size % 2 === 0;
  }

  get odd () {
    return this.neighbours.size % 2 !== 0;
  }
}
