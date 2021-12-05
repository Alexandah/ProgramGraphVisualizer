from abc import ABC, abstractmethod
class PNode(ABC):
    def __init__(self, name, defines=[], calls=[]):
        self.name = name
        self.defines = set(defines)
        self.calls = set(calls)

    def add_def(self, definition):
        if(not self.can_def(definition)):
            raise Exception("Invalid definition add attempt")
        self.defines.add(definition)

    def add_call(self, called_node):
        if(not self.can_call(called_node)):
            raise Exception("Invalid call add attempt")
        self.calls.add(called_node)

    @abstractmethod
    def can_def(self, node) -> bool:
        pass

    @abstractmethod
    def can_call(self, node) -> bool:
        pass

class DirNode(PNode):
    def __init__(self, name, defines=[], calls=[]):
        if any([not self.can_def(x) for x in defines]):
            raise Exception("Dir defines must be only Dir or File")
        if any([not self.can_call(x) for x in calls]):
            raise Exception("Dir calls must be only PNodes")
        super().__init__(name, defines, calls)

    def can_def(self, node) -> bool:
        return type(node) in [DirNode, FileNode] 

    def can_call(self, node) -> bool:
        return isinstance(node, PNode)

class FileNode(PNode):
    def __init__(self, name, defines=[], calls=[]):
        if any([not self.can_def(x) for x in defines]):
            raise Exception("File defines must only be Class, Method or Constant")
        if any([not self.can_call(x) for x in calls]):
            raise Exception("File calls must only be PNodes")
        super().__init__(name, defines, calls)

    def can_def(self, node) -> bool:
        return type(node) in [DirNode, FileNode] 

    def can_call(self, node) -> bool:
        return isinstance(node, PNode)

class ClassNode(PNode):
    def __init__(self, name, defines=[], calls=[], extends=[]):
        if any([not self.can_def(x) for x in defines]):
            raise Exception("Class defines must only be Method or Constant")
        if any([not self.can_call(x) for x in calls]):
            raise Exception("Class calls must only be Class, Method or Constant")
        super().__init__(name, defines, calls)
        if any([not self.can_extends(x) for x in extends]):
            raise Exception("Classes must only extend other classes")
        self.extends = set(extends)

    def add_extends(self, extends_class):
        if not self.can_extends(extends_class):
            raise Exception("Classes must only extend other classes")
        self.extends.add(extends_class)

    def can_def(self, node) -> bool:
        return type(node) in [MethodNode, ConstantNode]

    def can_call(self, node) -> bool:
        return type(node) in [ClassNode, MethodNode, ConstantNode]

    def can_extends(self, node) -> bool:
        return type(node) in [ClassNode]

class MethodNode(PNode):
    def __init__(self, name, calls=[], decorates=[]):
        if any([not self.can_call(x) for x in calls]):
            raise Exception("Method calls must only be Class, Method or Constant")
        if any([not self.can_decorate(x) for x in decorates]):
            raise Exception("Methods may only decorate Methods")
        super().__init__(name, [], calls)
        self.decorates = set(decorates)

    def add_decorates(self, decorates_method):
        if not self.can_decorate(decorates_method):
            raise Exception("Methods may only decorate Methods")
        self.decorates.add(decorates_method)

    def can_def(self, node) -> bool:
        return False

    def can_call(self, node) -> bool:
        return type(node) in [ClassNode, MethodNode, ConstantNode]

    def can_decorate(self, node) -> bool:
        return type(node) in [MethodNode]

class ConstantNode(PNode):
    def __init__(self, name, calls=[]):
        if any([not self.can_call(x) for x in calls]):
            raise Exception("Constant calls must only be Class, Method or Constant")
        super().__init__(name, [], calls)

    def can_def(self, node) -> bool:
        return False

    def can_call(self, node) -> bool:
        return type(node) in [ClassNode, MethodNode, ConstantNode]