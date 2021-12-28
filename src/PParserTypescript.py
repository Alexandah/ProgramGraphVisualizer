from src.PParserInterface import PParserInterface
from src.PNode import FileNode
from src.utils import get_key_with_file_in_path, get_string_inside_quotes

class PParserTypescript(PParserInterface):
    def __init__(self, path):
        self.current_file = None
        PParserInterface.__init__(self, path)
    
    def parse_file_defs(self, filename, parent_dir_node):
        if filename.endswith(".ts") or filename.endswith(".tsx"):
            new_file_node = self.pgraph_builder.add_node(FileNode(filename))
            self.pgraph_builder.add_def(new_file_node, parent_dir_node)
            print('new_file_node: ' + new_file_node.name)
            #No checking for nodes that files define in this version

    def parse_file_calls(self, filename):
        if filename.endswith(".ts") or filename.endswith(".tsx"):
            self.current_file = self.pgraph_builder.all_nodes[filename]

            with open(filename, "r") as file:
                for line in file.readlines():
                    if line.startswith("import") and "from" in line:
                        path_imported = get_string_inside_quotes(line.split("from")[1].strip())
                        print(path_imported)
                        found_key = get_key_with_file_in_path(path_imported, self.pgraph_builder.all_nodes)
                        print('found key: ', found_key)
                        if found_key is not None:
                            imported_file = self.pgraph_builder.all_nodes[found_key]
                            self.pgraph_builder.add_call(self.current_file, imported_file)