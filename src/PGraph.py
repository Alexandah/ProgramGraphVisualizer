from PNode import DirNode, FileNode

class PGraph:
    def __init__(self, root, all_nodes):
        self.root = root
        self.all_nodes = all_nodes
        self.active_nodes = all_nodes
        self.mode = None

    def method_mode(self):
        pass

    def class_mode(self):
        pass

    def file_mode(self):
        self.active_nodes = {x.name:x for x in self.all_nodes.values() if isinstance(x, FileNode)}
        self.mode = 'file'

    def dir_mode(self):
        self.active_nodes = {x.name:x for x in self.all_nodes.values() if isinstance(x, DirNode)}
        self.mode = 'dir'

    def up(self):
        pass

    def down(self):
        pass