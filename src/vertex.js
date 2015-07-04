export default class Vertex {
  constructor (index) {
    this.index = index;
    this.neighbours = new Set();
  }
}
