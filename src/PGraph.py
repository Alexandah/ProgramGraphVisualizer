from src.PNode import DirNode, FileNode
from src.utils import get_key_with_file_in_path

class PGraph:
    def __init__(self, root, all_nodes):
        self.root = root
        self.all_nodes = all_nodes
        self.active_nodes = {k: v for k, v in self.all_nodes.items()}
        self.mode = None

    def deactivate_family(self, parent_name):
        def familicide(ancestor):
            for definition in ancestor.defines.values():
                familicide(definition)
            if ancestor.name in self.active_nodes:
                self.active_nodes.pop(ancestor.name)

        key = get_key_with_file_in_path(parent_name, self.active_nodes)
        if key is not None:
            familicide(self.active_nodes[key])
            self.mode = '?'

    def deactivate_by_name(self, filename):
        key = get_key_with_file_in_path(filename, self.active_nodes)
        if key is not None:
            self.active_nodes.pop(key)
            self.mode = '?'

    def activate_by_name(self, filename):
        key = get_key_with_file_in_path(filename, self.active_nodes)
        if key is not None:
            self.active_nodes[key] = self.all_nodes[key]
            self.mode = '?'

    def deactivate_type(self, type):
        self.active_nodes = {name:node for name,node in self.active_nodes.items() if not isinstance(node, type)}
        self.mode = '?'

    def activate_type(self, type):
        self.active_nodes |= {name:node for name,node in self.all_nodes.items() if isinstance(node, type)}
        self.mode = '?'

    def method_mode(self):
        pass

    def class_mode(self):
        pass

    def file_mode(self):
        self.deactivate_type(DirNode)
        self.activate_type(FileNode)
        self.mode = 'file'

    def dir_mode(self):
        self.deactivate_type(FileNode)
        self.activate_type(DirNode)
        self.mode = 'dir'

    def up(self):
        pass

    def down(self):
        pass