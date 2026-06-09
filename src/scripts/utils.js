/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */



function test(){
    //todos los datos
    console.log(baseDeDatos)

    //usando filter
    console.log(baseDeDatos.filter(dato=>dato.city==="Helsinki"))

    //usando map, doblando el numero de camas
    console.log(baseDeDatos.map(dbeds=>dbeds.beds*2))
    //usando map, mostrar todo el arreglo nuevo y doblando el numero de camas
    console.log(baseDeDatos.map(dbeds => {
        return{
            ...dbeds,
            beds:dbeds.beds*2
        }
    }))

    //lo mismo pero en una sola linea. usar parentesis:
    console.log(baseDeDatos.map(dbeds => ({ ...dbeds, beds: dbeds.beds * 2 }))); 

    //sumar arreglo

  console.log(baseDeDatos.reduce((resultado, elementoActual) => {
    return resultado + elementoActual.maxGuests;
}, 0));
}

import star from '../images/icons/star.svg'
//vincular stays.js localmente:

import {stays} from "./stays.js"

const baseDeDatos = stays

//declaracion de variables que se comunican al DOM:

const contDeTarjetas = document.getElementById("card-container")//section contenedor de las tarjetas
const searchBar = document.getElementById("search-bar")//contenedor del searchbar al ingresar a la pagina
const menuModal = document.getElementById("menu")
const contenedorMain = document.getElementById("contenedor-main")
const cierraModal = document.getElementById("cierra-modal")


//funcion que abre el modal
function abrirMenuModal(){
    searchBar.addEventListener("click",()=>{
        menuModal.classList.toggle("hidden")
       // menuModal.classList.toggle("h-187","w-full","bg-white")
       // menuModal.classList.toggle("absolute")

    })
   cierraModal.addEventListener("click",()=>{
    menuModal.classList.toggle("hidden")

 
        })
}

//funcion que itera la base de datos y genera las tarjetas. Tiene como objetivo 

function crearTarjetas (infoDeStays=baseDeDatos){
    if(!infoDeStays) return;
    contDeTarjetas.innerHTML=""

    infoDeStays.forEach(stay=>{
        const tarjeta = document.createElement("article")//cuerpo de cada tarjeta
        const imagen = document.createElement("img")//src value de cada imagen
        const description = document.createElement("span")//greyed text que describe las amenidades
        const rating = document.createElement("p")
        const highlights = document.createElement("p")//highlights del departamento al pie de la tarjeta
        const contDescripRate = document.createElement("div")

//agregando atributos a las variables creadas
        imagen.src=stay.photo //agregando el src de c/img
        imagen.alt = `Fotografia de ${stay.title}`
        description.textContent=`${stay.type}. ${stay.beds} beds`
        rating.innerHTML = `<img src="${star}" alt="logo" class="  w-5" > ${stay.rating}`
        highlights.textContent = stay.title

        contDescripRate.append(description,rating)
        tarjeta.append(imagen,contDescripRate,highlights)
        contDeTarjetas.appendChild(tarjeta)
        
        //Agregando clases a cada elemento

        imagen.className="rounded-3xl w-full h-60 object-cover"
        description.className=" text-slate-400 "
        rating.className="flex"
        contDescripRate.className = "flex justify-between"
        highlights.className ="font-semibold"
        tarjeta.className = "mb-5"


    })




}




export {test,crearTarjetas,abrirMenuModal}