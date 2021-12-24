from src.PParserInterface import PParserInterface
from src.PNode import FileNode
import ast
from src.utils import get_key_with_file_in_path, get_module_name

class PParserPython(PParserInterface, ast.NodeVisitor):
    def __init__(self, path):
        self.current_file = None
        PParserInterface.__init__(self, path)
        ast.NodeVisitor.__init__(self)
    
    def parse_file_defs(self, filename, parent_dir_node):
        if filename.endswith(".py"):
            new_file_node = self.pgraph_builder.add_node(FileNode(filename))
            self.pgraph_builder.add_def(new_file_node, parent_dir_node)
            #No checking for nodes that files define in this version

    def parse_file_calls(self, filename):
        if filename.endswith(".py"):
            self.current_file = self.pgraph_builder.all_nodes[filename]

            with open(filename, "r") as file:
                tree = ast.parse(file.read())
                self.visit(tree)

    def visit_ImportFrom(self, node):
        #determines import based on the actual stuff imported
        #if the aliases aren't registered, then use the item in the from
        found_key = None
        for alias in node.names:
            found_key = get_key_with_file_in_path(alias.name+'.py', self.pgraph_builder.all_nodes)
            if found_key is not None:
                break

        if found_key is None:
            module_name = get_module_name(node.module)+'.py'
            found_key = get_key_with_file_in_path(module_name, self.pgraph_builder.all_nodes)

        if found_key is not None:
            imported_file = self.pgraph_builder.all_nodes[found_key]
            self.pgraph_builder.add_call(self.current_file, imported_file)

    def visit_Import(self, node):
        for alias in node.names:
            found_key = get_key_with_file_in_path(alias.name, self.pgraph_builder.all_nodes)
            if found_key is not None:
                imported_file = self.pgraph_builder.all_nodes[found_key]
                self.pgraph_builder.add_call(self.current_file, imported_file)