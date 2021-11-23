from enum import Enum

class PNodeTypes(Enum):
    DIR = 0
    FILE = 1
    CLASS = 2
    METHOD = 3

class PNode:
    def __init__(self, name, parent=None, type=PNodeTypes.DIR):
        self.name = name
        self.type = type
        self.parent = parent
        self.children = []
        #these are different. change the code to reflect this
        self.calls = []
        self.called_by = []