import { fetchData, ModalMsg } from "./wm.js/utils/http.js";
import { serverURL } from './config.js'


const hadleSubmit = async (e) => {
    e.preventDefault()
    const nombre = document.querySelector('input[name="t1"]')
    const email = document.querySelector('input[name="t2"]')
    const tema = document.querySelector('input[name="t3"]')
    const mensaje = document.querySelector('textarea[name="t4"]')
    const fd = new FormData()
    fd.append('t1', nombre.value)
    fd.append('t2', email.value)
    fd.append('t3', tema.value)
    fd.append('t4', mensaje.value)
    const fetch = new fetchData()
    fetch.setFormData(fd)
    fetch.setMethod = 'POST'
    fetch.setUrl(serverURL + '/api/contactar')
    fetch.fetchDataAsync()
        .then(x => {
            x.response === 1 ? ModalMsg(7, '<b>enviado con éxito!!</b>', 'aceptar') : ModalMsg(7, '<b>error</b>', 'aceptar')
        })
}


//instancias
const formulario = document.querySelector('form')
formulario.addEventListener('submit', hadleSubmit)

