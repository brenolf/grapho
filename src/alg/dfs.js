export default class DFS {
  constructor (G) {
    this.visited = new Array(G.N);
  }

  find (vertex, target = null) {
    this.visited[vertex.index] = true;

    if (vertex === target) {
      return [vertex];
    }

    for (let u of vertex.neighbours) {
      if (!this.visited[u.index]) {
        let path = this.find(u, target);

        if (path.length !== 0) {
          path.unshift(vertex);

          return path;
        }
      }
    }

    return (target !== null) ? [] : [vertex];
  }
}
