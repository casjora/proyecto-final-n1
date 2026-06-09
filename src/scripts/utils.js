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

//vincular stays.js localmente:

import {stays} from "./stays.js"

const baseDeDatos = stays

//declaracion de variables que se comunican al DOM:

const contDeTarjetas = document.getElementById("card-container")//section contenedor de las tarjetas




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

//agregando atributos a las variables creadas
        imagen.src=stay.photo //agregando el src de c/img
        imagen.alt = `Fotografia de ${stay.title}`
        description.textContent=`${stay.type}. ${stay.beds} beds`
        rating.innerHTML = `<img src="../images/icons/star.svg" alt="logo" class=" bg-amber-600 w-3"> ${stay.rating}`
        highlights.textContent = stay.title

        tarjeta.append(imagen,description,rating,highlights)
        contDeTarjetas.appendChild(tarjeta)
        //Agregando clases a cada elemento


    })




}




export {test,crearTarjetas}