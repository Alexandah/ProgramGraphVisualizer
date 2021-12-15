import graphviz
from utils import get_file_name_at_end_of_path

class PGraphVisualizer:
    def __init__(self, pgraph):
        self.pgraph = pgraph
    
    def visualize(self):
        graph = graphviz.Digraph(format='png')
        for node in self.pgraph.active_nodes.values():
            node_short_name = get_file_name_at_end_of_path(node.name)
            graph.node(node_short_name, node_short_name)
            for dest in [x for x in node.calls.values() if x in self.pgraph.active_nodes.values()]:
                dest_short_name = get_file_name_at_end_of_path(dest.name)
                graph.edge(dest_short_name, node_short_name)
        graph.render('graph.gv', view=True)
