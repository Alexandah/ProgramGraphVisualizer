from PNode import PNodeTypes

class PGraph:
    def __init__(self, root, all_nodes):
        self.root = root
        self.all_nodes = all_nodes

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