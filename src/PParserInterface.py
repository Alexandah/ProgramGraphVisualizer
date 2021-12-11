from abc import ABC, abstractmethod
from PNode import DirNode, FileNode 
from PGraphBuilder import PGraphBuilder
import os

class PParserInterface(ABC):
    def __init__(self, path):
        self.path = path
        self.pgraph_builder = PGraphBuilder()

    def __call__(self):
        return self.parse()

    def parse(self):
        #First pass handles defs
        for rootdir, dirs, files in os.walk(self.path):
            print(rootdir)
            rootdirnode = DirNode(rootdir)
            self.pgraph_builder.add_node(rootdirnode)
            for dir in dirs:
                dirnode = DirNode(os.path.join(rootdir, dir))
                self.pgraph_builder.add_node(dirnode)
                self.pgraph_builder.add_def(dirnode, rootdirnode)

            for file in files:
                self.parse_file_defs(os.path.join(rootdir, file), rootdirnode)

        #Second pass handles calls
        for rootdir, dirs, files in os.walk(self.path):
            #We only have to check the lowest level because
            #the builder recursively adds all the calls to parents
            for file in files:
                self.parse_file_calls(os.path.join(rootdir, file))

        return self.pgraph_builder.build_pgraph()

    @abstractmethod
    def parse_file_defs(self, file, parent_dir_node):
        """
        Parses the file and adds all the defs to the builder
        """
        pass

    @abstractmethod
    def parse_file_calls(self, file):
        """
        Parses the file and adds all the calls to the builder
        """
        pass