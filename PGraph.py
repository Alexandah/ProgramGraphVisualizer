from PNode import PNodeTypes

class PGraph:
    def __init__(self, root, all_nodes_dict):
        self.root = root
        self.all_nodes = [v for k,v in all_nodes_dict.items()]

    def get_dirs(self):
        return [v for v in self.all_nodes if v.type == PNodeTypes.DIR]

    def get_files(self):
        return [v for v in self.all_nodes if v.type == PNodeTypes.FILE]

    def get_classes(self):
        return [v for v in self.all_nodes if v.type == PNodeTypes.CLASS]

    def get_methods(self):
        return [v for v in self.all_nodes if v.type == PNodeTypes.METHOD]

    def method_mode(self):
        #return a PGraph with method node dependencies
        pass

    def class_mode(self):
        #return a PGraph with class node dependencies
        pass

    def file_mode(self):
        #return a PGraph with file node dependencies
        pass

    def dir_mode(self):
        #return a PGraph with dir node dependencies
        pass

    def up(self):
        #return a PGraph with the next highest level of nodes
        pass

    def down(self):
        #return a PGraph with the next lowest level of nodes
        pass