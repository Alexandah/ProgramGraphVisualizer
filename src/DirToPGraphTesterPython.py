import unittest
from PParserPython import PParserPython

class DirToPGraphTesterPython(unittest.TestCase):
    def test_graph_build(self):
        parser = PParserPython(".")
        pgraph = parser.parse()
        print(pgraph)
        print(pgraph.root)
        for x in pgraph.all_nodes:
            print(x)

if __name__ == '__main__':
    unittest.main()