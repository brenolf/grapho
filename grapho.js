(function(w){
	"use strict";

	var Grapho = function(options){
		var M = 0, N = 0;
		var _ = this;
		var adj = [], vertices = {alias: {}, indices: {}}, dict = {};

		// debug
		_.ADJ = adj;

		_.arc = function (u, v, w){
			u = (typeof u === 'number') ? '' + u : u;
			v = (typeof v === 'number') ? '' + v : v;

			if(typeof u !== 'string' || typeof v !== 'string')
				return false;

			M++;

			addVertex(u);
			addVertex(v);

			u = getIndex(u);
			v = getIndex(v);

			w = (typeof w === 'number' ? w : 1)

			if(!adj[u])
				adj[u] = [];

			adj[u][v] = w;

			return true;
		};

		_.edge = function(u, v, w){
			return (_.arc(v, u, w) && _.arc(u, v, w));
		};

		_.set = function(nameData){
			for(var i in nameData)
				dict[i] = nameData[i];
		};

		_.get = function(name){
			return dict[name] ? dict[name] : null;
		};

		_.dfs = function(v, onfind){
			var vis = [];
			dfs(getIndex(v), vis, onfind);
		};

		_.bfs = function(v, onfind){
			var queue = [];
			var vis = [];
			queue.push(getIndex(v));

			while(queue.length){
				v = queue.shift();
				vis[v] = true;

				if(onfind && typeof onfind === 'function')
					onfind.call(getAlias(v));

				if(!adj[v])
					continue;

				for(var u = 0; u < N; u++)
					if(adj[v][u] && !vis[u])
						queue.push(u);
			}
		};

		function dfs(v, vis, onfind){
			vis[v] = true;

			if(onfind && typeof onfind === 'function')
				onfind.call(getAlias(v));

			if(!adj[v])
				return;

			for(var u = 0; u < N; u++)
				if(adj[v][u] && !vis[u])
					dfs(u, vis, onfind);

			return;
		};

		function addVertex(name){
			if(vertices.alias[name] === undefined){
				vertices.indices[N] = name;
				vertices.alias[name] = N++;
				return true;
			}

			return false;
		};

		function getIndex(name){
			return (vertices.alias[name] !== undefined) ? vertices.alias[name] : null;
		};

		function getAlias(index){
			return (vertices.indices[index] !== undefined) ? vertices.indices[index] : null;
		};


	};

	w.Grapho = Grapho;

} (window));
