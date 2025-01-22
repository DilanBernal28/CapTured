from PIL import ImageTK, Image

def get_image(path, size):
    
    return ImageTK.PhotoImage(Image.open(path).resize(size, Image.ADAPTATIVE))