const cifrar = document.querySelector('.btn__cifrar');
const descifrar = document.querySelector('.btn__descifrar');
const btnCalculaNZ = document.querySelector('#btn__calcularNZ')
const btnVerificar = document.querySelector('#verificar');
const consistencia = document.querySelector('#consistencia');
const div_cifrar = document.querySelector('.cifrar__texto');
const div_descifrar = document.querySelector('.descifrar');
const texto = document.querySelector('#texto_cifrar').value;


const btnCalcularD = document.querySelector('#btn__calcularD');
const btn__descifrar__M = document.querySelector('#btn__descifrar__M');
const btnLimpiar = document.querySelector('.btn__limpiar');
// Acceder a los elementos input para obtener sus valores
let pInput = document.querySelector('#p');
let qInput = document.querySelector('#q');
let nInput = document.querySelector('#n');
let zInput = document.querySelector('#z');
let eInput = document.querySelector('#e');
let dInput = document.querySelector('#d');

// Accede a los elementos de entrada después de definirlos
let pdInput = document.querySelector('#pd');
let qdInput = document.querySelector('#qd');
let ndInput = document.querySelector('#nd');
let zdInput = document.querySelector('#zd');
let edInput = document.querySelector('#ed');
let ddInput = document.querySelector('#dd');


cifrar.addEventListener('click', () => {
    div_descifrar.setAttribute('hidden', '');
    div_cifrar.removeAttribute('hidden');
})

descifrar.addEventListener('click', () => {
    div_cifrar.setAttribute('hidden', '');
    div_descifrar.removeAttribute('hidden');
})

btnCalculaNZ.addEventListener('click', () => {
    calcula_nz();
})



btnVerificar.addEventListener('click', () => {
    let e = parseInt(eInput.value);
    let d = parseInt(dInput.value);
    let z = parseInt(zInput.value);

    // Si d está definido y la ecuación es verdadera
    if (!isNaN(d) && (d * e) % z === 1) {
        consistencia.innerHTML = `${d} * ${e} mod ${z} = 1`;
    }
    // Si d está definido pero la ecuación no es verdadera
    else if (!isNaN(d) && (d * e) % z !== 1) {
        consistencia.innerHTML = "No tiene consistencia";
    }
    // Si d no está definido, calcularlo
    else {
        let i = 1;
        while ((i * e) % z !== 1) {
            i++;
        }
        dInput.value = i;
        consistencia.innerHTML = `${i} * ${e} mod ${z} = 1`;
    }
    mensajeCifrado()
});





function calcula_nz() {
    // Obtener los valores de p y q usando .value
    let p = parseInt(pInput.value);
    let q = parseInt(qInput.value);
    let n = p * q;
    let z = (p - 1) * (q - 1);
    nInput.value = n;
    zInput.value = z;
}


function mensajeCifrado() {
    let texto = document.querySelector('#texto_cifrar').value.toUpperCase(); // Obtener el texto y convertirlo a mayúsculas
    let numCarac = texto.length;
    let e = parseInt(eInput.value);
    let n = parseInt(nInput.value);
    let tabla = document.getElementById('resultados');

    // Limpiar filas anteriores
    tabla.getElementsByTagName('tbody')[0].innerHTML = '';

    for (let i = 0; i < numCarac; i++) {
        let letra = texto.charCodeAt(i) - 64; // Convertir la letra a su posición en el alfabeto (A=1, B=2, ..., Z=26)
        let exponente = e;
        let mod = n;
        let M = Math.pow(letra, exponente) % mod; // Calcular el valor cifrado
        console.log(`Texto: ${texto[i]}, Exponente: ${exponente}, Mod: ${mod}, Resultado: ${M}`);
        // Crear una nueva fila en la tabla y agregarla a la tabla
        let newRow = tabla.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        // Agregar los valores a las celdas de la fila
        cell1.textContent = texto[i];
        cell2.textContent = letra;
        cell3.textContent = `${Math.pow(letra, exponente)} mod ${mod}`;
        cell4.textContent = M;
    }
}


btnCalcularD.addEventListener('click', () => {
    const texto = ndInput.value;
    const numeroDeseado = parseInt(texto);

    // Encontrar los números primos cuyo producto sea igual al número deseado
    const numerosPrimos = encontrarNumerosPrimosParaProducto(numeroDeseado);

    // Asignar los valores de los números primos a los elementos mediante innerHTML
    pdInput.value = numerosPrimos[0];
    qdInput.value = numerosPrimos[1];

    // Calcular el valor de d y asignarlo a ddInput
    let p = parseInt(pdInput.value);
    let q = parseInt(qdInput.value);
    let z = parseInt((p - 1) * (q - 1));

    // Calcular d utilizando el algoritmo de Euclides extendido
    let e = parseInt(edInput.value);


    // Calcular d utilizando el algoritmo de Euclides extendido
    let d = calcularD(e, z);
    alert(`e ${e} p ${p} q ${q} d ${d}`)
    // Asignar el valor calculado de d al elemento ddInput
    ddInput.value = d;

});

btn__descifrar__M.addEventListener('click', () => {
    mensajeDescifrado();
})

// Función para calcular d usando el algoritmo de Euclides extendido
function calcularD(e, z) {
    let d = 1;
    while ((d * e) % z !== 1) {
        d++;
    }
    return d;
}


// Función para encontrar dos números primos cuyo producto sea igual a un número dado
function encontrarNumerosPrimosParaProducto(productoDeseado) {
    let num1, num2;

    // Empezar desde el número 2 y buscar números primos
    for (let i = 2; i <= Math.sqrt(productoDeseado); i++) {
        if (productoDeseado % i === 0 && esPrimo(i) && esPrimo(productoDeseado / i)) {
            num1 = i;
            num2 = productoDeseado / i;
            break;
        }
    }

    // Devolver los números primos encontrados
    return [num1, num2];
}

// Función para verificar si un número es primo
function esPrimo(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}


function mensajeDescifrado() {
    let textoCifrado = document.querySelector('#texto_cifrar').value.split(',').map(Number); // Obtener el texto cifrado como una lista de números
    let numCarac = textoCifrado.length;
    let d = parseInt(document.querySelector('#dd').value); // Corregir aquí
    let n = parseInt(ndInput.value);
    let tabla = document.getElementById('resultados_descifrado');

    // Limpiar filas anteriores
    tabla.getElementsByTagName('tbody')[0].innerHTML = '';

    for (let i = 0; i < numCarac; i++) {
        let cifrado = textoCifrado[i];
        let exponente = d;
        let mod = n;
        let descifrado = Math.pow(cifrado, exponente) % mod; // Calcular el valor descifrado
        console.log(`Texto cifrado: ${cifrado}, Exponente: ${exponente}, Mod: ${mod}, Resultado: ${descifrado}`);
        // Convertir el número descifrado a letra
        let letra = String.fromCharCode(descifrado + 64); // Corregir aquí
        // Agregar los valores a las celdas de la fila
        let newRow = tabla.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);

        cell1.textContent = cifrado;
        cell2.textContent = `${Math.pow(cifrado, exponente)} % ${mod}`;
        cell3.textContent = descifrado; // Aquí puedes poner el valor cifrado si lo necesitas
        cell4.textContent = letra;
    }
}


btnLimpiar.addEventListener('click', () => {
     // Recargar la página para limpiar todo
     location.reload();
});
