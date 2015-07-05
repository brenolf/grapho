import Grapho from '../../src/grapho'

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
x.edge(y, 2)
y.edge(z, 1)

export {G, v, u, w, x, y, z}

/*
Graph G is as follows:
     2
  u -- v
1 |
  w
  |     1
1 |  y ---- z
  | / 2
  x
*/
