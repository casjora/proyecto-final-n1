/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import '../style.css'//importando los estilos de tailwind a traves de js

//Importando funciones desde stays.js:
import {crearTarjetas,abrirMenuModal,ejecutarContadores,inicializarFiltroCiudades, conectarBotonBuscar,reubicarBotonModal } from "./utils.js";


//Llamando a cada una de las funciones que usa mi pagina para funcionar:
/* 
*crearTarjetas(): La funcion principal que alimenta el main de mi pagina. Consiste en iterar stays.js y crear una tarjeta por cada elemento creando los elementos necesarios para cada tarjeta a traves de document.createElement.
*abrirMenuModal(): Tiene por objetivo interactuar con el contenedor del menu oculto en el html para poder mostrar sus respectivos elementos.
*ejecutarContadores():
*inicializarFiltroCiudades: cambiar nombre
*conectarBotonBuscar: hace que el boton buscar en el modal pueda cerrar el menu modal al presionarse
*reubicarBotonModal: dado que mi diseño original contenia el boton de busqueda de el modal en un contenedor diferente al del searchbar que necesitaba mostrar en desktop view, cree esta funcion que me permite mover y no duplicar ese elemento en el html sin afectar su funcionabilidad esperada.
*/

crearTarjetas()
abrirMenuModal()
ejecutarContadores()
inicializarFiltroCiudades()
conectarBotonBuscar()
reubicarBotonModal()
