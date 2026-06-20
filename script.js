let productos = [];
let contador = 1
let totalCantidad = 0
let totalAcumuado = 0
let totales = 0

function agregarProducto(){
    
    /* Seleccionar de donde vendran los datos */
    let product = document.getElementById("prodName");
    let cuantity = document.getElementById("prodCuant");
    let price = document.getElementById("prodPrice");

    // /* validacion de datos */
    if(product.value === "" || cuantity.value === "" || price.value === ""){
        alert("Debe completarlos campos requeridos.");
        return;
    } else if(cuantity <=0 || price <= 0){
        alert("Valores ingresados no pueden ser negativos");
        return;
    }

    /* Creando variable de registro */
    const registroProd = {
        Id: contador++,
        Product: product.value,
        Cuantity: parseInt(cuantity.value),
        Price: parseInt(price.value),
        amound: parseInt(cuantity.value * price.value)
    };
    productos.push(registroProd);

    /* Limpiando campos */
    product.value = ""
    cuantity.value = ""
    price.value = ""
    
    /* Actualiando totales */
    calcularTotales("add",registroProd.Id)
    
    /* Mostrando productos guardados */
    mostrarRegistros(productos)
}

////////////////////////////////////////

function mostrarRegistros(values){
    
    /* Seleccionar donde se visualizara */
    let output = document.getElementById("contentList");
    
    /* Limpia el contendido del DOM */
    output.innerHTML = ""
    if(values.length === 0){
        return;
    }

    /* Preparando registro para mostrar en la tabla */
    values.forEach(e=>{

        let content = document.createElement("tr");
        content.id = e.Id;
        
        content.innerHTML = `
            <td>${e.Id}</td>
            <td>${e.Product}</td>
            <td>${e.Cuantity}</td>
            <td>${e.Price}</td>
            <td>${e.amound}</td>
            <td>
                <input type="checkbox" id="checkbox${e.Id}" class="checkBut"/>
                <label for="checkbox${e.Id}">Pendiente</label>
            </td>
            <td>
                <button 
                    type="button" 
                    class="btnDelete" 
                    onclick="eliminar(${e.Id})">
                        Delete
                </button>
                </td>
                `
                /* Agregando registro al dom */
                output.appendChild(content);
            }
    )
    return output;
}

////////////////////////////////////////

function eliminar(e){
    /* Funcion para restar del total valores del producto eliminado */
    calcularTotales("subt", e);

    /* Eliminando registro del DOM y de la variable productos */
    let index = productos.findIndex(i=> i.Id === e);
    productos.splice(index,1);
    let element = document.getElementById(e).remove();
    
}

////////////////////////////////////////

function calcularTotales(oper, value){
    /* Seleccionando elementos del dom para sumar totales de productos */
    let cantidadCont = document.getElementById("totalCantidad");
    let precioCont =  document.getElementById("totalPrecio");
    let totalesCont = document.getElementById("totalGeneral");

    /* Buscando el producto agregado */
    let producto = productos.filter(elm => elm.Id === value);
    
    /* Swtch para calcular suma o resta de productos en los totales de la tabla. */
    switch(oper){
        case "add":
            /* Actualizando totales. */
            totalCantidad += producto[0].Cuantity;
            totalAcumuado += producto[0].Price;
            totales = (totalCantidad * totalAcumuado);
            console.log(value)
            break;

        case "subt":
            totalCantidad -= producto[0].Cuantity;
            totalAcumuado -= producto[0].Price;
            totales = (totalCantidad * totalAcumuado);
            break;
            
        }

        /* Agregando valores totales calculados al DOM. */
        cantidadCont.innerText = totalCantidad;
        precioCont.innerText = totalAcumuado;
        totalesCont.innerText = totales;

}

