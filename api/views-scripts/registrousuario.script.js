import { cargarTxtEnFormdata, fetchData, tokenEsValido, ModalMsg } from './wm.js/utils/http.js'
import { serverURL } from './config.js'
import { v4 } from '../views-utils/node_modules/uuid/dist/esm-browser/v4.js' //exportar funcion

const agregarMascota = document.querySelector('#add-mascota-wm')
const mascotasDiv = document.querySelector('#mascotanueva')

//agregando mas mascotas al registro.
agregarMascota.addEventListener('click', () => {
    const newdiv = document.createElement('div')
    newdiv.innerHTML = `
                <div class="d-flex justify-content-center bg-primary p-4 m-1 ">
                                        <input type="text" name="nombreMascota[]" placeholder='nombre' class="form-control">
                                        <input type="text" name="razaMascota[]" placeholder='raza' class="form-control">
                                        <select class="custom-select" name="edadMascota[]">
                                            <option selected="">Edad</option>
                                            <option value="1">3 meses</option>
                                            <option value="2">6 meses</option>
                                            <option value="3">1 año</option>
                                            <option value="4">2 años</option>
                                            <option value="5">3 años</option>
                                            <option value="6">4 años</option>
                                            <option value="7">5 años</option>
                                            <option value="8">6 años</option>
                                            <option value="9">7 años</option>
                                            <option value="10">8 años</option>
                                            <option value="11">9 años</option>
                                            <option value="12">10 años</option>
                                            <option value="13">11 años</option>
                                            <option value="14">12 años</option>
                                            <option value="15">13 años</option>
                                            <option value="16">14 años</option>
                                            <option value="17">15 años</option>
                                            <option value="18">16 años</option>
                                            <option value="19">17 años</option>
                                            <option value="20">18 años</option>
                                        </select>
                                        <select class="custom-select" name="pesoMascota[]">
                                            <option selected="">Peso</option>
                                            <option value="1">1 kg</option>
                                            <option value="2">2 kg</option>
                                            <option value="3">3 kg</option>
                                            <option value="4">4 kg</option>
                                            <option value="5">5 kg</option>
                                            <option value="6">6 kg</option>
                                            <option value="7">7 kg</option>
                                            <option value="8">8 kg</option>
                                            <option value="9">9 kg</option>
                                            <option value="10">10 kg</option>
                                            <option value="11">11 kg</option>
                                            <option value="12">12 kg</option>
                                            <option value="13">13 kg</option>
                                            <option value="14">14 kg</option>
                                            <option value="15">15 kg</option>
                                            <option value="16">16 kg</option>
                                            <option value="17">17 kg</option>
                                            <option value="18">18 kg</option>
                                            <option value="19">19 kg</option>
                                            <option value="20">20 kg</option>
                                            <option value="21">21 kg</option>
                                            <option value="22">22 kg</option>
                                            <option value="23">23 kg</option>
                                            <option value="24">24 kg</option>
                                            <option value="25">25 kg</option>
                                            <option value="26">26 kg</option>
                                            <option value="27">27 kg</option>
                                            <option value="28">28 kg</option>
                                            <option value="29">29 kg</option>
                                            <option value="30">30 kg</option>
                                            <option value="31">31 kg</option>
                                            <option value="32">32 kg</option>
                                        </select>
                                   
                     </div>
                     <div class="d-flex justify-content-center ">
                       foto: <input type="file" name="files[]" multiple>
                     </div>
            
                                   
                        
    
    `
    mascotasDiv.appendChild(newdiv)

})



//enviando formulario
const formulario = document.querySelector('form')
const nombreMascotaNode = document.getElementsByName('nombreMascota[]')
const razaMascotaNode = document.getElementsByName('razaMascota[]')
const edadMascotaNode = document.getElementsByName('pesoMascota[]')
const pesoMascotaNode = document.getElementsByName('edadMascota[]')
const imagenMascotaNode = document.getElementsByName('files[]')
const fd = new FormData()

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const arr1 = Array.from([...nombreMascotaNode]) //nodeList to Array conversion.
    const arr2 = Array.from([...razaMascotaNode])
    const arr3 = Array.from([...pesoMascotaNode])
    const arr4 = Array.from([...edadMascotaNode])
    const arr5 = Array.from([...imagenMascotaNode])
    let nameParaImg = ''
    let fileExtension = ''

    const mascotas = arr1.reduce((acc, el, i) => {
        if (arr5[i].files[0] !== undefined) {
            nameParaImg = arr5[i].files[0].name + v4()
            fileExtension = arr5[i].files[0].name.split('.').pop()
        }
        return [...acc, {
            id: i + 1,
            nombre: el.value, //input -> value
            raza: arr2[i].value,
            edad: arr3[i].options[arr3[i].selectedIndex].text, //select -> texto seleccionado
            peso: arr4[i].options[arr4[i].selectedIndex].text,
            imagen: arr5[i].files[0] !== undefined ? nameParaImg + '.' + fileExtension : ''
        }]
    }, [])

    //console.log(arr5)

    const cliente = [
        {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"').value,
            pass: document.querySelector('input[name="pass"').value,
            localidad: document.querySelector('input[name="localidad"').value,
            provincia: document.querySelector('input[name="provincia"').value,
            direccion: document.querySelector('input[name="direccion"').value,
            celular: document.querySelector('input[name="celular"').value
        }
    ]

    const inputs = [
        { name: 'mascotas', value: mascotas },
        { name: 'datosCliente', value: cliente },
    ]

    arr5.forEach((el, i) => {
        fd.append(`archivo${i}`, el.files[0])
    })
    cargarTxtEnFormdata(fd, inputs)
    const fetchadatainstance = new fetchData()
    const urlRedireccion = '/api/confirmeUsuario/' + cliente[0].email
    fetchadatainstance.setFormData(fd)
    fetchadatainstance.setUrl(serverURL + '/api/insertOneUser')
    fetchadatainstance.fetchDataAsync()
        .then(x => x.response === 1 ?
            ModalMsg(1).then((ok) => ok ? window.location = serverURL + urlRedireccion : serverURL + urlRedireccion) :
            x.response === -1 ? ModalMsg(6) :
                ModalMsg(5)
        )
})