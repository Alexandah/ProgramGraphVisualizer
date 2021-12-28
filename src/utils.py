from src.constants import FILE_SLASH, SLASHES

def get_module_name(module_import_from):
    """
    Returns the module name from a module import statement.
    """
    return module_import_from.split(".")[-1]

def get_file_name_at_end_of_path(path):
    """
    Returns the file name at the end of a path.
    """
    return path.split(FILE_SLASH)[-1]

def get_key_with_file_in_path(filename, dictionary):
    """
    Returns the key of a dictionary that contains a file name
    at the end of its path.
    """
    if filename is None:
        return None

    for key in dictionary:
        # file_at_end_of_path = get_file_name_at_end_of_path(key)
        # if filename in file_at_end_of_path:
            # return key
        filepath = convert_file_slashes_to_current_type(filename)
        if key.endswith((filepath + '.ts', filepath + '.tsx')):
            return key
    return None

def get_string_inside_quotes(string):
    """
    Returns the string inside the quotes.
    """
    if "'" in string:
        return string.split("'")[1]
    elif '"' in string:
        return string.split('"')[1]
    else:
        return string

def convert_file_slashes_to_current_type(string):
    """
    Returns the string with all file slashes converted to the current file slash.
    """
    new_string = string
    for slash in SLASHES:
        new_string = new_string.replace(slash, FILE_SLASH)
    return new_string

