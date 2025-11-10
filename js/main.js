/*-------------------------------------------------------
------------------VARIABLES------------------------------
---------------------------------------------------------*/

const apiKey1="WdGuOuXQaXIVOWWpWP1EHxJb0tx7bJg2ncPFuRf8ASUIEQpiSMkjiwgA"
const apiKey2="23EAVF3IG22POMNw02GievOTkgYTpupamxpWVO2aG07T1fEYlh0Zse7g"
const urlBase="https://api.pexels.com/v1"


//capturar imágenes del dom
const buscar = document.querySelector('.btnnBuscar') //id de ejemplo
const imagenesPorCategoria = document.querySelector('.categoria')

//hacer llamamamiento al localStorage para sacar las favoritas

/*-------------------------------------------------------
------------------EVENTOS------------------------------
---------------------------------------------------------*/
buscar.addEventListener('submit', (ev))

document.addEventListener('click', (ev) =>{

    // evento para que el botón buscar te muestre las imágenes que le damos como parámentro en el imput
    if(ev.target.matches('#buscar')) {
        pintarImagenes(parametro)
        
    } else if (ev.target.matches('.categoria')) {
       //evento que clicke a una de las imágenes por categoría. 
    pintarImágenes(idCategoria)
}
})

// /
// //  para ello hay que darle una clase a esas imágenes y cada una tendrá un id con su categoría
// // (ev.target.matches(.claseImágenes)) y que recoja como parámentro su idCategoria
// //  pintarImágenes(idCategoria) 
// document.addEventListener('click', (ev) =>{
//     if) {
        
//     }
// })



// //Evento que al hacer click en una imagen haga un pop up
// // popUp(idImagen)
document.addEventListener('click', (ev) =>{
    //aquí el evento debería sacar la id de la imagen
    const idImagen = ev.target.id 
    popUp(idImagen)
    }
)

// //evento que muestre las imágenes favoritas
// document.addEventListener('click', (ev) =>{
//     if(ev.target.matches('#botonFavoritas')) {
//         pintarImágenes(favoritas, orientaciónpordefecto) //ver bien dónde sacarlas
//     }
// })

// //Evento que esté a la escucha de que se clicke el botón guardar favoritos
// // llamar a guardarFavoritos(idImagen)
// document.addEventListener('click', (ev) =>{
//     if(ev.target.matches('.botonFavoritos')) {
//         guardarFavoritos(idImagen)
//     }
// })

// //Evento filtro orientación fotos
// document.addEventListener('click', (ev) =>{
//     if(ev.target.matches()) {
//         filtrarPorOrientacion(orientacion)
//         // esto igual se puede hacer directamente con el evento categorías, por ejemplo
//         // si es que la url coincide, si no se haría este evento que llame
//         // a esta funcion la cual sería parecida (mirar doc de la api)
//     }
// })



/*-------------------------------------------------------
------------------FUNCIONES------------------------------
---------------------------------------------------------*/
/**
 * Funcion llamada API
 * @param {String} endpoint es el valor de la query a buscar
 * @returns Una promesa con el objeto conteniendo todas las fotos
 */
const llamadaAPI=async(endpoint,perPage,size)=>{
    
    const query=`search?query=${endpoint}&per_page=${perPage}&size=${size}l`
    try {
        const resp=await fetch(`${urlBase}/${query}`,{method:'GET',headers:{'Authorization': apiKey1},})

        if (resp.ok) {
            const data= await resp.json();
            //console.log(data)
            return data
        }else{
             throw `Ha habido un error al cargar el endpoint ${endpoint}`
        }
    } catch (error) {
        throw error
    }

}

console.log(llamadaAPI("technology",1,"small"))
console.log(llamadaAPI("nature",1,"small"))
console.log(llamadaAPI("people",1,"small"))


const validarBusqueda = (parametroDeBusqueda) => {
    

}


const borrarImagenes = () =>{
    // seleccionar el lugar del dom y eliminar la galería. Se pordía meter dentro
    // de un div y eliminarlo. luego al pintar, volverlo a meter
}

const pintarImagenes =async (de)  => {
    // let orientacion = 'todas' // orientación por defecto para que pinte
    //que borre las imágenes del html (llamar a la función borrarImágenes())
    //borrarImagenes()
    
    const categoria1 = document.query
    const categoria2 = document.createElement('DIV')
    const categoria3 = document.createElement('DIV')
    
    try {
        const resp= await llamadaAPI();
        const arrPhotos=resp.photos;

        arrPhotos.forEach(element => {
            
            c
        });

    } catch (error) {
        throw error
    }
    

    // que nos pinte en el html el array con las imágenes:
    // hacer un forEach que pinte los elementos del html : imagen, título, autor
    
    const opciones =0;
    const textoBusqueda=0;
}
//     arrayDeImagenes.array.forEach(element => {

//         const section = 
//         const img = document.createElement('img')
//         const titulo = document
//         const autor // blablabla
//         const boton 
        
//         galeria.append('section')
//         section.append('img')
//         // blablabla

//         //mirar la docu de la api para la paginación
        
//     });

// }


// const modificarLocal = (idImagen, array) {
//     // pasos de la docu: (habría que pulirlo y colorcar las cosas en su sitio)
//     // let favoritos = [];
// //    // guardar el objeto de la imagen en el array del local
// //         // // Lista de favoritos
    

// //     // Guardar lista de favoritos en Session Storage
// //     localStorage.setItem("favoritos", JSON.stringify(favoritos));

// //     /* Para almacenar un objeto en Local Storage, primero convertimos el 
// //     objeto en una cadena JSON con JSON.stringify() y luego lo guardamos. 
// //     Al recuperarlo, lo deserializamos con JSON.parse(). */

// //     // Recuperar lista de favoritos
//     const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos"));
// //     // console.log(favoritosGuardados);
// //     // []
// }




// const guardarFavoritos = (idImagen) => {
//     aquí molaría una función que lea si está ya la imagen fav, que se quede
//     el array tal cual o icluso que elimine la foto de favoritos, si no, que la añada
//     if(favoritos.includes(idImagen)) {
//         return favoritos // array tal cual
//          favoritos.filter(imagen => imagen != imagen.icludes(idImagen))
//         te la eliminaría de favoritos (mirar a ver si funciona que lo he puesto un poco como me ha salido)
        

//     } else {
//          favoritos = [...favoritos, idImagen]
//     }
//     modificarLocal()
// }


// const popUpImagen = (idImagen) => {
//     //para el final o abrir la imagen en una página y ya está
// }

// const filtrarPorOrientacion = (orientacion) => {
//     pintarImágenes(filtroBusqueda, parametro)
    
// }

/*-------------------------------------------------------
------------------INVOCACIONES------------------------------
---------------------------------------------------------*/