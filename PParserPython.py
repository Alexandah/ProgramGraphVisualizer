from PParserInterface import PParserInterface
from PNode import ClassNode, MethodNode, ConstantNode, FileNode
import inspect
import os

class PParserPython(PParserInterface):
    def __init__(self, path):
        super().__init__(path)
    
    def get_contained_nodes(self, obj):
        classes = {}
        methods = {}
        constants = {}
        for item in dir(obj):
            attribute = getattr(obj, item)
            if inspect.isclass(attribute):
                if type(self.current_context) is ClassNode:
                    continue
                classes[item] = attribute
            elif inspect.ismethod(attribute):
                if type(self.current_context) is MethodNode:
                    continue
                methods[item] = attribute
            elif not "_" in item:
                constants[item] = {'val': attribute, 'name': item}
        return {
            'classes': classes,
            'methods': methods,
            'constants': constants
        }

    def parse_file(self, file) -> FileNode:
        if file.endswith('.py'):
            module = __import__(file[:file.index('.py')])
            contains = self.get_contained_nodes(module)
            name = module.__name__
            defines = []
            calls = []

            file_node = FileNode(name)
            for cls in classes:
                defines.append(self.parse_class(cls))
                    
    def parse_class(self, _class) -> ClassNode:
        contains = self.get_contained_nodes(_class)
        name = _class.__name__
        defines = []
        calls = []
        extends = []
        pass

    def parse_method(self, method) -> MethodNode:
        contains = self.get_contained_nodes(method)
        name = method.__name__
        calls = []
        pass

    def parse_constant(self, constant) -> ConstantNode:
        name = constant['name']
        self.check_in_xor_get_node(ConstantNode(name))