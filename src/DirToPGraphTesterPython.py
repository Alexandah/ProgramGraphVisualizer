import unittest
from PParserPython import PParserPython
from PNode import FileNode, DirNode

class DirToPGraphTesterPython(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.pgraph = PParserPython("testdir")()

    def test_found_something(self):
        self.assertTrue(len(self.pgraph.all_nodes) > 0)

    def test_files_are_all_python(self):
        for x in self.pgraph.all_nodes:
            if isinstance(x, FileNode):
                self.assertTrue(x.name.endswith(".py"))

    def test_num_files(self):
        num_files = 0
        for x in self.pgraph.all_nodes:
            if isinstance(x, FileNode):
                num_files += 1
        self.assertEqual(num_files, 5)

    def test_num_defs(self):
        num_dirs = 0
        for x in self.pgraph.all_nodes:
            if isinstance(x, DirNode):
                num_dirs += 1
        self.assertEqual(num_dirs, 3)

    def test_defs(self):
        for x in self.pgraph.all_nodes:
            if x.name == "testdir":
                self.assertEqual(len(x.defines),5)
            elif x.name == "testdir\\folder0":
                print(x.defines)
                print(len(x.defines))
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 1)
                self.assertTrue(any([y.name == "testdir\\folder0\\test2.py" for y in x.defines]))
            elif x.name == "testdir\\folder1":


if __name__ == '__main__':
    unittest.main()