import { ModalMsg, fetchData, tokenEsValido } from "./wm.js/utils/http.js"
import { serverURL, routes } from "./config.js"
import { eventosCercanos, formateoArgentina } from "./wm.js/utils/dates.js"
import { incluyeEstosParams } from "./wm.js/utils/url-params.js"

const a = document.querySelector('#links-menu-wm')
const b = document.querySelector('#menu-wm')
const img = document.querySelector('img[name="avatar-icon-wm"]')
const linkIngresar = document.querySelector('a[href="ingresar"]').parentNode
const username = document.querySelector('.nombre-user-wm')
const linkRegistrarse = document.querySelector('li a[href="registro"]').parentNode



const logout = () => {
    const link = document.querySelector('.logout')
    link.addEventListener('click', () => {
        sessionStorage.removeItem('token')
        window.location.href = routes.home
    })
}




const getImgPrimerMascota = (array) => {
    const parseado = JSON.parse(array)
    if (parseado[0] !== undefined) {
        const algunaImg = parseado.find(x => x.imagen !== '')
        if (algunaImg!==undefined && algunaImg.imagen !== undefined) {
            return 'adjuntos/' + algunaImg.imagen
        } else {
            return './views-utils/img/avatar1.png'
        }
    } else {
        return './views-utils/img/avatar1.png'
    }
}





const mostrarMenu = async () => {
    const token = sessionStorage.getItem('token')
    if (token !== null) return await tokenEsValido(serverURL + '/api/tokenIsValid', token)
    else return 0
}




//controlo el menu desplegable del usuario logueado.
export const desplegableMenu = () => {

    b.addEventListener('click', () => {
        a.style.visibility = 'visible'
    })
    a.addEventListener('mouseover', () => {
        a.style.visibility = 'visible'
    })
    a.addEventListener('mouseout', () => {
        a.style.visibility = 'hidden'
    })
}




const goToMisDatos = async () => {
    window.location.href = routes.data
}

const goToCalendario = async () => {
    window.location.href = routes.calendario
}



//instancias
desplegableMenu()
mostrarMenu().then(x => {
    x.response === 1 ? (
        img.src = getImgPrimerMascota(x.mascotas),
        b.style.visibility = 'visible',
        linkIngresar.remove(),
        username.textContent = 'Hola, ' + x.user + ' !',
        linkRegistrarse.remove()
    ) : (
        b.style.visibility = 'hidden',
        linkIngresar.visibility = 'visible'
    )
})
logout()




const getEventosCercanos = async (token) => {
    let res = ''
    const fetch = new fetchData(token)
    fetch.setMethod = 'POST'
    fetch.setUrl(serverURL + '/api/protegida/get-calendario')
    await fetch.fetchDataAsync().then(x => {
        res = eventosCercanos(8, JSON.parse(x.eventosCalendario))
    })
    return res
}





//instancias

document.querySelector('.misdatos').addEventListener('click', () => goToMisDatos())
document.querySelector('.calendario').addEventListener('click', () => goToCalendario())
getEventosCercanos(sessionStorage.getItem('token')).then(x => {
    if (x.length > 0) {
        if (incluyeEstosParams('/api/data')) {
            let decorador = ''
            x.map(x => {
                decorador += `
            <li class="list-group-item">${formateoArgentina(x.start)}: <br> <b>${x.title}</b></li>
        `
            })

            let ul = `
          <ul class="list-group">
             ${decorador}
          </ul>
        `

            ModalMsg(7, '<p>Usted tiene eventos cercanos en el calendario:</p><br> ' + decorador, 'aceptar')
        }
    }
})
