from PParserInterface import PParserInterface
from PNode import PNode, PNodeTypes
import inspect
import os

class PParserPython(PParserInterface):
    def check_node(self, node):

    def parse(self):
        self.root = None
        self.nodes = {}
        self.context = []
        for rootdir, dirs, files in os.walk(self.path):
            if self.root is None:
                self.root = self.check_node(rootdir)

    def parse_dir(self, dir):
        pass

    def parse_file(self, file):
        pass

    def parse_class(self, file):
        pass
    
    def parse_method(self, file):
        pass


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
