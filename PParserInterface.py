from abc import ABC, abstractmethod
from PNode import DirNode, FileNode, ClassNode, MethodNode, ConstantNode 
import os

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

    def add_node(self, node):
        self.all_nodes[node.name] = node
        if self.current_context != None:
            self.current_context.add_def(node)

    def check_in_xor_get_node(self, node):
        if node.name in self.all_nodes:
            return self.all_nodes[node.name]
        else:
            return self.add_node(node)

    def __call__(self):
        return self.parse()

    def parse(self):
        for rootdir, dirs, files in os.walk(self.path):
            current_dir = self.check_in_xor_get_node(DirNode(rootdir))
            if self.root == None:
                self.root = current_dir
            self.push_context(current_dir)

            for dir in dirs:
                dir_node = self.check_in_xor_get_node(DirNode(os.path.join(rootdir, dir)))

            for file in files:
                file_node = self.check_in_xor_get_node(self.parse_file(os.path.join(rootdir, file)))

    @abstractmethod
    def parse_file(self, file) -> FileNode:
        pass