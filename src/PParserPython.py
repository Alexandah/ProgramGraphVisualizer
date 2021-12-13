from PParserInterface import PParserInterface
from PNode import FileNode
import ast
from utils import get_key_with_file_in_path

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
            print('parsing file calls: ' + self.current_file.name)

            with open(filename, "r") as file:
                tree = ast.parse(file.read())
                self.visit(tree)

    def visit_ImportFrom(self, node):
        print('visiting import from ', node.module)
        found_key = get_key_with_file_in_path(node.module, self.pgraph_builder.all_nodes)
        #handles the relative import case
        if found_key is None:
            for alias in node.names:
                found_key = get_key_with_file_in_path(alias.name, self.pgraph_builder.all_nodes)
                if found_key is not None:
                    break

        print('found key: ', found_key)
        if found_key is not None:
            print('adding call')
            imported_file = self.pgraph_builder.all_nodes[found_key]
            self.pgraph_builder.add_call(self.current_file, imported_file)

    def visit_Import(self, node):
        for alias in node.names:
            print('visiting import ', alias.name)
            found_key = get_key_with_file_in_path(alias.name, self.pgraph_builder.all_nodes)
            print('found key: ', found_key)
            if found_key is not None:
                print('adding call')
                imported_file = self.pgraph_builder.all_nodes[found_key]
                self.pgraph_builder.add_call(self.current_file, imported_file)