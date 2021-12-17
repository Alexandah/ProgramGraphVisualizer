from PParserPython import PParserPython
from PGraphVisualizer import PGraphVisualizer
import os

if __name__ == "__main__":
    root_dir = os.getcwd()
    pgraph = PParserPython(root_dir)()
    pgraph.file_mode()
    PGraphVisualizer(pgraph).visualize()

