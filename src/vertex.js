export default class Vertex {
  constructor (index) {
    this.index = index;
    this.neighbours = new Set();
  }

  arc (v) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.neighbours.add(v);

    return this;
  }

  edge (v) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    this.arc(v);
    v.neighbours.add(this);

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
