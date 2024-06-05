import Tree from "./binaryST.mjs";

function getRandomArray(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let number = Math.floor(Math.random() * 100);
    array.push(number);
  }
  return array;
}

const array = getRandomArray(15);

console.log(array);

const tree = Tree();
tree.rootNode = tree.buildTree(array);
tree.prettyPrint(tree.rootNode);
console.log(tree.isBalanced());

console.log(tree.levelOrder(tree.rootNode));
console.log(tree.preOrder(tree.rootNode));
console.log(tree.inOrder(tree.rootNode));
console.log(tree.postOrder(tree.rootNode));

tree.insert(99, tree.rootNode);
tree.insert(169, tree.rootNode);
tree.insert(420, tree.rootNode);
tree.insert(422, tree.rootNode);
tree.prettyPrint(tree.rootNode);
console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());

tree.prettyPrint(tree.rootNode);

console.log(tree.levelOrder(tree.rootNode));
console.log(tree.preOrder(tree.rootNode));
console.log(tree.inOrder(tree.rootNode));
console.log(tree.postOrder(tree.rootNode));
