from constants import FILE_SLASH

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
        file_at_end_of_path = get_file_name_at_end_of_path(key)
        if filename in file_at_end_of_path:
            return key
    return None
