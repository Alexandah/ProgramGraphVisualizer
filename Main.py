from src.PParserPython import PParserPython
from src.PParserTypescript import PParserTypescript
from src.PGraphVisualizer import PGraphVisualizer
import os
import argparse
from src.PNode import DirNode, FileNode

if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description='Creates and displays a diagram of the import dependencies between all entities within the parent dir. By default, everything is visible. Disable entities to create the kind of diagram you want.')
    argparser.add_argument('-ndg', '--nodirgroup', help='Turns off grouping items by directory.', action='store_true')
    argparser.add_argument('-x', '--exclude', nargs='+', help='Excludes entities within a list of names from the diagram.')
    argparser.add_argument('-xt', '--excludetype', nargs='+', help='Excludes named entities of a certain type (dir, file) from the diagram.')
    argparser.add_argument('-xf', '--excludefamily', nargs='+', help='Excludes named nodes and their children from the diagram.')
    args = argparser.parse_args()

    root_dir = os.getcwd()
    # pgraph = PParserPython(root_dir)()
    pgraph = PParserTypescript(root_dir)()

    if args.excludetype:
        str_to_node_type = {
            'dir':DirNode,
            'file':FileNode,
        }
        for typestr in args.excludetype:
            if typestr in str_to_node_type:
                type = str_to_node_type[typestr]
                pgraph.deactivate_type(type)

    if args.exclude:
        for name in args.exclude:
            pgraph.deactivate_by_name(name)

    if args.excludefamily:
        for ancestor in args.excludefamily:
            pgraph.deactivate_family(ancestor)

    viz = PGraphVisualizer(pgraph)
    if args.nodirgroup:
        viz.group_by_dir = False
    
    viz.visualize()

