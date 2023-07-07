import { fetchData, ModalMsg } from './wm.js/utils/http.js'
import { serverURL, routes } from './config.js'

const formulario = document.querySelector("form[class='formulario']")
const email = document.querySelector("input[name='email']")
const pass = document.querySelector("input[name='pass']")

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData()
    const fetch = new fetchData()
    const credenciales = [{ email: email.value, pass: pass.value }]
    fd.append('data', JSON.stringify(credenciales))
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/loginUser')
    fetch.fetchDataAsync().then(x => {
        x.response === 1 ?
            (sessionStorage.setItem('token', x.token), window.location.href = routes.data) :
            ModalMsg(6)
    })
})


const olvidePass = () => {
    const link = document.querySelector('.olvide-pass')
    const html = htmlOlvidePass()
    link.addEventListener('click', () => {
        ModalMsg(7, html, 'enviar confirmacion')
            .then(ok =>
                ok.isConfirmed ? enviarMailOlvidePass() : null
            )
    })
}

const htmlOlvidePass = () => {
    return `
    <form class="confirmation-email-form">
       <label>ingresa tu email</label>
       <input type="email" required class="form-control" name="email-confirm"/>
    </form>
    `
}

const enviarMailOlvidePass = () => {
    let email = document.getElementsByName('email-confirm')
    email = email[0].value.trim()
    console.log(email)
    const fd = new FormData()
    const fetch = new fetchData()
    fd.append('data', JSON.stringify({ email: email }))
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/email-update-password')
    fetch.fetchDataAsync().then(x => {
        ModalMsg(7, htmlEnviado(email), 'aceptar')
    })
}


const htmlEnviado = (email)=>{
    return `
       Se envio un link para actualizar su contraseña a: <p> ${email}<p>
    `
}




//instancias
olvidePass()