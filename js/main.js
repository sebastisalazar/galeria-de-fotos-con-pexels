/*-------------------------------------------------------
------------------VARIABLES------------------------------
---------------------------------------------------------*/

//capturar imágenes del dom
const buscar = document.querySelector('#buscar') //id de ejemplo
const imagenesPorCategoria = document.querySelector('.categoria')

//hacer llamamamiento al localStorage para sacar las favoritas




/*-------------------------------------------------------
------------------EVENTOS------------------------------
---------------------------------------------------------*/

// evento para que el botón buscar te muestre las imágenes que le damos como parámentro en el imput
// que llame a la función pintarImágenes(parámetro de búsqueda) 
document.addEventListener('click', (ev) =>{
    if(ev.target.matches('#buscar')) {
        pintarImágenes(parametro)
    }
})

//evento que clicke a una de las imágenes por categoría.
//  para ello hay que darle una clase a esas imágenes y cada una tendrá un id con su categoría
// (ev.target.matches(.claseImágenes)) y que recoja como parámentro su idCategoria
//  pintarImágenes(idCategoria) 
document.addEventListener('click', (ev) =>{
    if(ev.target.matches('.categoria')) {
        pintarImágenes(idCategoria)
    }
})



//Evento que al hacer click en una imagen haga un pop up
// popUp(idImagen)
document.addEventListener('click', (ev) =>{
    //aquí el evento debería sacar la id de la imagen
    const idImagen = ev.target.id //no estoy segura de que se ponga así(comprobar con la docu)
        popUp(idImagen)
    }
)

//evento que muestre las imágenes favoritas
document.addEventListener('click', (ev) =>{
    if(ev.target.matches('#botonFavoritas')) {
        pintarImágenes(favoritas) //ver bien dónde sacarlas
    }
})

//Evento que esté a la escucha de que se clicke el botón guardar favoritos
// llamar a guardarFavoritos(idImagen)
document.addEventListener('click', (ev) =>{
    if(ev.target.matches('.botonFavoritos')) {
        guardarFavoritos(idImagen)
    }
})

//Evento filtro orientación fotos
document.addEventListener('click', (ev) =>{
    if(ev.target.matches()) {
        filtrarPorOrientacion(orientacion)
        // esto igual se puede hacer directamente con el evento categorías, por ejemplo
        // si es que la url coincide, si no se haría este evento que llame
        // a esta funcion la cual sería parecida (mirar doc de la api)
    }
})



/*-------------------------------------------------------
------------------FUNCIONES------------------------------
---------------------------------------------------------*/

const validarBusqueda = (parametroDeBusqueda) => {
    //mis dudas de si meter esto. molaría por quedar bien, pero quizás lo
    //metería si da tiempo??

}


const borrarImagenes = () =>{
    // seleccionar el lugar del dom y eliminar la galería. Se pordía meter dentro
    // de un div y eliminarlo. luego al pintar, volverlo a meter
}

const arrayDeImagenes = (parametroDeBusqueda) => {
    //con una función asyncrona que llame a la Api y nos de el array de objetos 
    // mirar la doc de la api para ver dónde hay que colocar en la url el parámetro,
    //si es necesario, hacer más fuciones (una por cada evento o según url)
    //sacar del objeto la imagen, título y autor
    // pintar boton favoritos
}


const pintarImágenes = (parametroDeBusqueda)  => {
    //que borre las imágenes del html (llamar a la función borrarImágenes())
    borrarImagenes()
    arrayDeImagenes()
    // que nos pinte en el html el array con las imágenes:
    // hacer un forEach que pinte los elementos del html : imagen, título, autor
    const galeria = document.createElement('DIV')
    arrayDeImagenes.array.forEach(element => {

        const section = 
        const img = document.createElement('img')
        const titulo = document
        const autor // blablabla
        const boton 
        
        galeria.append('section')
        section.append('img')
        // blablabla

        //mirar la docu de la api para la paginación
        
    });

}


const modificarLocal = (idImagen, array) {
    // pasos de la docu: (habría que pulirlo y colorcar las cosas en su sitio)
    // let favoritos = [];
//    // guardar el objeto de la imagen en el array del local
//         // // Lista de favoritos
    

//     // Guardar lista de favoritos en Session Storage
//     localStorage.setItem("favoritos", JSON.stringify(favoritos));

//     /* Para almacenar un objeto en Local Storage, primero convertimos el 
//     objeto en una cadena JSON con JSON.stringify() y luego lo guardamos. 
//     Al recuperarlo, lo deserializamos con JSON.parse(). */

//     // Recuperar lista de favoritos
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"));
//     // console.log(favoritosGuardados);
//     // []
}




const guardarFavoritos = (idImagen) => {
    // aquí molaría una función que lea si está ya la imagen fav, que se quede
    // el array tal cual o icluso que elimine la foto de favoritos, si no, que la añada
    if(favoritos.includes(idImagen)) {
        // return favoritos // array tal cual
        return favoritos.filter(imagen => imagen != imagen.icludes(idImagen))
        // te la eliminaría de favoritos (mirar a ver si funciona que lo he puesto un poco como me ha salido)
        

    } else {
        return favoritos = [...favoritos, idImagen]
    }
    modificarLocal()
}


const popUpImagen = (idImagen) => {
    //esto se haría con el css?
}

const filtrarPorOrientacion = (orientacion) => {
    
}

/*-------------------------------------------------------
------------------INVOCACIONES------------------------------
---------------------------------------------------------*/