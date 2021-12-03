class PNode:
    def __init__(self, name, defines=[], calls=[]):
        self.name = name
        self.defines = set(defines)
        self.calls = set(calls)

    def add_def(self, definition):
        self.defines.add(definition)

    def add_call(self, called_node):
        self.calls.add(called_node)

random_constant = 69

class DirNode(PNode):
    def __init__(self, name, defines=[], calls=[]):
        if any([type(x) != DirNode and type(x) != FileNode for x in defines]):
            raise Exception("Dir defines must be only Dir or File")
        super().__init__(name, defines, calls)

class FileNode(PNode):
    def __init__(self, name, defines=[], calls=[]):
        if any([type(x) != ClassNode and type(x) != MethodNode and type(x) != ConstantNode for x in defines]):
            raise Exception("File defines must only be Class, Method or Constant")
        super().__init__(name, defines, calls)

class ClassNode(PNode):
    def __init__(self, name, defines=[], calls=[], extends=[]):
        if any([type(x) != MethodNode and type(x) != ConstantNode for x in defines]):
            raise Exception("Class defines must only be Method or Constant")
        super().__init__(name, defines, calls)
        self.extends = set(extends)

    def add_extends(self, extends_class):
        self.extends.add(extends_class)

class MethodNode(PNode):
    def __init__(self, name, defines=[], calls=[], decorates=[]):
        if any([type(x) != ConstantNode for x in defines]):
            raise Exception("Method defines must only be Constant")
        super().__init__(name, defines, calls)
        self.decorates = set(decorates)

    def add_decorates(self, decorates_method):
        self.decorates.add(decorates_method)

class ConstantNode(PNode):
    def __init__(self, name, calls=[]):
        super().__init__(name, [], calls)
