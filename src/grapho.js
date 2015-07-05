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

  find (source, target = null, algorithm = 'dfs') {
    if (source.constructor !== Vertex) {
      throw new TypeError();
    }

    let TraversalAlgorithm;

    try {
      TraversalAlgorithm = require('./alg/traversal/' + algorithm);
    }

    catch (error) {
      throw new ReferenceError(error.message);
    }

    let alg = new TraversalAlgorithm(this);

    return alg.find(source, target);
  }
}
