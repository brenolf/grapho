import AdjacencyList from './adjacency_list';

export default class Vertex {
  constructor (index) {
    this.index = index;
    this.adjacency = new AdjacencyList(this);
  }

  arc (v, w = null) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    return this.adjacency.add(v, w);
  }

  edge (v, w = null) {
    if (v.constructor !== Vertex) {
      throw new TypeError();
    }

    v.adjacency.add(this, w);

    return this.adjacency.add(v, w);
  }

  get weights () {
    return this.adjacency.weights();
  }

  get neighbours () {
    return this.adjacency.neighbours();
  }

  get degree () {
    return this.adjacency.size;
  }

  get even () {
    return this.adjacency.size % 2 === 0;
  }

  get odd () {
    return this.adjacency.size % 2 !== 0;
  }
}
