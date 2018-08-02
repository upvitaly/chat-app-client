// This mock class is loaded in stead of the original NodeURLHandler class
// when bundling the library for environments which are not node.
// This allows us to avoid bundling useless node components and have a smaller build.
export class NodeURLHandler {
  get(url, options, cb) {
    cb(
      new Error('Please bundle the library for node to use the node urlHandler')
    );
  }
}
