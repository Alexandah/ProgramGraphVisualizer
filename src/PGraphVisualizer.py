import graphviz
from PGraph import PGraph
from PNode import DirNode, FileNode
from PGraphBuilder import PGraphBuilder

class PGraphVisualizer:
    def __init__(self, pgraph):
        self.pgraph = pgraph
    
    def visualize(self):
        graph = graphviz.Digraph(format='png')
        for node in self.pgraph.active_nodes.values():
            graph.node(node.name, node.name)
            for dest in node.calls.values():
                graph.edge(node.name, dest.name)
        graph.render('graph.gv', view=True)

if __name__ == '__main__':
    root = DirNode('root')
    a = FileNode('a')
    b = FileNode('b')
    builder = PGraphBuilder()
    builder.add_node(root)
    builder.add_node(a)
    builder.add_node(b)
    builder.add_def(a, root)
    builder.add_def(b, root)
    builder.add_call(a,b)
    pgraph = builder.build_pgraph()
    pgraph.dir_mode()
    viz = PGraphVisualizer(pgraph)
    viz.visualize()