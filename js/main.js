/*-------------------------------------------------------
------------------VARIABLES------------------------------
---------------------------------------------------------*/

const apiKey1="WdGuOuXQaXIVOWWpWP1EHxJb0tx7bJg2ncPFuRf8ASUIEQpiSMkjiwgA"
const apiKey2="23EAVF3IG22POMNw02GievOTkgYTpupamxpWVO2aG07T1fEYlh0Zse7g"
const urlBase="https://api.pexels.com/v1"


let categoriaSeleccionada="";
let page=1;

//capturar imágenes del dom
const buscar = document.querySelector('.btnnBuscar') //id de ejemplo
const imagenesPorCategoria = document.querySelector('.categoria')
// const favoritos = document.createDocumentFragment()


//hacer llamamamiento al localStorage para sacar las favoritas

/*-------------------------------------------------------
------------------EVENTOS------------------------------
---------------------------------------------------------*/
//buscar.addEventListener('submit', (ev))

document.addEventListener('click', (ev) =>{
    // evento para que el botón buscar te muestre las imágenes que le damos como parámentro en el imput
    if(ev.target.matches('#buscar')) {
        pintarImagenes(parametro)
    } else if (ev.target.matches('.categoria')) {
       //evento que clicke a una de las imágenes por categoría.
        //console.log("haz hecho click en una categoria!")
        categoriaSeleccionada=ev.target.id
        page=1;
        pintarPaginacion();
    }else if (ev.target.matches('#nextPage')) {
       //evento que clicke a una de las imágenes por categoría.
        page++;
        pintarPaginacion();
    }else if (ev.target.matches('#previousPage')) {
       //evento que clicke a una de las imágenes por categoría.

        if(page>1){
            page--;
            pintarPaginacion();
        }
        

    }else if (ev.target.matches('.btnFav')) {
       //evento que clicke a una de las imágenes por categoría.
        console.log("Se ha añadido tu foto a favoritos!")
        anadirLocalFavoritos(ev.target.id)
    } 
    else if (ev.target.matches('.btnQFav')) {
        quitarDeFavoritos(ev.target.id)
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
// document.addEventListener('click', (ev) =>{
//     //aquí el evento debería sacar la id de la imagen
//     const idImagen = ev.target.id 
//     popUp(idImagen)
//     }
// )

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
    
    
    const query=`search?query=${endpoint}&page=${page}&per_page=${perPage}&size=${size}l`
    try {
        const resp=await fetch(`${urlBase}/${query}`,{method:'GET',headers:{'Authorization': apiKey1},})
        //console.log(query)
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


const validarBusqueda = (parametroDeBusqueda) => {
    

}


// const borrarImagenes = () =>{
//     // seleccionar el lugar del dom y eliminar la galería. Se pordía meter dentro
//     // de un div y eliminarlo. luego al pintar, volverlo a meter
// }

const pintarImagenes =async ()  => {
    
    const categorias=["Naturaleza","Tecnologia","Personas"]
    const categoriasCaja = document.querySelector("#categorias")
    const fragmento=document.createDocumentFragment();

    try {

        //Recorre el numero de catergoria
        for (let index = 0; index < categorias.length; index++) {
            
            //por cada categoria se llama a la API
            const resp= await llamadaAPI(categorias[index],1,"small");
            // console.log(resp)
            resp.photos.forEach(element => {

                const article=document.createElement("ARTICLE")
                const div=document.createElement("DIV")
                const img=document.createElement("IMG");
                const h3=document.createElement("H3");
                const p=document.createElement("A");

                img.src=element.src.original
                img.alt=element.alt
                h3.textContent=categorias[index]
                h3.id=categorias[index]
                h3.className ="categoria"

                article.append(div);
                div.append(img);
                div.append(h3);
                div.append(p);

                fragmento.append(article)
                categoriasCaja.append(fragmento)

            });
        }
        
    } catch (error) {
        throw error
    }
 
}


pintarImagenes();

const pintarPaginacion =async ()  => {
    
    const resultados = document.querySelector("#resultados")
    
    resultados.innerHTML="";

    const mensajeResultados = document.querySelector("#mensajeResultados")

    const fragmento=document.createDocumentFragment();

    try {

        mensajeResultados.textContent="Mostrando:"+categoriaSeleccionada+"- Page "+page
        const resp= await llamadaAPI(categoriaSeleccionada,9,"small");

        //Recorre el numero de catergoria
        for (let index = 0; index < 1; index++) {
            

            page=resp.page;
            // console.log(page)
            // console.log(resp)

            resp.photos.forEach(element => {
                // console.log(element)

                const article=document.createElement("ARTICLE")
                const div=document.createElement("DIV")
                const img=document.createElement("IMG");
                const h3=document.createElement("H3");
                const p=document.createElement("P");
                const btnFav=document.createElement("BUTTON")

                img.src=element.src.original
                img.alt=element.alt
                h3.textContent=element.alt
                h3.id=element.alt
                // h3.className ="categoria"
                p.textContent="By "+element.photographer

                btnFav.textContent="❤️ Añadir a Favoritos"  //"\u2665"
                btnFav.className="btnFav"
                btnFav.id = element.id

                article.append(div);
                div.append(img);
                div.append(h3);
                div.append(p);
                div.append(btnFav)

                fragmento.append(article)
                resultados.append(fragmento)

            });
        }

        const botones=document.createElement("DIV")
        const nextPage=document.createElement("BUTTON")
        const previousPage=document.createElement("BUTTON")
        const currentPage=document.createElement("BUTTON")

        nextPage.textContent="SIGUIENTE";
        previousPage.textContent="ATRAS";
        currentPage.textContent=resp.page

        nextPage.id="nextPage"
        previousPage.id="previousPage"
        currentPage.id="currentPage"
        botones.id="paginacion"

        botones.append(previousPage,currentPage,nextPage);
        fragmento.append(botones)
        resultados.append(fragmento)
        
    } catch (error) {
        throw error
    }
 
}



//-------------------------FAVORITOS--------------------------//

const llamadaApiFavoritos = async (idImagen) => {
    try {
        const resp = await fetch (`${urlBase}/photos/${idImagen}`,{method:'GET',headers:{'Authorization': apiKey1},})
        if (resp.ok) {
            const data = await resp.json()
            return data
        } else {
            throw 'Ha habido un error al guardar la foto'
        }
    } catch (error) {
        throw error
    }
}


/**
 * Obtener el array del LocalStorage
 * @param {String} identificador 
 * @returns {Array}
 */
const obtenerLocal = (identificador) => {
    // console.log({identificador})
     const arrayLocal=JSON.parse(localStorage.getItem(identificador)) || []
    //  console.log(arrayLocal, ' en obtenerLocal')
     return arrayLocal
    // return JSON.parse(localStorage.getItem(identificador)) || []
    // return []
}


/**
 * Setear el array del LocalStorage
 * @param {String} identificador 
 * @param {Array} array
 */
const setearLocal = (array) =>{
    return localStorage.setItem('favoritos', JSON.stringify(array));
}

const anadirLocalFavoritos = async (idImagen) => {
    // const seccionFavoritos = document.querySelector('#imagenesFavoritos')
    // seccionFavoritos.innerHTML = ''
    // const fotosFavoritos = document.createDocumentFragment()
    
    try {
        const resp = await llamadaApiFavoritos(idImagen)
        // console.log({resp})

        const arrayLocal = obtenerLocal('favoritos')
        // const arrayLocal = []
        // console.log(arrayLocal)

        const newObject={
                id: resp.id,
                src: resp.src.original,
                alt: resp.alt,
                photographer: resp.photographer
            }
        
        const existe= arrayLocal.find((obj)=>obj.id==idImagen)

        if(!existe) {
            // console.log('no existe este elemento')

            
            setearLocal( [...arrayLocal, newObject])
        }
    } catch (error){
        console.log(error)
    }
}



const pintarFavoritos = ()  => {
    
    const favoritos = document.querySelector("#imagenesFavoritos")
   
    
    favoritos.innerHTML="";

    // const mensajeFavoritos = document.querySelector("#mensajeResultados")

    const fragmento=document.createDocumentFragment();


        // mensajeResultados.textContent='Imágenes favoritas'
        const arrayLocal = obtenerLocal('favoritos')
        console.log(arrayLocal)

        //Recorre el numero de catergoria
        // for (let index = 0; index < 1; index++) {
            const div=document.createElement("DIV")
            div.className = 'flexContainer'

            // page=resp.page;
            // console.log(page)
            // console.log(resp)

            arrayLocal.forEach(element => {
                // console.log(element)

                const article=document.createElement("ARTICLE")
                const div2=document.createElement("DIV")
                const img=document.createElement("IMG");
                const h3=document.createElement("H3");
                const p=document.createElement("P");
                const btnQuitarFav=document.createElement("BUTTON")

                

                img.src=element.src
                img.alt=element.alt
                img.id = element.id
                h3.textContent=element.alt
                h3.id=element.id
                // h3.className ="categoria"
                p.textContent="By "+element.photographer

                btnQuitarFav.textContent="💔 Quitar de Favoritos"  //"\u2665"
                btnQuitarFav.className="btnQFav"
                btnQuitarFav.id = element.id

                div.append(article)
                article.append(div2);
                div2.append(img);
                div2.append(h3);
                div2.append(p);
                div2.append(btnQuitarFav)

                

            });
        fragmento.append(div)
        favoritos.append(fragmento)
                // const botones=document.createElement("DIV")
        // const nextPage=document.createElement("BUTTON")
        // const previousPage=document.createElement("BUTTON")
        // const currentPage=document.createElement("BUTTON")

        // nextPage.textContent="SIGUIENTE";
        // previousPage.textContent="ATRAS";
        // currentPage.textContent=resp.page

        // nextPage.id="nextPage"
        // previousPage.id="previousPage"
        // currentPage.id="currentPage"
        // botones.id="paginacion"

        // botones.append(previousPage,currentPage,nextPage);
        // fragmento.append(botones)
        // resultados.append(fragmento)
        
    // }
}

const quitarDeFavoritos = (idImagen) => {
    // console.log(idImagen)
    const arrayLocal = obtenerLocal('favoritos')
    // console.log(arrayLocal)
    // const indiceFoto = arrayLocal.findIndex(element => element.id == idImagen)
    // console.log(indiceFoto)
    // const tercerArray = arrayLocal.map(elemento => elemento.id)
    // console.log(tercerArray)
    const nuevoarrayLocal = arrayLocal.filter((element) => element.id != idImagen)
    // console.log(nuevoarrayLocal)
    setearLocal(nuevoarrayLocal)
    pintarFavoritos()     

}

        


// const popUpImagen = (idImagen) => {
//     //para el final o abrir la imagen en una página y ya está
// }

// const filtrarPorOrientacion = (orientacion) => {
//     pintarImágenes(filtroBusqueda, parametro)
    
// }

/*-------------------------------------------------------
------------------INVOCACIONES------------------------------
---------------------------------------------------------*/
pintarFavoritos()