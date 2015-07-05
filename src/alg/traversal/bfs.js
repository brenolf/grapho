import Grapho from '../../grapho';
import Vertex from '../../vertex';

export default class BFS {
  constructor (G) {
    if (G.constructor !== Grapho) {
      throw new TypeError();
    }

    this.N = G.N;
  }

  find (source, target = null) {
    if (source.constructor !== Vertex) {
      throw new TypeError();
    }

    let v;
    let list = [];
    let queue = [source];
    let enqueued = new Array(this.N);

    enqueued[source.index] = true;

    while ((v = queue.shift()) !== undefined) {
      list.push(v);

      if (v === target) {
        return list;
      }

      for (let u of v.neighbours) {
        if (!enqueued[u.index]) {
          queue.push(u);
          enqueued[u.index] = true;
        }
      }
    }

    return (target !== null) ? [] : list;
  }
}
