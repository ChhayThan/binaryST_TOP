import Node from "./node.mjs";
import mergeSort from "./mergeSort.mjs";

export default function Tree() {
  let rootNode = null;

  function removeDupes(array) {
    let filteredArray = [];
    array.forEach((element) => {
      if (!filteredArray.includes(element)) {
        filteredArray.push(element);
      }
    });

    return filteredArray;
  }

  function buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    array = removeDupes(array);
    array = mergeSort(array);

    const middle = Math.floor((array.length - 1) / 2);
    const node = Node(array[middle]);
    node.left = buildTree(array.slice(0, middle));
    node.right = buildTree(array.slice(middle + 1, array.length));

    return node;
  }

  function insert(value, root) {
    if (root === null) {
      root = Node(value);
      return root;
    }

    if (root.data === value) {
      return root;
    }
    if (root.data > value) {
      root.left = insert(value, root.left);
    } else if (root.data < value) {
      root.right = insert(value, root.right);
    }

    return root;
  }

  function deleteItem(value, root) {
    if (root === null) {
      return root;
    }
    if (root.data > value) {
      root.left = deleteItem(value, root.left);
    } else if (root.data < value) {
      root.right = deleteItem(value, root.right);
    } else {
      if (root.right == null) {
        return root.left;
      } else if (root.left === null) {
        return root.right;
      }

      root.data = minValue(root.right);
      root.right = deleteItem(root.data, root.right);
    }

    return root;
  }

  function minValue(root) {
    let minV = root.data;
    while (root.left != null) {
      minV = root.left.key;
      root = root.left;
    }

    return minV;
  }

  function find(value, root) {
    if (root === null) {
      return null;
    }
    if (root.data === value) {
      return root;
    }
    if (root.data > value) {
      return find(value, root.left);
    } else if (root.data < value) {
      return find(value, root.right);
    }
  }

  function levelOrder(root, callback) {
    let queue = [root];
    let result = [];

    while (queue.length > 0) {
      let node = queue[0];
      result.push(node.data);
      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }

      if (callback) {
        callback(node);
      }

      queue.shift();
    }

    if (!callback) {
      return result;
    }
  }

  // left root right
  function inOrder(root, callback, result = []) {
    if (!root) {
      return;
    }
    if (root === null) {
      return;
    }
    inOrder(root.left, callback, result);
    if (callback) {
      callback(root);
    } else {
      result.push(root.data);
    }
    inOrder(root.right, callback, result);

    if (!callback) {
      return result;
    }
  }
  // root left right
  function preOrder(root, callback) {
    let result = [];
    let stack = [root];

    while (stack.length > 0) {
      let node = stack.pop();
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
      if (callback) {
        callback(node);
      }
      result.push(node.data);
    }

    if (!callback) {
      return result;
    }
  }

  // left right root
  function postOrder(root, callback) {
    let result = [];
    let stack = [root];
    let stack2 = [];

    while (stack.length > 0) {
      let node = stack.pop();
      stack2.push(node);
      if (node.left) {
        stack.push(node.left);
      }
      if (node.right) {
        stack.push(node.right);
      }
    }

    while (stack2.length > 0) {
      let node = stack2.pop();
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }

    if (!callback) {
      return result;
    }
  }

  function height(node) {
    if (node === null) {
      return 0;
    }
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    // Return the greater height of the two subtrees plus 1 for the current node
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node, root = this.rootNode) {
    if (root === null) {
      return -1;
    }
    let dist = -1;

    if (
      root === node ||
      (dist = depth(node, root.left)) >= 0 ||
      (dist = depth(node, root.right)) >= 0
    ) {
      return dist + 1;
    }
    return dist;
  }

  function isBalanced() {
    let leftHeight = this.height(this.rootNode.left);
    let rightHeight = this.height(this.rootNode.right);

    let dif = Math.abs(leftHeight - rightHeight);

    if (dif <= 1) {
      return true;
    }
    return false;
  }

  function reBalance() {
    let array = this.inOrder(this.rootNode);
    this.rootNode = this.buildTree(array);

    return this.rootNode;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    buildTree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}
