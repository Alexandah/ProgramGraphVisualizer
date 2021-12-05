from PParserInterface import PParserInterface
from PNode import ClassNode, MethodNode, ConstantNode, FileNode
import inspect
import os
import ast

class PParserPython(PParserInterface, ast.NodeVisitor):
    def __init__(self, path):
        super().__init__(path)
        self.which_pass = 0
    
    def parse_file(self, filename) -> FileNode:
        if filename.endswith(".py"):
            module = __import__(filename[:filename.index(".py")])
            new_file_node = FileNode(filename)
            new_file_node = self.check_in_xor_get_node(new_file_node)
            self.push_context(new_file_node)

            with open(filename, "r") as file:
                tree = ast.parse(file.read())
                #Pass 1 records all defs
                self.visit(tree)
                self.which_pass += 1
                #Pass 2 records all calls, extensions, and decorators
                #still need to handle the rest of pass 2, all we do rn is record calls
                self.visit(tree)

            self.pop_context()

    def visit_ClassDef(self, node):
        new_class = ClassNode(node.name)
        new_class = self.check_in_xor_get_node(new_class)

        self.push_context(new_class)

        if self.which_pass == 1:
            for base in node.bases:
                new_class.add_extends(base)
        self.generic_visit(node)

        self.pop_context()

    def visit_FunctionDef(self, node):
        new_method = MethodNode(node.name)
        if self.current_context.can_def(new_method):
            new_method = self.check_in_xor_get_node(new_method)

        self.push_context(new_method)

        self.generic_visit(node)

        self.pop_context()

    #This one looks a bit dubious, fix it
    def visit_Assign(self, node):
        for target in node.targets:
            if isinstance(target, ast.Name):
                new_var = ConstantNode(target.id)
                self.constants[target.id] = new_var 
            elif isinstance(target, ast.Attribute):
                new_var = ConstantNode(target.attr)
                self.constants[target.attr] = new_var 
            else:
                raise Exception("Unsupported target type: " + str(type(target)))

            if type(self.current_context) is ClassNode:
                self.classes[self.current_context.name].add_def(new_var)

    def visit_Call(self, node):
        if self.which_pass == 0:
            return

        if isinstance(node, ast.Name):
            node_name = node.id
        elif isinstance(node, ast.Attribute):
            node_name = node.attr
        if node_name in self.all_nodes:
            found_node = self.all_nodes[node_name]
            if self.current_context.can_call(found_node):
                self.current_context.add_call(found_node)
        else:
            raise Exception("Could not find node " + node_name)