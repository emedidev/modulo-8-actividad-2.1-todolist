let productos = [];

function agregarProducto(){
    
    /* Seleccionar de donde vendran los datos */
    let product = document.getElementById("prodName");
    let cuantity = document.getElementById("prodCuant");
    let price = document.getElementById("prodPrice");

    /* validacion de datos */
    if(product.value === "" || cuantity.value === "" || price.value === ""){
        alert("Debe completarlos campos requeridos.");
        return;
    } else if(cuantity <=0 || price <= 0){
        alert("Valores ingresados no pueden ser negativos");
        return;
    }

    /* Creando variable de registro */
    const listProd = {
        Id: productos.length+1,
        Product: product.value,
        Cuantity: cuantity.value,
        Price: price.value,
        amound: cuantity.value * price.value
    };
    productos.push(listProd);

    /* Limpiando campos */
    product.value = ""
    cuantity.value = ""
    price.value = ""

    mostrarRegistros(productos)
}

function mostrarRegistros(values){
    
    /* Seleccionar donde se visualizara */
    let output = document.getElementById("contentList");
    
    /* Limpia el contendido del DOM */
    output.innerHTML = ""
    if(values.length === 0){
        return;
    }

    /* Preparando registro para la tabla */
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
    return output
}

function eliminar(e){
    console.log(productos.indexOf(e))
    let element = document.getElementById(e).remove()
    console.log(productos)
}

let numeros =[1,2,3]
console.log(numeros.forEach(elm=>{
    console.log(numeros.indexOf(elm))
}))