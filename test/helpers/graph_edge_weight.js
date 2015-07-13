import Grapho from '../../src/base/grapho';

export default function graph_edge_weight (G) {
  if (G.constructor !== Grapho) {
    throw new TypeError();
  }

  let total = 0;

  for (let v of G.V) {
    for (let u of v.neighbours) {
      total += v.weights[u.index];
    }
  }

  return total / 2;
}
