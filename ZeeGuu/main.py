import sys

sys.version
import pathlib
from pathlib import Path

# Kør i CMD
# pip3 install gitpython
# pip3 install pyvis
# git clone https://github.com/zeeguu/api.git


# ========================================================================
# Let's declare a var for the path where we're going to download a repository
# Warning: this must end in /
CODE_ROOT_FOLDER = "api/"


def file_path(file_name):
    return CODE_ROOT_FOLDER + file_name


assert file_path("zeeguu/core/model/user.py") == "api/zeeguu/core/model/user.py"


# ========================================================================
# extracting a module name from a file name
def module_name_from_file_path(full_path):
    # e.g. ../core/model/user.py -> zeeguu.core.model.user

    file_name = full_path[len(CODE_ROOT_FOLDER) :]
    file_name = file_name.replace("/__init__.py", "")
    file_name = file_name.replace("/", ".")
    file_name = file_name.replace("\\", ".")
    file_name = file_name.replace(".py", "")
    return file_name


assert "zeeguu.core.model.user" == module_name_from_file_path(
    file_path("zeeguu/core/model/user.py")
)


# ========================================================================
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
        y = re.search("from (\S+)", line)
        if not y:
            y = re.search("^import (\S+)", line)
        return y.group(1)
    except:
        return None


# ========================================================================
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


# ========================================================================
# Extracts only the interesting modules - modules starting with zeeguu and which are not use for test cases
def interesting_module(module_name):
    return module_name.startswith("zeeguu") and not "test" in module_name


# ========================================================================
# Creates the first graph with all intereseting modules represented
from pyvis.network import Network

def addEdges(G, module_name, file_path):
    #print(module_name)
    if interesting_module(module_name):
        for each in imports_from_file(file_path):
                G.add_edge(module_name, each)
                #print(each)
    return G


def dependencies_graph():
    files = Path("./api").rglob("*.py")

    G = Network(
        height="800px",
        width="100%",
        directed=True,
        bgcolor="#222222",
        font_color="white",
        select_menu=True,
    )

    for file in files:
        file_path = str(file)

        module_name = module_name_from_file_path(file_path)

        if not interesting_module(module_name):
            continue
        if module_name not in G.nodes:
            G.add_node(module_name)

        for _import in imports_from_file(file_path):
            if _import not in G.nodes and interesting_module(_import):
                G.add_node(_import)
                G.add_edge(module_name, _import)
        
    # files = Path("./api").rglob("*.py")
    # for file in files:
    #     file_path = str(file)
    #     module_name = module_name_from_file_path(file_path)
    #     G = addEdges(G, module_name, file_path)

    return G


# ========================================================================
def top_level_package(module_name, depth=1):
    components = module_name.split(".")
    return ".".join(components[:depth])


# ========================================================================
# Creates the abstracted graph containing only the defined interesting top level modules
def abstracted_to_top_level(G, depth=1):
    aG = Network(
        height="800px",
        width="100%",
        directed=True,
        bgcolor="#222222",
        font_color="white",
        select_menu=True,
    )
    for node in G.nodes:
        aG.add_node(node["id"])
        print(node)
    for edge in G.edges:
        src = top_level_package(edge["from"], depth)
        dst = top_level_package(edge["to"], depth)

        if src != dst:
            #print(src)
            aG.add_edge(src, dst)
    
    filteredAg = Network(
        height="800px",
        width="100%",
        directed=True,
        bgcolor="#222222",
        font_color="white",
        select_menu=True,
    )
        
    filteredAg.set_edge_smooth('dynamic')
    
    # Creates a new set of nodes and edges containing to make possible a way to count the edges,
    # and subsequently give them a specific width. Edges with the same source and target are only added once.
    # The witdh is determined by the number of times you meet an edge with the same source and target - which is captured in a dictionary
    new_nodes = set()
    new_edges = []
    for edge in aG.edges:
        new_nodes.add(edge["from"])
        new_nodes.add(edge["to"])
        new_edges.append(edge)
    
    for node in aG.nodes:
        if node["id"] in new_nodes:
            filteredAg.add_node(node["id"])
    
    edge_counts = {}
    for edge in new_edges:
        source = edge["from"]
        target = edge["to"]
        key = (source, target)
        
        if key in edge_counts:
            edge_counts[key] += 1
        else:
            edge_counts[key] = 1
            filteredAg.add_edge(edge["from"], edge["to"], arrowStrikethrough = False)
    print(edge_counts)
    
    for edge in filteredAg.edges:
        source = edge["from"]
        target = edge["to"]
        key = (source, target)
        
        if key in edge_counts:
            edge["width"] = edge_counts[key] * 0.05
            edge["label"] = str(edge_counts[key])

    return filteredAg


# ========================================================================
from IPython.display import display, HTML


# ========================================================================
# Dependencies graph containing all files in the repository
# ========================================================================
DG = dependencies_graph()
DG.toggle_physics(True)
DG.prep_notebook()
DG.force_atlas_2based()
DG.show_buttons(filter_=["physics"])
DG.show("./DG.html")


# ========================================================================
# Abstracted dependencies graph containing only the 2 top level files in the repository (zeeguu, zeeguu.core, zeeguu.api)
# ========================================================================
ADG = abstracted_to_top_level(DG, 2)
ADG.toggle_physics(False)
ADG.prep_notebook()
ADG.force_atlas_2based()
ADG.show_buttons(filter_=["physics"])
ADG.show("./ADG.html")

ADG3 = abstracted_to_top_level(DG, 3)
ADG3.toggle_physics(False)
ADG3.prep_notebook()
ADG3.force_atlas_2based()
ADG3.show_buttons(filter_=["physics"])
ADG3.show("./ADG3.html")
