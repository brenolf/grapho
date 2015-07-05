import Grapho from '../../grapho';
import Vertex from '../../vertex';
import PriorityQueue from 'js-priority-queue';

const INFINITY = Number.MAX_SAFE_INTEGER;
let distance = [];

export default class Dijikstra {
  constructor (G) {
    if (G.constructor !== Grapho) {
      throw new TypeError();
    }

    this.G = G;
  }

  find (source, target = null) {
    if (source.constructor !== Vertex) {
      throw new TypeError();
    }

    let H = new Grapho();
    let H_vertices = new Array(this.G.N);
    let build_tree = (target === null);

    let queue = new PriorityQueue({
      comparator: this._cmp
    });

    distance = new Array(this.G.N);
    let parent = new Array(this.G.N);
    let visited = new Array(this.G.N);

    let tail = -1;

    for (let v of this.G.V) {
      distance[v.index] = INFINITY;
      parent[v.index] = [null, -1];
      visited[v.index] = false;
      H_vertices[v.index] = null;
    }

    distance[source.index] = 0;
    parent[source.index] = [source, source.index];

    queue.queue(this._pair(source));

    while (queue.length > 0) {
      let peak = queue.dequeue();

      let v = peak.vertex;
      let w = peak.weight;

      if (w > distance[v.index]) {
        continue;
      }

      visited[v.index] = true;

      if (build_tree) {
        H_vertices[v.index] = H.vertex();

        let previous = parent[v.index][1];
        let w = parent[previous][0];

        if (previous !== v.index) {
          H_vertices[v.index].edge(H_vertices[previous], v.weights[w.index]);
        }
      }

      if (v === target) {
        tail = v.index;
        break;
      }

      for (let u of v.neighbours) {
        let local = distance[v.index] + v.weights[u.index];

        if (!visited[u.index] && distance[u.index] > local) {
          distance[u.index] = local;
          parent[u.index] = [u, v.index];
          queue.queue(this._pair(u));
        }
      }
    }

    if (target === null) {
      return H;
    } else if (target !== null && tail >= 0) {
      let path = [];
      let u;

      do {
        [u, tail] = parent[tail];
        path.unshift(u);
      } while (u.index !== tail);

      return path;
    }

    return [];
  }

  _cmp (v, u) {
    return v.weight - u.weight;
  }

  _pair (v) {
    return {
      vertex: v,
      weight: distance[v.index]
    };
  }
}
