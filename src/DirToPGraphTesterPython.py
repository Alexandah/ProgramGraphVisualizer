import unittest
from PParserPython import PParserPython
from PNode import FileNode, DirNode
from constants import FILE_SLASH

class DirToPGraphTesterPython(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.pgraph = PParserPython("testdir")()

    def test_found_something(self):
        self.assertTrue(len(self.pgraph.all_nodes) > 0)

    def test_files_are_all_python(self):
        for x in self.pgraph.all_nodes:
            if isinstance(self.pgraph.all_nodes[x], FileNode):
                self.assertTrue(x.endswith(".py"))

    def test_num_files(self):
        num_files = 0
        for x in self.pgraph.all_nodes:
            if isinstance(self.pgraph.all_nodes[x], FileNode):
                num_files += 1
        self.assertEqual(num_files, 5)

    def test_num_dirs(self):
        num_dirs = 0
        for x in self.pgraph.all_nodes:
            if isinstance(self.pgraph.all_nodes[x], DirNode):
                num_dirs += 1
        self.assertEqual(num_dirs, 3)

    def test_defs(self):
        for x in self.pgraph.all_nodes.values():
            print(x)
            print('defines ', x.defines)
            if x.name == "testdir":
                self.assertEqual(len(x.defines),5)
                self.assertTrue("testdir"+FILE_SLASH+"test0.py" in x.defines)
                self.assertTrue("testdir"+FILE_SLASH+"test1.py" in x.defines)
                self.assertTrue("testdir"+FILE_SLASH+"test4.py" in x.defines)
                self.assertTrue("testdir"+FILE_SLASH+"folder0" in x.defines)
                self.assertTrue("testdir"+FILE_SLASH+"folder1" in x.defines)
                self.assertFalse("testdir"+FILE_SLASH+"folder1"+FILE_SLASH+"test3.py" in x.defines)
                self.assertFalse("testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py" in x.defines)
            elif x.name == "testdir"+FILE_SLASH+"folder0":
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 1)
                self.assertTrue("testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py" in x.defines)
            elif x.name == "testdir"+FILE_SLASH+"folder1":
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 1)
                self.assertTrue("testdir"+FILE_SLASH+"folder1"+FILE_SLASH+"test3.py" in x.defines)
            elif x.name == "testdir"+FILE_SLASH+"test0.py":
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 0)
            elif x.name == "testdir"+FILE_SLASH+"test1.py":
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 0)
            elif x.name == "testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py":
                self.assertTrue(x.definedby.name == "testdir"+FILE_SLASH+"folder0")
                self.assertTrue(len(x.defines) == 0)
            elif x.name == "testdir"+FILE_SLASH+"folder1"+FILE_SLASH+"test3.py":
                self.assertTrue(x.definedby.name == "testdir"+FILE_SLASH+"folder1")
                self.assertTrue(len(x.defines) == 0)
            elif x.name == "testdir"+FILE_SLASH+"test4.py":
                self.assertTrue(x.definedby.name == "testdir")
                self.assertTrue(len(x.defines) == 0)

    def test_calls(self):
        for x in self.pgraph.all_nodes.values():
            if x.name == "testdir":
                self.assertTrue(len(x.calls) == 0)
            elif x.name == "testdir"+FILE_SLASH+"folder0":
                self.assertTrue(len(x.calls) == 1)
                self.assertTrue("testdir"+FILE_SLASH+"test0.py" in x.calls)
            elif x.name == "testdir"+FILE_SLASH+"folder1":
                self.assertTrue(len(x.calls) == 2)
                self.assertTrue("testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py" in x.calls)
                self.assertTrue("testdir"+FILE_SLASH+"folder0" in x.calls)
            elif x.name == "testdir"+FILE_SLASH+"test0.py":
                self.assertTrue(len(x.calls) == 0)
            elif x.name == "testdir"+FILE_SLASH+"test1.py":
                self.assertTrue(len(x.calls) == 2)
                self.assertTrue("testdir"+FILE_SLASH+"test0.py" in x.calls)
                self.assertTrue("testdir"+FILE_SLASH+"test4.py" in x.calls)
            elif x.name == "testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py":
                self.assertTrue(len(x.calls) == 1)
                self.assertTrue("testdir"+FILE_SLASH+"test0.py" in x.calls)
            elif x.name == "testdir"+FILE_SLASH+"folder1"+FILE_SLASH+"test3.py":
                self.assertTrue(len(x.calls) == 2)
                self.assertTrue("testdir"+FILE_SLASH+"folder0"+FILE_SLASH+"test2.py" in x.calls)
                self.assertTrue("testdir"+FILE_SLASH+"folder0" in x.calls)
            elif x.name == "testdir"+FILE_SLASH+"test4.py":
                self.assertTrue(len(x.calls) == 1)
                self.assertTrue("testdir"+FILE_SLASH+"test0.py" in x.calls)
            


if __name__ == '__main__':
    unittest.main()