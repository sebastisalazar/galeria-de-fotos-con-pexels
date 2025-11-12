/*-------------------------------------------------------
------------------VARIABLES------------------------------
---------------------------------------------------------*/

//VARIABLES PARA LA API
const apiKey1="WdGuOuXQaXIVOWWpWP1EHxJb0tx7bJg2ncPFuRf8ASUIEQpiSMkjiwgA"
const apiKey2="23EAVF3IG22POMNw02GievOTkgYTpupamxpWVO2aG07T1fEYlh0Zse7g"
const urlBase="https://api.pexels.com/v1"

//VARIABLES PARA PINTAR
const fragmento=document.createDocumentFragment();

//VARIABLES PARA CAPTURAR ELEMENTOS DEL DOM PARA PODER PINTAR EN ELLOS
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
//INICIALIZACION PARA el parametro SIZE de LA API
let size="small";
let perPage=1;
//INICIALIZACION PARA el parametro ORIENTATION de LA API
let orientacion="landscape"

//VARIABLE QUE CAPTURA EL BOTON (necesario para el evento)
const buscar = document.querySelector('.btnnBuscar') //id de ejemplo

//CAPTURA EL LINK DE CADA CATEGORIA
const imagenesPorCategoria = document.querySelector('.categoria')
// const favoritos = document.createDocumentFragment()

//CAJA DONDE SE PINTARÁN LAS IMÁGENES FAVORITAS
const favoritos = document.querySelector("#imagenesFavoritos")



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
    }else if (ev.target.matches('.btnFav')) {

       //evento que clicke a una de las imágenes por categoría.
        console.log("Se ha añadido tu foto a favoritos!")
        anadirLocalFavoritos(ev.target.id)
    } 
    else if (ev.target.matches('.btnQFav')) {
        quitarDeFavoritos(ev.target.id)
    } 
    // else if (ev.target.matches('#pintarFavoritos')) {
    //     pintarFavoritos()
    // }
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





/*-------------------------------------------------------
------------------FUNCIONES------------------------------
---------------------------------------------------------*/



/**
 * Funcion que setea un nuevo valor a categoria(parametro de search API)
 * @param {String} nuevoValor de busqueda
 */
const setearCategoria=(nuevoValor)=>{
        categoriaSeleccionada=nuevoValor;
}

/**
 * Setea el valor del filtro(variable global)
 */
const limpiarfiltro=()=>{
    const select=document.querySelector("section>select")
        if(select!==null){
            select.remove()
        }
}

/**
 * Limpia los botones de paginacion situados al final de la galeria
 */
const limpiarBotonesPaginacion=()=>{
    const div=document.querySelector("#paginacion")
        if(div!==null){
            div.remove()
        }
}


/**
 * Funcion llamada API PEXELS
 * @param {String} endpoint es el valor a buscar
 * @param {Number} perPage es el numero de resultados por pagina. Siendo minimo 1
 * @param {String} size es el tamaño para las fotos. Valores pueden ser "large"(24MP), "medium"(12MP) or "small"(4MP).
 * @param {String} orientacion es el parametro que indica el estilo de foto. Puede ser "landscape", "portrait" o "todas"
 * @returns Una promesa con el objeto conteniendo el resultado de la query(conjunto de todos los parametros)
 * @throws {Error|String} Devuelve un string informando del error
 */
const llamadaAPI=async(endpoint)=>{
    
    let query;

    //Si el 
    if(isNaN(endpoint)){
        query=`${urlBase}/search?query=${endpoint}&page=${page}&per_page=${perPage}&size=${size}&orientation=${orientacion}&locale=es-ES`
    }else{
        query=`${urlBase}/photos/${endpoint}`
        //console.log(query)
    }
    
    //console.log(query)
    try {
        const resp=await fetch(`${query}`,{method:'GET',headers:{'Authorization': apiKey1},})
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



/**
 * Función para validar los carácteres del imput de una búsqueda. 
 * @param {string} parametroDeBusqueda texto introducido en la búsqueda
 * @returns {boolean} Devuelve 'true' si los carácteres del texto sólo son de a-z o de A-Z
 * @example
 * validarBusqueda('hola'); // True
 * validarBusqueda('4508'); // False
 */
const validarBusqueda = (parametroDeBusqueda) => {
    const regex=/^[a-zA-Z]+$/u

    if(regex.test(parametroDeBusqueda)){
        return true
    }else{
        console.log("El campo busqueda no admite valores numericos")
        
        return false
    }
}




/**
 * Función que pinta en el Dom tres imágenes sacadas de la Api agrupadas por categorías
 * @returns {undefined} 
 * @throws {Error} Devuelve un error si detecta algún fallo en la llamada o en la ejecución
 */
const pintarImagenes =async ()  => {

    try {

        perPage=1;
        //Recorre el numero de catergoria
        for (let index = 0; index < categorias.length; index++) {
            
            //por cada categoria se llama a la API

            const resp= await llamadaAPI(categorias[index]);

            resp.photos.forEach(element => {

                const article=document.createElement("ARTICLE")
                const div=document.createElement("DIV")
                const img=document.createElement("IMG");
                const button=document.createElement("BUTTON");

                img.src=element.src.original
                img.alt=element.alt
                button.textContent=categorias[index]
                button.id=categorias[index]
                button.className ="categoria"

                article.append(div);
                div.append(img);
                div.append(button);

                fragmento.append(article)
                categoriasCaja.append(fragmento)

            });
        }
        
    } catch (error) {
        throw error
    }
}


/**
 * Función que pinta dinámicamente en el DOM una galería de imágenes sacadas de la API 
 * paginadas en función de una selección de categoría, un parámetro de búsqueda o una selección de orientación
 * @returns {undefined}
 * @throws {error} Devuelve un error si detecta algún fallo en la llamada o en la ejecución
 */
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

        perPage=9;
        mensajeResultados.textContent="Mostrando:"+categoriaSeleccionada+"- Page "+page
        const resp= await llamadaAPI(categoriaSeleccionada);

        //Recorre el numero de catergoria
        for (let index = 0; index < 1; index++) {
            
            page=resp.page;

            resp.photos.forEach(element => {
                // console.log(element)

                const article=document.createElement("ARTICLE")
                const div=document.createElement("DIV")
                const img=document.createElement("IMG");
                //const h3=document.createElement("H3");
                const p1=document.createElement("P");
                const p2=document.createElement("P");
                const btnFav=document.createElement("BUTTON")

                img.src=element.src.original
                img.alt=element.alt
                img.id=element.id
                p1.textContent=element.alt
                p1.id=element.alt
                // h3.className ="categoria"
                p2.textContent="By "+element.photographer

                p1.className = 'tituloFoto'
                btnFav.textContent="❤️ Añadir a Favoritos"  //"\u2665"
                btnFav.className="btnFav"
                btnFav.id = element.id

                article.append(div);
                div.append(img);
                div.append(p1);
                div.append(p2);
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



//-------------------------FAVORITOS--------------------------//




/**
 * Obtener el array del LocalStorage dandole como parámetro un identificador 
 * @param {String} identificador Nombre que le queremos dar al almacenamiento en el localStorage
 * @param {array} arrayLocal El array guardado en el local storage o en su defecto el array vacío
 * @returns {Array} Nos devuelve el array del local storage o en su defecto el array vacío 
 */
const obtenerLocal = (identificador) => {

     const arrayLocal=JSON.parse(localStorage.getItem(identificador)) || []
     
     return arrayLocal
    
}



/**
 * Setear el array del LocalStorage con el array que le introducimos como parámetro
 * @param {Array} array Array nuevo que queremos que se sobrescribe en el localStorage
 * @returns guarda el nuevo array en el localStorage
 */
const setearLocal = (array) =>{
    return localStorage.setItem('favoritos', JSON.stringify(array));
}



/**
 * Función que guarda las imágenes sacadas de la base de datos de la API en el almacenamiento local
 * @param {number|string} idImagen id de la imagen que queremos guardar en favoritos, detectada al pulsar el botón
 * @param {object} resp objeto obtenido de resolver la promesa de la llamada a la Api
 * @param {array} arrayLocal array de fotos favoritas sacado el local Storage
 * @param {object} newObject objeto creado para que nos pinte cada una de las imágenes y sus datos
 * @param {number} existe determina si dentro de nuestro array existe un objeto cuyo id sea idImagen
 * @returns {undefined}
 * @throws {error}
 * @example
 * añadirLocalFavoritos(859647) // añade a favoritos la imagen con id 859674
 */
const anadirLocalFavoritos = async (idImagen) => {
    
    try {
        const resp = await llamadaAPI(idImagen)
        //  console.log({resp})

        const arrayLocal = obtenerLocal('favoritos')

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




/**
 * Función que pinta en el DOM todas las imágnes guardadas en favoritos por el usuario
 * @param {array} arrayLocal array que contiene las imágenes guardades en favoritos en el local Storage
 * @returns {undefined}
 */
const pintarFavoritos = ()  => {
    
    favoritos.innerHTML="";

        const arrayLocal = obtenerLocal('favoritos')

            const div=document.createElement("DIV")
            div.className = 'flexContainer'

            arrayLocal.forEach(element => {

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
}


/**
 * Función que elimina una imagen de favoritos, lo borra del local Storage y vuelve a pintar el nuevo resultado en el DOM
 * @param {number} idImagen 
 * @param {array} arrayLocal array que contiene las imágenes guardades en favoritos en el local Storage
 * @param {array} nuevoarrayLocal array que borra del array local las fotos eliminadas de favoritos
 * @returns {undefined} 
 */
const quitarDeFavoritos = (idImagen) => {
    
    const arrayLocal = obtenerLocal('favoritos')

    const nuevoarrayLocal = arrayLocal.filter((element) => element.id != idImagen)
    
    setearLocal(nuevoarrayLocal)
    pintarFavoritos()     

}


/**
 * Función que invoca a la función pintarImagenes() en la página de inico y a pintarFavoritos() en la página de Inicio
 * @returns {undefined}
 */
const init=()=>{

    if(location.pathname.includes('index')) pintarImagenes();
    if(location.pathname.includes('favoritos')) pintarFavoritos()

}        



/*-------------------------------------------------------
------------------INVOCACIONES------------------------------
---------------------------------------------------------*/


init()


