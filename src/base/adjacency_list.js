import Arc from './arc';
import Vertex from './vertex';

export default class AdjacencyList {
  constructor (vertex) {
    if (vertex.constructor !== Vertex) {
      throw new TypeError();
    }

    this.vertex = vertex;
    this.arcs = [];
  }

  add (vertex, weight) {
    if (vertex.constructor !== Vertex) {
      throw new TypeError();
    }

    let arc = new Arc(this.vertex, vertex, weight);

    this.arcs.push(arc);

    return arc;
  }

  get size () {
    return this.arcs.length;
  }

  weights () {
    let vertices = {};

    for (let e of this.arcs) {
      let u = (e.end === this.vertex) ? e.start : e.end;

      vertices[u.index] = e.weight;
    }

    return vertices;
  }

  neighbours () {
    let vertices = [];

    for (let e of this.arcs) {
      let u = (e.end === this.vertex) ? e.start : e.end;

      vertices.push(u);
    }

    return vertices;
  }
}
