import ast
import PParserInterface
import inspect

print(ast.dump(ast.parse(inspect.getsource(PParserInterface))))