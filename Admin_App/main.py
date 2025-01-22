import customtkinter as ctk
import os
from tkinter import filedialog
from db_mysql import MySQL
import shutil

class MainApp:
    def __init__(self):

        label = ctk.CTkLabel(text="Hola Mundo")
        label.pack()

        self.main_window = ctk.CTk()
        self.main_window.mainloop() 


# Configuración inicial
ctk.set_appearance_mode("System")
app = ctk.CTk()
app.geometry("400x300")
app.title("Guardar Imágenes")


db = MySQL("localhost", "root", "12345678", "capturedstyles")
db.connect()

# Insertar datos
db.execute_query("INSERT INTO usuarios (nombre, email) VALUES (%s, %s)", ("Juan", "juan@example.com"))

# Consultar datos
productos = db.fetch_all("SELECT * FROM product")

# Función para seleccionar y guardar imágenes
def guardar_imagen():
    ruta_origen = filedialog.askopenfilename(filetypes=[("Imágenes", "*.png *.jpg *.jpeg")])
    if ruta_origen:
        title ="Selecciona una imagen para guardar"
        destino = "../public"
        ruta_destino = os.path.join(destino, entry.get() + ".webp")
        shutil.copy(ruta_origen, ruta_destino)
        label_info.configure(text=f"Imagen guardada en: {destino}")
        print(entry.get())

# Botón para subir imágenes

entry = ctk.CTkEntry(app, placeholder_text="Ingrese el nombre de la imagen")
entry.pack(pady=20)

boton = ctk.CTkButton(app, text="Seleccionar Imagen", command=guardar_imagen)
boton.pack(pady=20)

# Etiqueta informativa
label_info = ctk.CTkLabel(app, text=productos)
label_info.pack(pady=10)

# Iniciar aplicación
app.mainloop()