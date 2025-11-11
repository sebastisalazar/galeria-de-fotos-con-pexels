/*-------------------------------------------------------
------------------VARIABLES------------------------------
---------------------------------------------------------*/

//VARIABLES PARA LA API
const apiKey1="WdGuOuXQaXIVOWWpWP1EHxJb0tx7bJg2ncPFuRf8ASUIEQpiSMkjiwgA"
const apiKey2="23EAVF3IG22POMNw02GievOTkgYTpupamxpWVO2aG07T1fEYlh0Zse7g"
const urlBase="https://api.pexels.com/v1"

//VARIABLES PARA PINTAR
const fragmento=document.createDocumentFragment();

//VARIABLES PARA CAPTURAR ELEMENTOS DEL DOM PARA PODER PINTAR
const resultados = document.querySelector("#resultados")
const cabeceraResultados = document.querySelector("#cajaResultados")

//VARIABLES CATEGORIAS para TENDENDCIAS
const categorias=["Naturaleza","Tecnologia","Personas"]

//CAJA DONDE SE PINTARA LAS CATEGORIAS DE TENDENCIAS
const categoriasCaja = document.querySelector("#categorias")

//INICIALIZACION PARA el parametro SEARCH de LA API
let categoriaSeleccionada="";
//INICIALIZACION PARA el parametro PAGE de LA API
let page=1;
//INICIALIZACION PARA el parametro ORIENTATION de LA API
let orientacion="landscape"

//VARIABLE QUE CAPTURA EL BOTON (necesario para el evento)
const buscar = document.querySelector('.btnnBuscar') //id de ejemplo

//CAPTURA EL LINK DE CADA CATEGORIA
const imagenesPorCategoria = document.querySelector('.categoria')


/*-------------------------------------------------------
------------------EVENTOS------------------------------
---------------------------------------------------------*/

// TODO EVENTO CLICK
document.addEventListener('click', (ev) =>{
    
    //EVENTO CLICK en el boton BUSCAR
    if(ev.target.matches('.btnBuscar')) {
        
        //CAPTURA EL VALOR INTRODUCIDO EN EL CAMPO TEXTO A BUSCAR
        const aBuscar=document.querySelector("#buscar").value;

        //SE VALIDA la busqueda. Si es valido setea la categoria(parametro de search API) a lo que se haya escrito y se pinta
        if(validarBusqueda(aBuscar)==true){

            setearCategoria(aBuscar)
            pintarPaginacion();
            
        }
        
        //SI SE HA HECHO CLICK SOBRE un LINK CON CATEGORIA 
    } else if (ev.target.matches('.categoria')) {
       
        //console.log("haz hecho click en una categoria!")
        setearCategoria(ev.target.id) //Setea la categoria(parametro de search API) cogiendola del ID del LINK
        pintarPaginacion(); //PINTA

        //SI SE HA HECHO CLICK SOBRE UN BOTON CON ID NEXTPAGE
    }else if (ev.target.matches('#nextPage')) {

        page++; //suma 1 a la paginacion que se muestra en el momento
        pintarPaginacion(); //PINTA

        //SI SE HA HECHO CLICK SOBRE UN BOTON CON ID PREVIOUSPAGE
    }else if (ev.target.matches('#previousPage')) {
        
        if(page>1){//revisa si la pagina es mayor a 1
            page--; //si lo es resta
        }
        pintarPaginacion(); //PINTA

        //SI SE HA HECHO CLICK SOBRE UN BOTON DE AÑADIR A FAVORITOS
    }else if (ev.target.matches('#btnFav')) {
       //evento que clicke a una de las imágenes por categoría.
        alert("Se ha añadido tu foto a favoritos!")
    }
})

//EVENTO CHANGE PARA ESCUCHAR EL BOTON SELECT

document.addEventListener("change",(ev)=>{

    //SI ES EN SELECT CON ID FILTRO
    if(ev.target.matches('#filtro')){
        //console.log("Se ha cambiado el valor del select")
        orientacion=ev.target.value; //Setea la categoria(parametro de search API)
        //console.log(orientacion)
        pintarPaginacion(); //PINTA
    }

})

/**
 * Funcion que setea un nuevo valor a categoria(parametro de search API)
 * @param {String} nuevoValor de busqueda
 */
const setearCategoria=(nuevoValor)=>{
        categoriaSeleccionada=nuevoValor;
}

/**
 * 
 */
const limpiarfiltro=()=>{
    const select=document.querySelector("section>select")
        if(select!==null){
            select.remove()
        }
}

const limpiarBotonesPaginacion=()=>{
    const div=document.querySelector("#paginacion")
        if(div!==null){
            div.remove()
        }
}

// /
// //  para ello hay que darle una clase a esas imágenes y cada una tendrá un id con su categoría
// // (ev.target.matches(.claseImágenes)) y que recoja como parámentro su idCategoria
// //  pintarImágenes(idCategoria) 
// document.addEventListener('click', (ev) =>{
//     if) {
        
//     }
// })


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



/*-------------------------------------------------------
------------------FUNCIONES------------------------------
---------------------------------------------------------*/
/**
 * Funcion llamada API
 * @param {String} endpoint es el valor de la query a buscar
 * @returns Una promesa con el objeto conteniendo todas las fotos
 */
const llamadaAPI=async(endpoint,perPage,size,orientacion)=>{
    
    
    const query=`search?query=${endpoint}&page=${page}&per_page=${perPage}&size=${size}&orientation=${orientacion}&locale=es-ES`
    //console.log(query)
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
    const regex=/^[a-zA-Z]+$/u

    if(regex.test(parametroDeBusqueda)){
        return true
    }else{
        console.log("El campo busqueda no admite valores numericos")
        
        return false
    }

}


// const borrarImagenes = () =>{
//     // seleccionar el lugar del dom y eliminar la galería. Se pordía meter dentro
//     // de un div y eliminarlo. luego al pintar, volverlo a meter
// }

const pintarImagenes =async ()  => {
    
    

    try {

        //Recorre el numero de catergoria
        for (let index = 0; index < categorias.length; index++) {
            
            //por cada categoria se llama a la API
            const resp= await llamadaAPI(categorias[index],1,"small",orientacion);
            //console.log(resp)
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




const pintarPaginacion =async ()  => {
    limpiarBotonesPaginacion();
    limpiarfiltro();
    resultados.innerHTML=""

    const filtroOrientacion=document.createElement("SELECT");
    filtroOrientacion.id="filtro"

    const horizontal=document.createElement("OPTION");
    const vertical=document.createElement("OPTION");

    horizontal.textContent="Horizontal";
    horizontal.value="landscape";

    vertical.value="portrait"
    vertical.textContent="Vertical"

    if(horizontal.value==orientacion){
        horizontal.selected="selected"
    }else{
        vertical.selected="selected"
    }
    

    filtroOrientacion.append(horizontal);
    filtroOrientacion.append(vertical);

    cabeceraResultados.prepend(filtroOrientacion)
    const mensajeResultados = document.querySelector("#mensajeResultados")

    try {

        mensajeResultados.textContent="Mostrando:"+categoriaSeleccionada+"- Page "+page
        const resp= await llamadaAPI(categoriaSeleccionada,9,"small",orientacion);

        //Recorre el numero de catergoria
        for (let index = 0; index < 1; index++) {
            

            page=resp.page;
            //console.log(page)
            //console.log(resp)

            resp.photos.forEach(element => {

                const article=document.createElement("ARTICLE")
                const div=document.createElement("DIV")
                const img=document.createElement("IMG");
                const h3=document.createElement("H3");
                const p=document.createElement("P");
                const btnFav=document.createElement("BUTTON")

                img.src=element.src.original
                img.alt=element.alt
                img.id=element.id
                h3.textContent=element.alt
                h3.id=element.alt
                h3.className ="categoria"
                p.textContent="By "+element.photographer

                btnFav.textContent="❤️ Añadir a Favoritos"  //"\u2665"
                btnFav.id="btnFav"

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
        cabeceraResultados.append(fragmento)
        
    } catch (error) {
        throw error
    }
 
}


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

pintarImagenes();