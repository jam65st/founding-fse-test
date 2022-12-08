# Instructions for BST

Design a data structure for a binary search tree where each node has a key and a value,
and implement the following operations:

* **Note 1:** Language: *TypeScript*
* **Note 2:** I assumed that the structure with **key** and **value**, like an **Object**, and it is understood such as <code>{ key: n, value: any-content }</code>
* **Note 3** Code is commented and documented in both classes: <code>BSTNode</code> and <code>BST</code>

- [X] **Search for a node**, given as input a key, and output the value found on the
  searched node (or Null if such a node is not found)
	- in class <code>BST.search( key )</code>


- [X] **Insert a node**, given as input a (key, value) pair
	- in class <code>BST.insert( key, value )</code>


- [X] **Delete** all nodes having a certain key, given as input a key
	- in class <code>BST.delete( key )</code>


- [X] **Print all** keys in the tree in sorted order
	- in class <code>BST.print( type )</code>
  - Also, you can **print values** changing the type between: *'key'* or *'value'*


- [X] Given a reference to a node n in the tree, **find the successor node**, i.e., the node whose key is the smallest key greater than the key in node n (assuming all keys in the tree have distinct values)
	- in class <code>BST.findSuccessor( key, strict )</code>
  - **strict** is an extra implementation parameter, in no strict mode, if the node hasn't right edge (higher) return the same node, in strict mode this absense will return a null node. 

Thanks:
Jaime A. **Mendez M**