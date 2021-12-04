from PParserInterface import PParserInterface
from PNode import ClassNode, MethodNode, ConstantNode, FileNode
import inspect
import os
import ast

class PParserPython(PParserInterface):
    def __init__(self, path):
        super().__init__(path)
    
    def parse_file(self, filename):
        if filename.endswith(".py"):
            with open(filename, "r") as file:
                tree = ast.parse(file.read())

class ASTAnalyzer(ast.NodeVisitor):
    def __init__(self):
        self.classes = {}
        self.methods = {}
        self.constants = {}
        self.files = {}

    def visit_ClassDef(self, node):
        self.classes[node.name] = ClassNode(node.name)
        for base in node.bases:
            self.classes[node.name].add_extends(base)

    def visit_FunctionDef(self, node):
        self.methods[node.name] = MethodNode(node.name)

    def visit_Assign(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name):
                self.constants[target.id] = ConstantNode(target.id)
            elif isinstance(target, ast.Attribute):
                self.constants[target.attr] = ConstantNode(target.attr)
            else:
                raise Exception("Unsupported target type: " + str(type(target)))

    def visit_Call(self, node):
        if isinstance(node.func, ast.Attribute):
            if node.func.attr in self.methods:
                self.methods[node.func.attr].add_call()
            elif node.func.attr in self.constants:
                self.constants[node.func.attr].add_call()

if __name__ == "__main__":
    analyzer = ASTAnalyzer()
    for root, dirs, files in os.walk("."):
        for file in files:
            if file == "PParserPython.py":
                print(analyzer.visit(ast.parse(open(file).read())))

