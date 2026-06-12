/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */


/* decidi importar el icono estrella en lugar de moverlo a public. En el proceso aprendi que si llamaba desde mi index.html no habia ningun problema con accesar la carpeta scripts y sus dependientes. Pero desde JS si tenia problemas. Probe hacerlo asi, evitando moverlo a public solo para validar que funcionaba.  */ 
import star from "../images/icons/star.svg";


//vincular stays.js localmente sin necesidad de usar fetch o mover el archivo a public donde otros podrian accesarlo/copiarlo.
import { stays } from "./stays.js";

//baseDeDatos es una referencia a la informacion en stays.js. Esta es la referencia que usare en mi codigo.
const baseDeDatos = stays;

/*------ declaracion de variables que se comunican al DOM: ------*/

//Para el contador de stays en main:
const counter = document.getElementById("counter")
let contador = 0

//para la creacion de tarjetas dentro de main:
const contDeTarjetas = document.getElementById("card-container"); //section contenedor de las tarjetas

//para desplegar e interactuar con el menu modal:
const searchBar = document.getElementById("search-bar"); //contenedor del searchbar al ingresar a la pagina
const menuModal = document.getElementById("menu");
const cierraModal = document.getElementById("cierra-modal");//Boton X del modal

//para capturar los valores introducidos por los usuarios en ciudad y numero de huespedes
const locationInput = document.getElementById("location-input");
const guestResult = document.getElementById("guests-result");

//Contenedores en html de los botones que cambian los valores para el numero de huespedes segun su edad:
const contenedorBotonesAdultos = document.getElementById("botonesAdultos");
const contenedorBotonesChildren = document.getElementById("botonesChildren");

//donde ira el valor numerico del numero de adultos o niños segun ingresado por el usuario:
const valorAdultos = document.getElementById("valorAdultos");
const valorChildren = document.getElementById("valorChildren");

//Los botones que ejecutan las operaciones de suma o resta. Utilicé clases en lugar de ids dado que realizan la misma accion:
const botonesMas = document.querySelectorAll(".mas")
const botonesMenos = document.querySelectorAll(".menos")

//variables globales para acumular totales por edades:
let totalAdultos = 0
let totalChildren=0

//contenedor ul donde se mostraran los resultados filtrados al buscar por pais:
const dropdownCiudades = document.getElementById("dropdown-ciudades");


const btnSearchModal = document.getElementById("btn-search-modal");//contenedor del btn search del menu modal

//contenedores de los botones del searchbar en main. Esto me permitira manipularlos para que almacenen el valor usado en los filtros del modal.
const btnLocationMain=document.getElementById("btn-location-main")
const btnGuestsMain=document.getElementById("btn-guests-main")

//variables necesarias para migrar el boton search modal cuando la pantalla sea desktop:
const contenedorBotonLg=document.getElementById("contenedor-btn-lg")//nuevo contenedor
const contenedorMovil = document.getElementById("contenedor-movil")//contenedor original
//despues de investigar, esta es una variable que me permite condicionar el cambio en el html para mover el boton search en modal al searchbar donde estan las otras opciones:
const breakpointLG=window.matchMedia("(min-width:1024px)")

//contenedor que contiene los botones para cambiar el numero de huespedes. La variable permite toggle la clase hidden
const btnCalculos = document.getElementById("btn-calculos")



/* FUNCIONES: */

/**
 * Se encarga del diseño responsivo del menú modal, reubicando el botón "Search" según el tamaño de pantalla.
 * Evalúa mediante un MediaQueryList (breakpointLG) si la pantalla es de tamaño desktop (minimo 1024px).
 * Si la condición se cumple, remueve el botón del contenedor móvil y lo inserta en el contenedor de escritorio (integrándolo visualmente a la barra de búsqueda principal). 
 * De lo contrario, lo devuelve a su posición original de móvil.
 * Funciona tanto de forma automática mediante el listener de cambio de pantalla (change) el cual se ejecuta fuera de la funcion para que main.js lo ejecute cuando revisa los imports que vienen de stays.js, 
 * como de forma manual al ser invocada directamente.
 * @param {MediaQueryListEvent} e - El evento del breakpoint que se dispara al cambiar el tamaño de la pantalla.
 * @returns {void} No retorna ningún valor, modifica la estructura del DOM moviendo el elemento de un contenedor a otro.
 */
function reubicarBotonModal(e){

  const matches = e && e.matches !== undefined ? e.matches :breakpointLG.matches;

  if (!contenedorMovil || !contenedorBotonLg || !btnSearchModal ) return;

  if(matches){
    contenedorBotonLg.appendChild(btnSearchModal)
  }else{
    contenedorMovil.appendChild(btnSearchModal)
  }
    

}

breakpointLG.addEventListener("change", reubicarBotonModal);






/**
 * Realiza el filtrado combinado, sea por numero de huespedes o por ciudad.
 * No se exporta a main.js solo es utilizada por esas otras funciones para ejecutar los calculos correspondientes.
 * 
 * Almacena el resultado ingresado por el usuario en el numero de huespedes y en la ciudad, filtrando por medio de valores booleanos.
 * coincideCiudad evalua si el destinoBuscado esta vacio o si no esta en blanco si el valor introducido existe dentro de la propiedad city de stays.js
 * coincideHuespedes evalua que la suma o resultado de las operaciones de huespedes sea menor o igual a la propiedad maxGuests en stays.js
 * 
 * returna un valor booleano del analisis de ambas variables.
 * pasa la lista de staysFiltrados como argumento para la funcion crearTarjetas. La lista creada mostrara los resultados que muestren los resultados.
 * 
 * Al final, en esta funcion los botones en main para huespedes y ciudad se actualizan en base a las condiciones en staysFiltrados. Si el destino queda en blanco btnLocationMain mostrara: "Add location", si contiene un valor mostrara el valor buscado en el filtro modal.
 * btnGuestsMain por medio de un operador ternario muestra si la condicion es verdadera, el total de huespedes buscados en el modal. Si es falso, o sea si es === 0, muestra el mensaje: "Add guests"
 * @returns {void} Se ejecuta dentro de otras funciones para modificar el DOM como resultado.
 */
function filtrarDinamicamente(){
  const destinoBuscado = locationInput.value.toLowerCase().trim();
  const totalGuests = totalAdultos + totalChildren
  const staysFiltrados = baseDeDatos.filter(stay=>{
    const coincideCiudad = destinoBuscado==="" ||stay.city.toLowerCase().includes(destinoBuscado);
    const coincideHuespedes = totalGuests<=stay.maxGuests;
    return coincideCiudad && coincideHuespedes

  })
  crearTarjetas(staysFiltrados)

  btnLocationMain.textContent = destinoBuscado || "Add Location"
  btnGuestsMain.textContent = totalGuests>0 ?`${totalGuests} guests`:"Add guests"
}

//
/**
 * Filtra usando un dropdown dinamico para las ciudades. 
 * 
 * Llama a la funcion filtrarDinamicamente, la cual crea una lista filtrada a utilizar en crearTarjetas.
 * 
 * @returns {void} Modifica el DOM directamente y procesa los filtros creados en filtrarDinamicamente 
 */
function inicializarFiltroCiudades(){


  //Al hacer click en guestResult se despliega el contenedor de los botones que calculan o manipulan el numero de huespedes a buscar
  guestResult.addEventListener("click",()=>{
    btnCalculos.classList.toggle("hidden")
    


  })
  //Al hacer click en locationInput se esconde el contenedor de los botones que calculan o manipulan el numero de huespedes a buscar

  locationInput.addEventListener("click",()=>{
    btnCalculos.classList.add("hidden")
  })

    /**
     * Se crea un arreglo con valores unicos de ciudad en el objeto.
     * Es una bonita combinacion de 3 herramientas poderosas:
     * 1. ... spread operator
     * 2. new Set
     * 3. map
     * 
     * Map crea una copia del contenido de cada objeto en la propiedad city.
     * Luego new Set lista unicamente valores unicos, automaticamente descarta duplicados y crea un listado de objetos.
     * El spread operator saca los valores creados en new Set y por estar dentro de corchetes, los guarda en un array que nos permite iterar sin duplicados la lista de ciudades disponibles en el nuevo array */ 
    const ciudadesUnicas = [...new Set(baseDeDatos.map(stay=> stay.city))];

    //al insertar informacion dentro de location input se captura en minusculas el contenido escrito
    locationInput.addEventListener("input",(e)=>{
      const valorInput = e.target.value.toLowerCase().trim();//toma el valor 
      dropdownCiudades.innerHTML="";//limpia resultados anteriores en el dropdown
      

      filtrarDinamicamente()

      //si el input de ciudades esta en blanco, no se muestra el ul, esto hace que solo se muestren elementos que hagan match con lo que el usuario ingrese
      if (valorInput===""){
        dropdownCiudades.classList.add("hidden")
        return
      }

      /**
       * Esta variable usa el array resultante de filtrar los valores unicos de las ciudades. Compara que la propiedad city coincida con el contenido ingresado por el usuario.
       */
      const ciudadesFiltradas = ciudadesUnicas.filter(ciudad => ciudad.toLocaleLowerCase().includes(valorInput));

      //si el arreglo resultante tiene al menos 1 elemento, se remueve la clase hidden del ul dropdownCiudades:
      if (ciudadesFiltradas.length > 0){
        dropdownCiudades.classList.remove("hidden");


        ciudadesFiltradas.forEach(ciudad =>{
          const li = document.createElement("li")
          li.textContent =`📍${ciudad}, Finland`
          li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-slate-700 transition-colors"

          li.addEventListener("click",()=>{
            locationInput.value = `${ciudad}`
            dropdownCiudades.classList.add("hidden")
            filtrarDinamicamente()
          });

          dropdownCiudades.appendChild(li);
        });
      } else {
        dropdownCiudades.classList.add("hidden")
      }
    })

    //Si el usuario hace click en cualquier lugar que no sea el li resultante que muestra la lista de ciudades filtradas, el menu desaparece.
    document.addEventListener("click",(e)=> {
      if(!locationInput.contains(e.target) && !dropdownCiudades.contains(e.target)){
        dropdownCiudades.classList.add("hidden")
      }
    })
    
    
}



/**
 * Hace que el boton buscar que aparece al usar el menu modal pueda cerrar el menu modal
 * 
 * @returns {void}
 */
function conectarBotonBuscar(){
  btnSearchModal.addEventListener("click",()=>{
    menuModal.classList.add("hidden")

  })
}


/**
 * funcion que calcula el total de huespedes y actualiza el contenedor guests
 * Por medio de las variables con scope interno valorAdultos y valorChildren se modifica el DOM para poder mostar la cantidad total por grupo de edad (adultos o niños).
 * Si el total de invitados es 0, el contenedor guestResult(en el main) muestra un mensaje "Add guests", sino, muestra un mensaje que por medio de un operador ternario diferencía si el resultado es singular o plural.
 * @returns {void} - Modifica el DOM direcatamente
 */
function actualizarContadores(){
   

    valorAdultos.textContent=totalAdultos
    valorChildren.textContent = totalChildren
    let totalGuests = totalAdultos + totalChildren
    

    if (totalGuests ===0 ){
        guestResult.textContent = "Add guests"
    }else{
        guestResult.textContent = `${totalGuests} guest${totalGuests>1 ?'s':''}`
            /* for (let i = 0; i < botonesMenos.length; i++) {
                const element = botonesMenos[i];
                element.classList.remove("hidden")
                

            }  */   
        }
}

/**
 * maneja los clicks en contenedores adulto y niños. Delegando eventos segun target en los grupos de edades, adultos o niños.
 * Si el usuario hace click en un elemento dentro del contenedor de botones que tenga la clase "mas"(para sumar) o "menos" (para restar) y el resultado de la operacion es menor o igual a 10 la operacion se ejecuta. 
 * En caso de intentar introducir un valor superior a 10 se muestra una alerta y se fuerza el valor a mantener el maximo.
 * 
 * Las funciones actualizarContadores y filtrarDinamicamente se ejecuta dentro de esta funcion para poder modificar el DOM directamente.
 * 
 * @returns {void} Modifica el DOM directamente.
 */
function ejecutarContadores(){
contenedorBotonesAdultos.addEventListener("click",(e)=>{

    if(e.target.classList.contains("mas")){
      if((totalAdultos+totalChildren)<10){  
      totalAdultos++;}
      else{
        alert ("El maximo total de Guests es 10")

        totalAdultos}
    }
    else if(e.target.classList.contains("menos")){
        if(totalAdultos>0){
        totalAdultos--;
        }
    }
    
    actualizarContadores();
    const totalGuests=totalAdultos + totalChildren
    filtrarDinamicamente()
})

//niños
contenedorBotonesChildren.addEventListener("click",(e)=>{
    if(e.target.classList.contains("mas")){
      if((totalAdultos+totalChildren)<10){
        totalChildren++}
        
        else{
          alert("El maximo total de Guests es 10")
          totalChildren--}
    }
    else if(e.target.classList.contains("menos")){
        if(totalChildren>0 && (totalAdultos+totalChildren)<10){
        totalChildren--
        }
    }
    actualizarContadores();
    const totalGuests=totalAdultos + totalChildren

    filtrarDinamicamente()
})
}

/**
 * funcion que abre o cierra el menu oculto mediante un evento click en el elemento searchBar.
 * 
 * 
 * @returns {void} Modifica el DOM directamente
 */
function abrirMenuModal() {
  searchBar.addEventListener("click", () => {
    menuModal.classList.toggle("hidden");
  });
  cierraModal.addEventListener("click", () => {
    menuModal.classList.toggle("hidden");
  });
}

/**
 * funcion que itera la base de datos y genera las tarjetas. Tiene como objetivo crear elementos html individuales para cada tarjeta. Tambien ejecuta el contador de opciones disponibles. Tiene un parametro por defecto para ejecutar o mostrar todos los elementos al inicio.
 * 
 * @param {infoDeStays} Objeto - Lista necesaria para iterar y crear las tarjetas
 * @returns {void} - No retorna ningún valor, modifica directamente el DOM.
 */
function crearTarjetas(infoDeStays = baseDeDatos) {
  contador=0 //permite a la funcion usar la variable contador localmente
  
  if (!infoDeStays) return;//Si por alguna razon la lista de objetos proveida estuviese corrupta o no se proveyese no se ejecutaria nada.
  contDeTarjetas.innerHTML = "";//Limpia el contenedor de tarjetas en el html cada vez que se ejecuta la funcion

  infoDeStays.forEach((stay) => {
    //Permite iterar cada objeto del arreglo para crear elementos html para cada uno:

    const tarjeta = document.createElement("article"); //cuerpo de cada tarjeta
    const imagen = document.createElement("img"); //src value de cada imagen
    const description = document.createElement("span"); //greyed text que describe las amenidades
    const rating = document.createElement("p");//contenedor del valor rating de cada tarjeta
    const highlights = document.createElement("p"); //highlights del departamento al pie de la tarjeta
    const contDescripRate = document.createElement("div");//contenedor de la description y rating
    const superHostContainer = document.createElement("em")//contenedor que menciona si es o no superhost

    //agregando atributos a las variables creadas
    if(stay.superHost===true){
      superHostContainer.className="rounded-2xl border lg:py-0 lg:px-1 py-1 px-4 text-xs font-semibold "
      superHostContainer.textContent=`SUPERHOST`

    }else{
      superHostContainer.classList.add("hidden")
    }

    imagen.src = stay.photo; 
    imagen.alt = `Fotografia de ${stay.title}`;
    description.innerHTML = `${stay.type}. ${stay.beds} beds`;
    rating.innerHTML = `<img src="${star}" alt="logo" class="  w-5" > ${stay.rating}`;
    highlights.textContent = stay.title;

    //uniendo los elementos a las etiquetas padre respectivas
    contDescripRate.append(superHostContainer,description, rating);
    tarjeta.append(imagen, contDescripRate, highlights);
    contDeTarjetas.appendChild(tarjeta);

    //Agregando clases a cada elemento

    imagen.className = "rounded-3xl w-full h-60 md:h-75 object-cover";
    description.className = " text-slate-400 ";
    rating.className = "flex";
    contDescripRate.className = "flex justify-between mt-2";
    highlights.className = "font-semibold text-lg";
    tarjeta.className = "mb-5 xl:w-19/20 ";

    //el contador suma 1 por cada elemento que se genera
    contador++
  });

  //condicion para el contador, mantiene el diseño original de mostrar un "+12" cuando se muestran todos los stays
  if(contador >1 && contador<=12){
  counter.textContent=`${contador} stay${contador>1 ? 's':''}`}
  else if (contador===0){
    counter.textContent=`Please adjust filters`
  }else {
    counter.textContent =`12+ stays`
  }
}


//Exportando las funciones necesarias a main.js
export { crearTarjetas, abrirMenuModal,ejecutarContadores,inicializarFiltroCiudades, conectarBotonBuscar };
