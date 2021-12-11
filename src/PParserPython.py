from PParserInterface import PParserInterface
from PNode import FileNode
import inspect
import os
import ast

class PParserPython(PParserInterface, ast.NodeVisitor):
    def __init__(self, path):
        self.current_file = None
        PParserInterface.__init__(self, path)
        ast.NodeVisitor.__init__(self)
    
    def parse_file_defs(self, filename, parent_dir_node):
        print('fucking daddy')
        if filename.endswith(".py"):
            new_file_node = FileNode(filename)
            self.pgraph_builder.add_node(new_file_node)
            self.pgraph_builder.add_def(new_file_node, parent_dir_node)
            #No checking for nodes that files define in this version

    def parse_file_calls(self, filename):
        print('fucking mommy')
        if filename.endswith(".py"):
            print(filename)
            self.current_file = self.pgraph_builder.all_nodes[filename]

            with open(filename, "r") as file:
                tree = ast.parse(file.read())
                self.visit(tree)

    def visit_ImportFrom(self, node):
        if node.module in self.pgraph_builder.all_nodes:
            imported_file = self.pgraph_builder.all_nodes[node.module]
            self.pgraph_builder.add_call(self.current_file, imported_file)

    def visit_Import(self, node):
        for alias in node.names:
            if alias.name in self.pgraph_builder.all_nodes:
                imported_file = self.pgraph_builder.all_nodes[alias.name]
                self.pgraph_builder.add_call(self.current_file, imported_file)