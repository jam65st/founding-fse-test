# Funding Full Stack Engineer

## General Requirements:

- Use any programming language of your choice.
- Make reasonable assumptions if the question seems ambiguous.

## Test Duties:

### 1 BST

Design a data structure for a binary search tree where each node has a key and a value,
and implement the following operations:

- Search for a node, given as input a key, and output the value found on the
  searched node (or Null if such a node is not found)
- Insert a node, given as input a (key, value) pair
- Delete all nodes having a certain key, given as input a key
- Print all keys in the tree in sorted order
- Given a reference to a node n in the tree, find the successor node, i.e., the node
  whose key is the smallest key greater than the key in node n (assuming all keys
  in the tree have distinct values)

### 2 Represent HTML

Given an HTML document, write code to represent the contents of the HTML document (seen as a tree) in the following data
structure. This syntax is Python. Modify the syntax appropriately if you’d like to work with a different programming
language.

```Python
class Node:
    tagName: Optional[str]  # the name of the HTML tag represented in this node
    text: Optional[str]  # the text within this HTML tag
    children: List[‘Node
    '] # the list of nodes immediately within (children of) this HTML tag
    attributeMap: Dict[str, str]  # dictionary of (key, value) pairs of attributes in this HTML
    tag
    parent: Optional['Node']  # parent node for this HTML tag
```

### 3 Integer Subset

Write code to generate all subsets of a set of integers (assuming the size of the set is reasonably small, say less than
20 elements). Note that you must enumerate all 2^n subsets, with each subset listed exactly once.

### 4 API

Design and write REST API with express/nodejs to support CRUD operation to manage a list of users, Assume the user is
defined as following:

```javascript
User = {
	Id: string,
	Name: string,
	Email: string
}
```

And we can manage the users in memory, if you can sketch the code to work with mongodb that would be a plus but not
required.<br> The operations we want to support are add/remove user, get user by id, query user by name or email.

### 5 Convert Numbers

Implement these two functions: from_decimal, to_decimal. Then run the code (code in
main is already written, running which will print the results and check the correctness of
your code). Ensure you stick to the interfaces, simply implement the interfaces of these
functions. If Python is unfamiliar to you, write this in your programming language by
converting the interfaces and main to your programming language.

````Python
from typing import List, Sequence

def to_decimal(base: int, base_number: Sequence[int]) -> int:
    '''
    Given the base (eg: 2) and the base_number (eg: [1, 0, 1, 1]),
    return the decimal representation (in this case, answer should be 11).
    '''

def from_decimal(base: int, decimal_number: int) -> Sequence[int]:
    '''
    Given the base (eg: 2) and the decimal_number (eg: 11),
    return the base representation (in this case, answer should be [1, 0, 1, 1])
    '''

if __name__ == '__main__':
    base: int = 7
    base_number: Sequence[int] = [5, 1, 6, 0, 3, 6, 2]
    print(f"Given number in base {base:d} is {base_number}")
    decimal_number: int = to_decimal(base, base_number)
    print(f"Converted decimal number is {decimal_number}")
    base_number_recover: Sequence[int] = from_decimal(base, decimal_number)
    print(f"Recovered number in base {base:d} is {base_number_recover}")
    correct: bool = base_number == base_number_recover
    print(f"Is the code working correctly? {correct}")
```
