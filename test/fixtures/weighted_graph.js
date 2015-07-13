import Grapho from '../../src/base/grapho'

let G = new Grapho()

let v = G.vertex()
let u = G.vertex()
let w = G.vertex()
let x = G.vertex()
let y = G.vertex()
let z = G.vertex()

v.edge(u, 2)
u.edge(w, 1)
w.edge(x, 1)
y.edge(w, 5)
y.edge(x, 2)
z.edge(y, 1)
v.edge(z, 10)

export {G, v, u, w, x, y, z}

/*
Graph G is as follows:
     2
  u ------- v
1 |         |
  w         | 10
  | \ 5  1  |
1 |  y ---- z
  | / 2
  x
*/
