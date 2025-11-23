
const allocator = {
    crated: new Map(),
    createArray: function (len) {
        
    }
};

function nodeData(value, colour, l, r) {
    return {value, colour, l, r}
}

// function unidirectionalNode(tree, id, nodeData) {
//     return {
//         ...nodeData,
//         tree,
//         id,
//         getL: function () {
//             return nodeData.l == null ? null : unidirectionalNode(tree, nodeData.l, tree.nodes[nodeData.l]);
//         },
//         getR: function () {
//             return nodeData.r == null ? null : unidirectionalNode(tree, nodeData.r, tree.nodes[nodeData.r]);
//         }
//     }
// }

function biDirectionalNode(tree, parent, id, nodeData) {
    const self = {
        ...nodeData,
        id,
        getL: function () {
            return self.l == null
                ? null
                : biDirectionalNode(tree, self, self.l, tree.nodes[self.l]);
        },
        setL: function (lId) {
            if (self.l) throw new Error();
            tree.nodes[id].l = self.l = lId
        },
        getR: function () {
            return self.r == null
                ? null
                : biDirectionalNode(tree, self, self.r, tree.nodes[self.r]);
        },
        setR: function (lId) {
            if (self.r) throw new Error();
            tree.nodes[id].r = self.r = lId
        },
        getParent: function() {
            return parent;
        }
    }

    return self
}


const rbTree = {
    nodes: [],
    rootNode: -1,

    add: function(value) {
        const node = rbTree.find(value)
        if (!node) {
            rbTree.rootNode = 0;
            rbTree.nodes.push(nodeData(value, null, null, null))
            return
        }

        if (node.value == value) return;

        const id = rbTree.nodes.length
        rbTree.nodes.push(nodeData(value, null, null, null))
        if (node.value < value) {
            node.setR(id)
        } else {
            node.setL(id)
        }
    },

    contains: function(value) {
        const node = rbTree.find(value)
        return node != null && node.value == value
    },

    find: function(value) {
        if (rbTree.rootNode == -1) return null;

        var node = biDirectionalNode(
            rbTree, null, rbTree.rootNode, rbTree.nodes[rbTree.rootNode])

        while (node) {
            if (node.value < value) {
                const n = node.getR();
                if (n) node = n
                else break;
            } else if (node.value > value) {
                const n = node.getL();
                if (n) node = n
                else break;
            }
            else break;
        }

        return node
    }

};

for (let x = 1; x < 10; x++) {
    rbTree.add(x)
    console.log(x, rbTree.contains(x))
    console.log(x * 2, rbTree.contains(x * 2))
}








