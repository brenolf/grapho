import Grapho from '../../src/grapho'

let G = new Grapho()

let v = G.vertex()
let u = G.vertex()
let w = G.vertex()
let x = G.vertex()
let y = G.vertex()
let z = G.vertex()

v.edge(u)
w.edge(x)
y.edge(w)
y.edge(x)
z.edge(y)

export {G, v, u, w, x, y, z}

/*
Graph G is as follows:

u -- v

w
| \
|  y -- z
| /
x
*/
