import { fetchData, ModalMsg } from "./wm.js/utils/http.js"
import { serverURL } from "./config.js"

const input = document.querySelector('input[name="update-pass-input"]')
const button = document.querySelector('button[name="update-pass-btn"]')
const token = document.querySelector('input[type="hidden"]')


button.addEventListener('click', (e) => {
    e.preventDefault()
    const fd = new FormData()
    const fetch = new fetchData(token.value)
    fd.append('data', JSON.stringify({ newPass: input.value }))
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/update-password')
    fetch.fetchDataAsync().then(x => {
        if(x.errorMessage){
            console.log(x.errorMessage) 
        }
        x.response === 1 ? (
            ModalMsg(7, 'actualizado correctamente.', 'aceptar'),
            window.location.href = serverURL + '/api/ingresar'
        ) : ModalMsg(7, 'error', 'aceptar')
    })
})


