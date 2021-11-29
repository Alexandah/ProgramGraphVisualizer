from abc import ABC, abstractmethod
from PNode import PNode, PNodeTypes
from PGraph import PGraph

class PParserInterface(ABC):
    def __init__(self, path):
        self.path = path

    def __call__(self):
        self.parse(self.path)

    @abstractmethod
    def parse(self) --> PGraph:
        pass