import graphviz
from utils import get_file_name_at_end_of_path
from PNode import DirNode, FileNode

class PGraphVisualizer:
    def __init__(self, pgraph):
        self.pgraph = pgraph
        self.group_by_dir = True

    def build_dir_subgraphs(self, node, parent_dir_graph):
        if isinstance(node, FileNode):
            node_short_name = get_file_name_at_end_of_path(node.name)
            parent_dir_graph.node(node_short_name, node_short_name)
            return
        elif isinstance(node, DirNode):
            with parent_dir_graph.subgraph(name='cluster_'+node.name) as sub:
                sub.attr(label=get_file_name_at_end_of_path(node.name))
                #define the nodes in this subgraph
                for defined_node in [x for x in node.defines.values() if x in self.pgraph.active_nodes.values()]:
                    node_short_name = get_file_name_at_end_of_path(defined_node.name)
                    sub.node(node_short_name, node_short_name)
                #do for child dirs
                for defined_node in node.defines.values():
                    self.build_dir_subgraphs(defined_node, sub)
    
    def visualize(self):
        graph = graphviz.Digraph(format='png')
        if self.group_by_dir and self.pgraph.mode != 'dir':
            self.build_dir_subgraphs(self.pgraph.root, graph)
            for node in self.pgraph.active_nodes.values():
                node_short_name = get_file_name_at_end_of_path(node.name)
                for dest in [x for x in node.calls.values() if x in self.pgraph.active_nodes.values()]:
                    dest_short_name = get_file_name_at_end_of_path(dest.name)
                    graph.edge(dest_short_name, node_short_name)
        else:
            for node in self.pgraph.active_nodes.values():
                node_short_name = get_file_name_at_end_of_path(node.name)
                graph.node(node_short_name, node_short_name)
                for dest in [x for x in node.calls.values() if x in self.pgraph.active_nodes.values()]:
                    dest_short_name = get_file_name_at_end_of_path(dest.name)
                    graph.edge(dest_short_name, node_short_name)
        graph.render('graph.gv', view=True)
