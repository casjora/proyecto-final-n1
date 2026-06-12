# ¡Bienvenidos al proyecto! 🎉

Este repositorio es una plantilla diseñada para ayudarte a comenzar rápidamente. Sigue estos pasos para configurar tu entorno y empezar a trabajar:

## 1. Usa esta plantilla
Haz clic en el botón **"Use this template"** en la parte superior derecha de este repositorio para crear un nuevo proyecto basado en esta plantilla. 📂

## 2. Instala las dependencias
Después de clonar tu nuevo repositorio, abre la terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```
Esto instalará todo lo necesario para que el proyecto funcione. ✅

## 3. Compila los estilos de Tailwind CSS ✂️
Para que los estilos de Tailwind funcionen mientras trabajas, ejecuta:
```bash
npm run tw
```
Este comando se encargará de compilar los estilos cada vez que uses clases de Tailwind en tu HTML. 🎨

## 4. Archivos importantes 📂
- **`src/scripts/stays.js`**: Aquí encontrarás la data que necesitarás usar durante el proyecto. ¡Es tu fuente de información principal! 📊
- **`src/scripts/main.js`**: Este es el archivo donde escribirás el código principal de tu aplicación. Todo lo que construyas comenzará aquí. 🛠️
- **`src/scripts/utils.js`**: Este archivo contiene funciones auxiliares que pueden ser reutilizadas en diferentes partes de tu proyecto. Es un buen lugar para almacenar lógica común, como validaciones, formateos o cálculos. 🔧
- **`src/images/design`**: En esta carpeta encontrarás capturas que muestran cómo debería lucir el resultado esperado. Esto te servirá como referencia visual. 🖼️
- **`index.html`**: Este es el archivo donde desarrollarás el diseño de tu proyecto. Aquí se integrarán los estilos y el código para dar vida a tu aplicación. 🖋️

```plaintext
📂 ├── src/
    📜 ├── scripts/
         📄 ├── stays.js
         📄 └── main.js
    🖼️ ├── images/
         🖼️ └── design/
📄 ├── index.html
📦 ├── package.json
📖 └── README.md
🚫 └── .gitignore
```

## 5. ¡Manos a la obra! 🚀
Ya tienes todo listo para empezar. Explora los archivos, experimenta con el código y diviértete aprendiendo. 🎉

Si tienes dudas, no dudes en preguntar. ¡Éxito en tu proyecto! 💪


## Aportaciones Creativas/Puntos Extra:

- Limite de 10 para el total de huespedes permitido en la base de datos. Lo hice a traves de condiciones que impiden al usuario ir mas alla del limite de huespedes en la base de datos. 
- Esto sucede dentro de la funcion ejecutarContadores

- La funcion reubicarBotonModal ayuda a reposicionar un elemento html dentro de un contenedor diferente al considerar el tamaño de la pantalla. Investigue como hacerlo y en el proceso aprendi acerca del tipo de variable MediaQueryListEvent, la cual es un objeto de evento. Se obtiene informacion en tiempo real de cuando un media query cambia. Apendi que la funcion necesitaba ejecutarse tanto dentro de utils.js y dentro de main.js. Si solo lo dejaba en utils al abrir la pagina en escritorio no detectaba un cambio de pantalla y por eso devolvia la vista movil. 
Tambien aprendi que los event listeners o cualquier codigo fuera de funciones en utils se ejecuta cuando main analiza las funciones importadas desde utils.
- Esta funcionabilidad me ayudo a mantener coherencia con el diseño solicitado mientras evitaba duplicar elementos html.

- Tambien agregue la vista Tablet al usar grid para dimensionar el numero de columnas basado en el tamaño de la pantalla.
