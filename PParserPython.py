from PParserInterface import PParserInterface
from PNode import PNode, PNodeTypes
import inspect
import os

class PParserPython(PParserInterface):
    def __init__(self, path):
        super().__init__(path)
        self.root = None
        self.all_nodes = {}
        self.dirs = []
        self.files = []
        self.classes = []
        self.methods = []
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

    def get_type(self, item):
        if inspect.ismodule(item):
            return PNodeTypes.FILE
        elif inspect.isclass(item):
            return PNodeTypes.CLASS
        elif inspect.isfunction(item):
            return PNodeTypes.METHOD
        else:
            return PNodeTypes.DIR

    def add_node(self, item, parent):
        name = item.__name__ if hasattr(item, '__name__') else item
        type = self.get_type(item)
        new_node = PNode(name, parent, type)
        if parent != None: 
            parent.children += [new_node]

        self.all_nodes[id(item)] = new_node
        if new_node.type == PNodeTypes.DIR:
            self.dirs += [new_node]
        elif new_node.type == PNodeTypes.FILE:
            self.files += [new_node]
        elif new_node.type == PNodeTypes.CLASS:
            self.classes += [new_node]
        elif new_node.type == PNodeTypes.METHOD:
            self.methods += [new_node]

        return new_node

    def handle_node(self, item):
        if id(item) in self.all_nodes:
            return self.all_nodes[id(item)]
        elif item != None:
            return self.add_node(item, self.current_context)
        else:
            return None

    def parse(self):
        for rootdir, dirs, files in os.walk(self.path):
            current_dir = self.handle_node(rootdir)
            if self.root is None:
                self.root = current_dir

            self.push_context(current_dir)
            
            for dir in dirs:
                dir_node = self.handle_node(dir)

            for file in files:
                if file.endswith(".py"):
                    module = __import__(file[:file.index(".py")])
                    file_node = self.handle_node(module)
                    self.push_context(file_node)
                    file_node.children += self.parse_classes_and_methods(module)
                    self.pop_context()

            self.pop_context()
            
            
    def parse_classes_and_methods(self, module):
        pass
        