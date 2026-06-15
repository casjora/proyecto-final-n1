//Ejercicio 1 A=5 B =10\
function intercambiarValores(){
let cuentaA=5
let cuentaB=10

cuentaA = cuentaA+cuentaB

cuentaB = cuentaA-cuentaB
cuentaA=cuentaA-cuentaB
}

//Cuenta A = 10, Cuenta B =5

//Reto 2 Validador digital

function validadorDigital(){
    let nivel = 0
    let ptsHonor = 0
    let paseVip

    nivel = parseInt(prompt("Ingrese su nivel: "))
    ptsHonor = parseInt(prompt("Ingrese sus puntos de honor "))
    paseVip = prompt("Tiene pase VIP? (S/N)")
    if (paseVip.toLowerCase()==="s"){
        paseVip=true
    }else{
        paseVip=false
    }
    let ejemplar=nivel>=20 && (ptsHonor===100 || paseVip===true)

    if(ejemplar){
        console.log("El usuario ha sido aprobado")
    }else{
        console.log("El usuario no cumple las condiciones")
    }
}

//Reto 3: Simulador de combate

function simuladorDeCombate(){
    let ptosVida=parseInt(prompt("Cuantos puntos de vida tendra el jugador?"))
    let enemyAttack = parseInt(prompt("Cuantos puntos de ataque tendra el enemigo?"))

    let contador = 1
    console.log(`la vida del usuario es ${ptosVida}`)
    while (ptosVida >=10) {

        ptosVida=ptosVida-enemyAttack
        console.log(`Resultado del ataque ${contador}` )
        console.log(`Tienes ${ptosVida} puntos de vida`)
        
            contador++
        if(ptosVida<10){
            alert("¡Peligro crítico!")
            break

        }else{
        alert("Sobreviviste")
        }

    

    }
}