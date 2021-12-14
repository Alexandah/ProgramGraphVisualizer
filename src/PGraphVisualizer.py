import graphviz

class PGraphVisualizer:
    def __init__(self, pgraph):
        self.pgraph = pgraph
    
    def visualize(self):
        graph = graphviz.Digraph(format='png')
        for node in self.pgraph.active_nodes.values():
            graph.node(node.name, node.name)
            for dest in node.defines:
                graph.edge(node.name, dest.name)
        graph.render('graph.gv', view=True)
