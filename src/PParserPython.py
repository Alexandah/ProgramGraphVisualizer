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
        if filename.endswith(".py"):
            # print('parsing file defs: ' + filename)
            new_file_node = self.pgraph_builder.add_node(FileNode(filename))
            self.pgraph_builder.add_def(new_file_node, parent_dir_node)
            #No checking for nodes that files define in this version

    def parse_file_calls(self, filename):
        if filename.endswith(".py"):
            self.current_file = self.pgraph_builder.all_nodes[filename]
            # print('parsing file calls: ' + self.current_file.name)

            with open(filename, "r") as file:
                tree = ast.parse(file.read())
                self.visit(tree)

    def visit_ImportFrom(self, node):
        print('visiting import from ', node.module)
        if node.module in self.pgraph_builder.all_nodes:
            imported_file = self.pgraph_builder.all_nodes[node.module]
            self.pgraph_builder.add_call(self.current_file, imported_file)

    def visit_Import(self, node):
        for alias in node.names:
            print('visiting import ', alias.name)
            if alias.name in self.pgraph_builder.all_nodes:
                imported_file = self.pgraph_builder.all_nodes[alias.name]
                self.pgraph_builder.add_call(self.current_file, imported_file)