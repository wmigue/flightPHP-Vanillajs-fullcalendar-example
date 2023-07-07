

//'opcion' sirve switchear un mismo backend.
//token va por header
export class fetchData {
    _formdata
    _url
    _token
    _opcion
    _method
    constructor(token = '', opcion = 1) {
        this._token = token
        this._opcion = opcion
        this._method = 'POST'
    }
    setMethod(m) {
        this._method = m
    }
    setFormData(fd) {
        this._formdata = fd
    }
    setUrl(url) {
        this._url = url
    }
    setOption(opcion) {
        this._opcion = opcion
        this._formdata.append('opcion', this._opcion)
    }
    async fetchDataAsync() {
        const t = this._token ?? this._token
        let sa = ModalMsg(3)
        const res = await fetch(this._url, {
            headers: {
                //'Content-type': 'application/json',
                //'Content-type': ' multipart/form-data',
                'Authorization': `Bearer ${t}`,
            },
            method: this._method,
            body: this._formdata ?? this._formdata,
        })
        const data = await res.json()
        await sa.close()
        return data
    }
}



export async function tokenEsValido(url, token) {
    const fd = new FormData()
    let fetchDataInstance = new fetchData(token)
    fetchDataInstance.setFormData(fd)
    fetchDataInstance.setUrl(url)
    const r = await fetchDataInstance.fetchDataAsync() // envio el token por el header.
    return r
}



//le paso un array, select, inputs, textareas para que los guarde en un FormData.
//definir propiedad 'name' y 'value' siempre {name: algo, value: 'algo que decir'} en los [...inputs]
export const cargarTxtEnFormdata = (formdata, [...inputs]) => {
    const keyValuePair = inputs.reduce((acc, x) => {
        try {
            if (x.tagName === 'INPUT' || x.tagName === 'TEXTAREA') {
                return [...acc, { [x.name]: x.value }]
            } else if (x.tagName === 'SELECT') {
                return [...acc, { [x.name]: x.options[x.selectedIndex].text }]
            } else if (typeof x === 'object' && Array.isArray(x.value)) {
                return [...acc, {
                    [x.name]: x.value.reduce((acc, el) => {
                        if (typeof el === 'object' && !Array.isArray(el)) {
                            let obj1 = {}
                            for (const [key, value] of Object.entries(el)) {
                                obj1[key] = value
                            }
                            //cuando el value es un {prop varias}, ejemplo:  { name: algo, value: [{},{},{}] }
                            return [...acc, obj1]
                        } else {
                            //cuando el value es un [], ejemplo:  {name: algo, value: [input1,input2,input3]}
                            return [...acc, el.value]
                        }
                        //console.log(acc)
                    }, [])
                }]
            } else if (typeof x === 'object') {
                return [...acc, { [x.name]: x.value }]
            }
        } catch {
            throw new Error('quizas no existe ese tipo . fijarse en los inputs enviados . sino wmigue@gmail.com .')
        }
    }, [])
    formdata.append('data', JSON.stringify(keyValuePair))
}




//carga files al formdata
//<input type="file" name="files[]" multiple>
//limitarAUnoSolo = 0 (multiples archivos)
//limitarAUnoSolo = 1 (uno solo)
//usarlo en un curryficacion, ej: const curry = cargarFilesEnFormData(files, fd) y luego ejecutar con curry() para agregar un archivo nuevo al array de files[].
export function cargarFilesEnFormData(files, formdata, limitarAUnoSolo = 0) {
    const limitar = limitarAUnoSolo
    let iterador = 0

    return function add() {
        if (limitar === 0) {
            for (let [k, v] of Object.entries(files.files)) {
                posicion = contadorFilesEnFormData(formdata)
                formdata.append('uploads' + posicion, v)
                iterador++
            }
        } else {
            formdata.append('uploads1', files.files[0])
        }
    }
}


//retorna cantidad de files en el array de tipo input[type=file]
//asegurarse de cargar siempre primero los files.
export const contadorFilesEnFormData = (formdata) => {
    contador = 0
    for (let e of formdata.entries()) {
        contador++
    }
    return contador + 1
}




//modal que maneja tipos de response recibida del servidor.
export const ModalMsg = (response, html = null, textButton = null) => {
    let sa = ''
    let spinner = ` 
    <br>
    <div class="lds-spinner" style="height: 13vh;">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>

    `
    const swalConfig = {
        confirmButtonText: textButton !== null ? textButton : 'aceptar',
        loaderHtml: spinner,
        //imageUrl: 'https://nutribarf.ar/img/logo.png',
        imageWidth: 100,
        imageHeight: 100,
        html: html,
        showConfirmButton: true,
    }

    switch (response) {
        case 0:
            swalConfig.html = 'Completa los campos REQUERIDOS.'
            sa = Swal.fire(swalConfig)
            break;
        case 1:
            swalConfig.html = 'guardado OK'
            sa = Swal.fire(swalConfig)
            break;
        case 2:
            swalConfig.html = 'error de conexion.'
            sa = Swal.fire(swalConfig)
            break;
        case 3:
            swalConfig.html = spinner + '<br>procesando...'
            swalConfig.showConfirmButton = false,
                sa = Swal.fire(swalConfig)
            break;
        case 4:
            swalConfig.html = 'solo podes adjuntar un archivo. recargar la web para repetir.'
            sa = Swal.fire(swalConfig)
            break;
        case 5:
            swalConfig.html = 'ya existe ese e-mail en BD. o no es un email valido.'
            sa = Swal.fire(swalConfig)
            break;
        case 6:
            swalConfig.html = 'ERROR: no estas autenticado.'
            sa = Swal.fire(swalConfig)
            break;
        case 7:
            sa = Swal.fire(swalConfig)
            break;
        default:
            return sa
            break;
    }

    return sa
}



//recibe array de strings 
//si hay algun elemento vacio, retorna true.
export const validarCampos = ([...campos]) => {
    const validacion = campos.some(x => x.value === '')
    console.log('campos vacios: ' + validacion)
    return validacion
}




export const limpiarFormulario = () => {
    const seleccionados = document.querySelectorAll('input, textarea') //retorna un nodeList, lo paso a array.
    Array.from(seleccionados).map(x => x.value = '')
    //console.log(seleccionados)
}



export const renderizarHTML = async (url) => {
    const r = await fetch(url)
    const data = await r.text()
    return data
}


