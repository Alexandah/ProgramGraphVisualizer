from PParserInterface import PParserInterface
from PNode import PNode, PNodeTypes
import inspect
import os

class PParserPython(PParserInterface):
    def get_type(self, item):
        if inspect.ismodule(item):
            return PNodeTypes.FILE
        elif inspect.isclass(item):
            return PNodeTypes.CLASS
        elif inspect.isfunction(item):
            return PNodeTypes.METHOD
        else:
            return PNodeTypes.DIR

    def parseDirsAndFiles(self, path):
        for rootdir, dirs, files in os.walk(path):
            if self.root == None:
                self.root = self.get_node(rootdir)

            self.push_context(rootdir)

            for dir in dirs:
                dir_node = self.get_node(dir)

            for file in files:
                if file.endswith(".py"):
                    module = __import__(file[:file.index(".py")])
                    file_node = self.get_node(module)
                    self.push_context(file_node)
                    file_node.children += self.parseClassesAndMethods(module)
                    self.pop_context()

    def parseClassesAndMethods(self, module):
        class_and_method_nodes = []
        for attr in dir(module):
            if '__' in attr:
                continue

            item = getattr(module, attr)
            if inspect.isclass(item):
                class_node = self.get_node(item)
                self.push_context(class_node)
                methods = self.parseMethods(item)
                class_node.children += methods
                self.pop_context()
                class_and_method_nodes.append(class_node)
                class_and_method_nodes += methods
            elif inspect.isfunction(item):
                method_node = self.get_node(item)

    def parseMethods(self, class_obj):
        method_nodes = []
        for attr in dir(class_obj):
            if '__' in attr:
                continue

            item = getattr(class_obj, attr)
            if inspect.isfunction(item):
                method_node = self.get_node(item)
                method_nodes.append(method_node)

        return method_nodes


    #or perhaps refactor and do this somewhere above
    def markSubclasses(self):
        pass

    # def parseClassesAndMethods(self, file):
    #     file_node = self.all_nodes[file]
    #     current_class_node = None
    #     current_method_node = None

    #     for line in open(file.name, 'r'):
    #         if line.startswith("class"):
    #             #fix this to handle the case of non-extended classes
    #             class_string_with_paren = line.split(' ')[1]
    #             class_name_and_parent = class_string_with_paren.split('(')
    #             class_name = class_name_and_parent[0]
    #             class_parent_name = class_name_and_parent[2] if len(class_name_and_parent) > 2 else None

    #             if class_name in self.all_nodes:
    #                 class_node = self.all_nodes[class_name]
    #             else:
    #                 class_node = self.add_node(class_name, file_node, PNodeTypes.CLASS)
    #             file_node.children.append(class_node)
    #             current_class_node = class_node

    #             #figure out how to handle this
    #             class_parent_node = None
    #             if class_parent_name in self.all_nodes:
    #                 class_parent_node = self.all_nodes[class_parent_name]
    #             elif class_parent_name != None:
    #                 class_parent_node = self.add_node(class_name, type=PNodeTypes.CLASS)

    #         elif line.startswith("def"):
    #             def_string_with_paren = line.split(' ')[1]
    #             def_name = def_string_with_paren.split('(')[0]

    #             if def_name in self.all_nodes:
    #                 method_node = self.all_nodes[def_name]
    #             else:
    #                 method_node = self.add_node(def_name, file_node, PNodeTypes.METHOD)
    #             current_method_node = method_node

    #         for word in line.split(' ').split('('):
    #             #if you encounter a called class/method you already know about, mark it
    #             #if you encounter a called class/method that is unknown, add it to the list of all nodes, and prepare to fill in info about it later
    #             pass


