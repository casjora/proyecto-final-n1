/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

function test() {
  //todos los datos
  console.log(baseDeDatos);

  //usando filter
  console.log(baseDeDatos.filter((dato) => dato.city === "Helsinki"));

  //usando map, doblando el numero de camas
  console.log(baseDeDatos.map((dbeds) => dbeds.beds * 2));
  //usando map, mostrar todo el arreglo nuevo y doblando el numero de camas
  console.log(
    baseDeDatos.map((dbeds) => {
      return {
        ...dbeds,
        beds: dbeds.beds * 2,
      };
    }),
  );

  //lo mismo pero en una sola linea. usar parentesis:
  console.log(baseDeDatos.map((dbeds) => ({ ...dbeds, beds: dbeds.beds * 2 })));

  //sumar arreglo

  console.log(
    baseDeDatos.reduce((resultado, elementoActual) => {
      return resultado + elementoActual.maxGuests;
    }, 0),
  );
}

import star from "../images/icons/star.svg";
//vincular stays.js localmente:

import { stays } from "./stays.js";

const baseDeDatos = stays;

//declaracion de variables que se comunican al DOM:

const contDeTarjetas = document.getElementById("card-container"); //section contenedor de las tarjetas
const searchBar = document.getElementById("search-bar"); //contenedor del searchbar al ingresar a la pagina
const menuModal = document.getElementById("menu");
const contenedorMain = document.getElementById("contenedor-main");
const cierraModal = document.getElementById("cierra-modal");

const locationInput = document.getElementById("location-input");
const guestResult = document.getElementById("guests-result");

const contenedorBotonesAdultos = document.getElementById("botonesAdultos");
const contenedorBotonesChildren = document.getElementById("botonesChildren");
const valorAdultos = document.getElementById("valorAdultos");
const valorChildren = document.getElementById("valorChildren");
const botonesMas = document.querySelectorAll(".mas")
const botonesMenos = document.querySelectorAll(".menos")
const dropdownCiudades = document.getElementById("dropdown-ciudades");
const btnSearchModal = document.getElementById("btn-search-modal");
const btnLocationMain=document.getElementById("btn-location-main")
const btnGuestsMain=document.getElementById("btn-guests-main")



let totalAdultos = 0
let totalChildren=0

//filtro con dropdown dinamico para las ciudades:
function inicializarFiltroCiudades(){
    const ciudadesUnicas = [...new Set(baseDeDatos.map(stay=> stay.city))];

    locationInput.addEventListener("input",(e)=>{
      const valorInput = e.target.value.toLowerCase().trim();
      dropdownCiudades.innerHTML="";

      if (valorInput===""){
        dropdownCiudades.classList.add("hidden")
        return
      }

      const ciudadesFiltradas = ciudadesUnicas.filter(ciudad => ciudad.toLocaleLowerCase().includes(valorInput));

      if (ciudadesFiltradas.length > 0){
        dropdownCiudades.classList.remove("hidden");

        ciudadesFiltradas.forEach(ciudad =>{
          const li = document.createElement("li")
          li.textContent =`📍${ciudad}, Finland`
          li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-slate-700 transition-colors"

          li.addEventListener("click",()=>{
            locationInput.value = `${ciudad}`
            dropdownCiudades.classList.add("hidden")
          });

          dropdownCiudades.appendChild(li);
        });
      } else {
        dropdownCiudades.classList.add("hidden")
      }
    })

    document.addEventListener("click",(e)=> {
      if(!locationInput.contains(e.target) && !dropdownCiudades.contains(e.target)){
        dropdownCiudades.classList.add("hidden")
      }
    })
}




function conectarBotonBuscar(){
  btnSearchModal.addEventListener("click",()=>{
    const destindoBuscado = locationInput.value.toLocaleLowerCase().trim();
    const totalGuests = totalAdultos + totalChildren

    const staysFiltrados= baseDeDatos.filter(stay=>{
      const coincideCiudad = destindoBuscado ===""||stay.city.toLocaleLowerCase().includes(destindoBuscado)
      const coincideHuespedes = totalGuests <=stay.maxGuests;
      return coincideCiudad && coincideHuespedes
    })

    crearTarjetas(staysFiltrados)

    menuModal.classList.add("hidden")
    btnLocationMain.textContent=destindoBuscado
    btnGuestsMain.textContent=`${totalGuests} guests`

  })
}

/* Funcion actualizar contactos
* funcion que calcula el total de invitados y actualiza el contenedor guests
*
*/
function actualizarContadores(){
    const totalGuests = totalAdultos + totalChildren

    valorAdultos.textContent=totalAdultos
    valorChildren.textContent = totalChildren

    

    if (totalGuests ===0 ){
        guestResult.textContent = "Add guests"
        if(totalAdultos===0){
/*             for (let i = 0; i < botonesMenos.length; i++) {
                const element = botonesMenos[i];
                element.classList.add("hidden")
                
            } */
        }

    }else{
        guestResult.textContent = `${totalGuests} guest${totalGuests>1 ?'s':''}`
            /* for (let i = 0; i < botonesMenos.length; i++) {
                const element = botonesMenos[i];
                element.classList.remove("hidden")
                

            }  */   
        }
}

//manejo de clicks en contenedores adulto y niños. Delegando eventos segun target.

//adultos
function ejecutarContadores(){
contenedorBotonesAdultos.addEventListener("click",(e)=>{

    if(e.target.classList.contains("mas")){
        totalAdultos++;
    }
    else if(e.target.classList.contains("menos")){
        if(totalAdultos>0){
        totalAdultos--;
        }
    }
    actualizarContadores();
})

//niños
contenedorBotonesChildren.addEventListener("click",(e)=>{
    if(e.target.classList.contains("mas")){
        totalChildren++
    }
    else if(e.target.classList.contains("menos")){
        if(totalChildren>0){
        totalChildren--
        }
    }
    actualizarContadores();
})
}

//funcion que inicializara los event listeners en main:

function inicializarEventos(){
    location
}

//funcion que abre el modal
function abrirMenuModal() {
  searchBar.addEventListener("click", () => {
    menuModal.classList.toggle("hidden");
    // menuModal.classList.toggle("h-187","w-full","bg-white")
    // menuModal.classList.toggle("absolute")
  });
  cierraModal.addEventListener("click", () => {
    menuModal.classList.toggle("hidden");
  });
}

//funcion que itera la base de datos y genera las tarjetas. Tiene como objetivo

function crearTarjetas(infoDeStays = baseDeDatos) {
  if (!infoDeStays) return;
  contDeTarjetas.innerHTML = "";

  infoDeStays.forEach((stay) => {
    const tarjeta = document.createElement("article"); //cuerpo de cada tarjeta
    const imagen = document.createElement("img"); //src value de cada imagen
    const description = document.createElement("span"); //greyed text que describe las amenidades
    const rating = document.createElement("p");
    const highlights = document.createElement("p"); //highlights del departamento al pie de la tarjeta
    const contDescripRate = document.createElement("div");

    //agregando atributos a las variables creadas
    imagen.src = stay.photo; //agregando el src de c/img
    imagen.alt = `Fotografia de ${stay.title}`;
    description.textContent = `${stay.type}. ${stay.beds} beds`;
    rating.innerHTML = `<img src="${star}" alt="logo" class="  w-5" > ${stay.rating}`;
    highlights.textContent = stay.title;

    contDescripRate.append(description, rating);
    tarjeta.append(imagen, contDescripRate, highlights);
    contDeTarjetas.appendChild(tarjeta);

    //Agregando clases a cada elemento

    imagen.className = "rounded-3xl w-full h-60 md:h-75 lg:w-full object-cover";
    description.className = " text-slate-400 ";
    rating.className = "flex";
    contDescripRate.className = "flex justify-between";
    highlights.className = "font-semibold";
    tarjeta.className = "mb-5 lg:w-19/20";
  });
}

export { test, crearTarjetas, abrirMenuModal,ejecutarContadores,inicializarFiltroCiudades, conectarBotonBuscar };
