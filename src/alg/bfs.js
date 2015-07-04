export default class BFS {
  constructor (G) {
    this.N = G.N;
  }

  find (source, target = null) {
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

    if (target !== null) {
      return [];
    }

    return list;
  }
}
