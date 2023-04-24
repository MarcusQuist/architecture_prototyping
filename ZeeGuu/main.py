import sys
sys.version
import pathlib
from pathlib import Path
# Kør i CMD
# pip3 install gitpython
# pip3 install pyvis

# Let's declare a var for the path where we're going to download a repository
# Warning: this must end in /
CODE_ROOT_FOLDER="api/"

def file_path(file_name):
    return CODE_ROOT_FOLDER+file_name

assert (file_path("zeeguu/core/model/user.py") == "api/zeeguu/core/model/user.py")

# extracting a module name from a file name
def module_name_from_file_path(full_path):

    # e.g. ../core/model/user.py -> zeeguu.core.model.user
    
    file_name = full_path[len(CODE_ROOT_FOLDER):]
    file_name = file_name.replace("/__init__.py","")
    file_name = file_name.replace("/",".")
    file_name = file_name.replace(".py","")
    return file_name

assert 'zeeguu.core.model.user' == module_name_from_file_path(file_path('zeeguu/core/model/user.py'))


# naïve way of extracting imports using regular expressions
import re


# we assume that imports are always at the 
def import_from_line(line):
 
    # regex patterns used 
    #   ^  - beginning of line
    #   \S - anything that is not space
    #   +  - at least one occurrence of previous 
    #  ( ) - capture group (read more at: https://pynative.com/python-regex-capturing-groups/)
    try: 
      y = re.search("^from (\S+)", line) 
      if not y:
        y = re.search("^import (\S+)", line)      
      return y.group(1)
    except:
      return None


# extracts all the imported modules from a file
# returns a module of the form zeeguu_core.model.bookmark, e.g.
def imports_from_file(file):

    all_imports = []

    lines = [line for line in open(file)]
    
    for line in lines:
        imp = import_from_line(line)

        if imp:
            all_imports.append(imp)

    return all_imports


# import networkx as nx
from pyvis.network import Network

def dependencies_graph():
    files = Path("./api").rglob("*.py")

    G = Network(height="800px", width="100%")
    
    for file in files:
        file_path = str(file)

        module_name = module_name_from_file_path(file_path)

        if module_name not in G.nodes:
            G.add_node(module_name)

        for each in imports_from_file(file_path):
            if each not in G.nodes: 
                G.add_node(each)
            G.add_edge(module_name, each)

    return G

from IPython.core.display import display, HTML
G = dependencies_graph()
# draw_graph(G, (12,10), with_labels=True)
G.toggle_physics(True)
G.prep_notebook()
G.show("./page.html", local=True)


print(imports_from_file(file_path('zeeguu/core/model/bookmark.py')))
print(imports_from_file(file_path('zeeguu/core/model/unique_code.py')))