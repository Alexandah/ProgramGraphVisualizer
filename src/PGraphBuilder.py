from PGraph import PGraph

class PGraphBuilder:
    def __init__(self):
        self.root = None
        self.all_nodes = {}

    def find_common_parent(self, x, y):
        if x.definedby is y.definedby:
            return x.definedby

        xfound = set()
        yfound = set()
        currentx = x
        currenty = y
        #Guaranteed to terminate because the graph is a tree
        while True:
            xfound.add(currentx.get_parent())
            yfound.add(currenty.get_parent())
            common_element = xfound.intersection(yfound) 
            if len(common_element) > 0:
                return common_element.pop()
            currentx = currentx.get_parent()
            currenty = currenty.get_parent()
        
    def add_node(self, node):
        if self.root is None:
            self.root = node
        if node.name not in self.all_nodes:
            self.all_nodes[node.name] = node
        return self.all_nodes[node.name]
    
    def add_def(self, node, definedby):
        if node.name in self.all_nodes and definedby.name in self.all_nodes:
            definedby.add_def(node)

    #Ensures that parent nodes keep track of who their children call
    def add_call(self, node, called_node):
        if node.name in self.all_nodes and called_node.name in self.all_nodes:
            common_ancestor = self.find_common_parent(node, called_node)
            def unique_node_ancestry(n):
                current_node = n
                while current_node is not common_ancestor:
                    yield current_node
                    current_node = current_node.get_parent()
            
            for current_caller_node in unique_node_ancestry(node):
                for current_node_to_call in unique_node_ancestry(called_node):
                    current_caller_node.add_call(current_node_to_call)

    def build_pgraph(self):
        return PGraph(self.root, self.all_nodes)

