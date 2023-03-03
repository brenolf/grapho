# Grapho [![npm version](https://badge.fury.io/js/grapho.svg)](http://badge.fury.io/js/grapho) [![Circle CI](https://circleci.com/gh/brenolf/grapho/tree/master.svg?style=svg)](https://circleci.com/gh/brenolf/grapho/tree/master)

## Motivation

Grapho is a light-weight JavaScript library to manipulate graphs on client-side. It uses ES6 syntax to make it easier to extend the structure to whatever is suitable.

One can easily use it without profoundly knowing neither graph theory terminology nor its algorithms, working as a black-boxed data structure for relationships between any object in JavaScript. Nevertheless, it is strongly recommended for the user to have at least a basic notion of Graph Theory.

## Installation

For local usage on any project, run `npm install grapho --save-dev`. There is also a gulp task that generates ES5 code for browsers: `gulp build`.

## Usage

See the Test module for actual running code examples

We will create a Graph object with two vertices. 

The Grapho Graph object has a member **V** which holds all the vertices defined in it.

    let g = new Grapho() // at this stage g.V.size == 0

The Grapho **.vertex()** method adds vertices to the graph. It has an optional parameter for the Vertex object that will be added to the graph. Without parameters, it adds a default vertex with no ID. 

Each vertex has an optional numerical id called **.index**. If it was not set it will be left **undefined.**

      let v1 = g.vertex() // adds a default automatically created vertex
      // g.V.size should be 1
      
      let v2 = new Vertex() 
      g.vertex(v2)
     
     let v3 = g.vertex(new Vertex(123))
     let v4 = g.vertex(new Vertex(456))
     let v5 = g.vertex(new Vertex(789))
     // g.V.size is now 4.   
     // v3.index is 123 etc. While v1 and v2 have the id (i.e. the index) of **undefined.**
     
Edges are added to a **vertex** using its **.edge(target, [weight])** method which takes a target vertex and optional weight.

Arcs (weighted edges) are added to a vertext by using its **.arc(target, weight)** method with a target vertex and weight which sets the Vertex **.weight** member. If no weight is given, the weight of the arc is set to **null.**

Each Vertex object has an **.adjacency** member, holding a list of all adjacency arcs in **.adjacency.arcs.**.

Adjacency lists are defined by setting a weighted **.adjacency.arc** from the vertex, or adding an **.edge** between at least two vertices.

    let edge1 = v3.edge(v4) // the coming of edge
    let edge2 = v3.edge(v4)  // we show here that you may add extra edges in parallel
    let edge3 = v3.edge(v4, 123) // adds weight of 123 to the third parallel edge
    let edge4 = v3.edge(v5, 11)  // adding weight of 11 to this edge from v3 to v5
    let v3arcs = v3.adjacency.arcs // v3arcs.size is now 4. (Three parallel edges to v4, and one to v5)
    let v5arcs = v5.adjacency.arcs // v5arcs.size is now only 1, going back to v3. 
    
    
Using the vertex **.arc(target, weight)** method, you can force all edges between two given vertices to a desired weight. 

    let arcV3 = v3.arc(v4, 120) // now all edges from v3 to v4 including **v3arcs[0].weight** are 120
    
    
The **find(source, target, algorithm)** method finds the target vertex connected to the source target using the chosen algorithm.
    
    let bfsFound = g.find(v1, v2, 'bfs') // using the BFS algorithm
    let defFound = g.find(v1, v2) // using the default algorithm
    let allFound = g.find(v1) // finds all indices from v1, using the default algorithm
    
 You can find the shortest path between defined vertices using the Dijkstra algorithm. 
 
     let dj = new Dijkstra(g)  
     let shortest = dj.find(v1,v5)
     // the same can be done with traversal using bfs (breadth first) and dfs (depth) search algorithms
     
 To be continued.
     


 
