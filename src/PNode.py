from abc import ABC, abstractmethod
class PNode(ABC):
    def __init__(self, name, definedby=None, defines=[], calls=[]):
        if any([not self.can_def(x) for x in defines]):
            raise Exception("Invalid definition set")
        if any([not self.can_call(x) for x in calls]):
            raise Exception("Invalid call set")
        self.name = name
        self.definedby = definedby
        self.defines = {x.name:x for x in defines}
        self.calls = {x.name:x for x in calls}

    def get_parent(self):
        if self.definedby is None:
            return self
        return self.definedby

    def add_def(self, definition):
        if(not self.can_def(definition)):
            raise Exception("Invalid definition add attempt w/ " + str(definition.name))
        self.defines[definition.name] = definition
        definition.definedby = self

    def add_call(self, called_node):
        if(not self.can_call(called_node)):
            raise Exception("Invalid call add attempt w/ " + str(called_node.name))
        self.calls[called_node.name] = called_node

    def __str__(self):
        return self.name + ': ' + str(self.defines) + ' ' + str(self.calls)

    @abstractmethod
    def can_def(self, node) -> bool:
        pass

    @abstractmethod
    def can_call(self, node) -> bool:
        pass

class DirNode(PNode):
    def __init__(self, name, definedby= None, defines=[], calls=[]):
        super().__init__(name, definedby, defines, calls)

    def can_def(self, node) -> bool:
        return type(node) in [DirNode, FileNode] 

    def can_call(self, node) -> bool:
        return isinstance(node, PNode)

class FileNode(PNode):
    def __init__(self, name, definedby= None, defines=[], calls=[]):
        super().__init__(name, definedby, defines, calls)

    def can_def(self, node) -> bool:
        return False

    def can_call(self, node) -> bool:
        return isinstance(node, PNode)