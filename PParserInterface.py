from abc import ABC, abstractmethod
from PNode import PNode 

class PParserInterface(ABC):
    def __init__(self, path):
        self.path = path
        self.root = None
        self.all_nodes = {}
        self.context_stack = []
    
    @property
    def current_context(self):
        if self.context_stack != []:
            return self.context_stack[-1]
        return None

    def push_context(self, context):
        self.context_stack += [context]

    def pop_context(self):
        return self.context_stack.pop()

    @abstractmethod
    def get_type(self, item):
        pass

    def add_node(self, item, parent):
        name = item.__name__ if hasattr(item, '__name__') else item
        type = self.get_type(item)
        new_node = PNode(name, parent, type)
        if parent != None: 
            parent.children += [new_node]
        self.all_nodes[id(item)] = new_node
        return new_node

    def get_node(self, item):
        if id(item) in self.all_nodes:
            return self.all_nodes[id(item)]
        elif item != None:
            return self.add_node(item, self.current_context)
        else:
            return None

    @abstractmethod
    def parseDirsAndFiles(self, path):
        pass

    @abstractmethod
    def parseClassesAndMethods(self, file):
        pass
