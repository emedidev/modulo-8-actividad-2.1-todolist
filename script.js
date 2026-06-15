let productos = [];

function agregarLista(){
    
    /* Seleccionar donde se visualizara */
    let output = document.getElementById("contentList");
    
    /* Seleccionar de donde vendran los datos */
    let product = document.getElementById("prodName");
    let cuantity = document.getElementById("prodCuant");
    let price = document.getElementById("prodPrice");

    /* validacion de datos */
    if(product === "" || cuantity === "" || price === ""){
        alert("Debe completarlos campos requeridos.");
        return;
    } else if(cuantity <=0 || price <= 0){
        alert("Valores ingresados no pueden ser negativos");
        return;
    }

    /* Registro almacenado y almacenar */
    const listProd = {
        Id: productos.length+1,
        Product: product.value,
        Cuantity: cuantity.value,
        Price: price.value,
        amound: cuantity.value * price.value
    };
    productos.push(listProd);
    
    /* Preparando registro para la tabla */
    
    let content = document.createElement("tr");
    content.id = listProd.Id;

    content.innerHTML = `
        <td>${listProd.Id}</td>
        <td>${listProd.Product}</td>
        <td>${listProd.Cuantity}</td>
        <td>${listProd.Price}</td>
        <td>${listProd.amound}</td>
        <td>
            <input type="checkbox" id="checkbox${listProd.Id}" class="checkBut"/>
            <label for="checkbox${listProd.Id}">Pendiente</label>
        </td>
        <td>
            <button 
                type="button" 
                class="btnDelete" 
                onclick="handlerDelete(${listProd.Id})">
                    Delete
            </button>
        </td>
    `
    /* Agregando registro al dom */
    output.append(content);
    
    /* Limpiando campos */
    product.value = ""
    cuantity.value = ""
    price.value = ""

    }

    function handlerDelete(e){
        let element = document.getElementById(e).remove()
    }