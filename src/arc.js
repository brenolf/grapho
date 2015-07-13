import Vertex from './vertex';

export default class Arc {
  constructor (start, end, weight = null) {
    if (start.constructor !== Vertex) {
      throw new TypeError();
    }

    if (end.constructor !== Vertex) {
      throw new TypeError();
    }

    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}
