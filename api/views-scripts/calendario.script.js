import { ModalMsg, fetchData } from "./wm.js/utils/http.js"
import { serverURL } from "./config.js"
import { formateoArgentina } from "./wm.js/utils/dates.js"

const formateoFechaParaFullCalendar = (dateStr, horas, minutos) => { //2023-04-04
    let dia = dateStr + 'T' + horas + ':' + minutos
    return dia
}

const addNew = (e) => {
    //console.log(e)
    const token = sessionStorage.getItem('token')
    let tratamientodocorador = e.dateStr.split('-')
    tratamientodocorador = tratamientodocorador[2] + '-' + tratamientodocorador[1] + '-' + tratamientodocorador[0]
    const decorador = `<br><b>DIA: ${tratamientodocorador}</b><br><br>`
    ModalMsg(7, decorador + addEventoHTML(), 'guardar ').then(ok => {
        let titulo = document.querySelector('.titulo')
        let horas = document.getElementById('horas')
        let minutos = document.getElementById('minutos')
        if (titulo.value) {
            if (ok.isConfirmed) {
                let nuevoObj = {
                    id: '',
                    title: titulo.value,
                    start: formateoFechaParaFullCalendar(e.dateStr, horas.value, minutos.value),
                    end: formateoFechaParaFullCalendar(e.dateStr, horas.value, minutos.value),
                }
                if (ok.isConfirmed) {
                    getDatosCalendario(token).then(x => {
                        const datosNuevos = JSON.parse(x.eventosCalendario)
                        const id = datosNuevos.length + 1
                        nuevoObj.id = id
                        datosNuevos.push(nuevoObj)
                        //console.log(datosNuevos);
                        setDatosCalendario(token, datosNuevos).then(x => {
                            console.log(x)
                            calendarius.refetchEvents()
                        })
                    })
                }
            }
        } else {
            ModalMsg(7, '<b>❌ error: complete todos los campos.</b>', 'aceptar')
        }
    })

}



const setDatosCalendario = async (token, eventosActualizados) => {
    const fd = new FormData()
    fd.append('data', JSON.stringify(eventosActualizados))
    const fetch = new fetchData(token)
    fetch.setMethod = 'POST'
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/protegida/add-evento')
    return await fetch.fetchDataAsync()
}


const getDatosCalendario = async (token) => {
    const fetch = new fetchData(token)
    fetch.setMethod = 'POST'
    fetch.setUrl(serverURL + '/api/protegida/get-calendario')
    return await fetch.fetchDataAsync()
}



const editarVerEventoListener = (id) => {
    const button = document.querySelector(`button[id="btn-eliminar-${id}"]`)
    button.addEventListener('click', () => {
        if (confirm('Seguro de eliminar el evento?')) {
            const fd = new FormData()
            const fetch = new fetchData(sessionStorage.getItem('token'))
            fd.append('idEventoAEliminar', id)
            fetch.setFormData(fd)
            fetch.setUrl(serverURL + '/api/protegida/eliminar-evento-calendario')
            fetch.fetchDataAsync().then(x => calendarius.refetchEvents())
        }
    })
}



function editarVerEvento(e) {
    const id = e.event.id
    const html = `
    <b class="text-primary">Descripcion del Evento: </b>
    <p class="text-danger">${e.event.title}<p>
    <b class="text-primary">Fecha / Hora: </b>
    <p>${formateoArgentina(e.event.start)}<p>
    <button id="btn-eliminar-${id}" class="btn btn-danger btn-sm">Eliminar evento</button>
    <br><hr><br>
    `
    ModalMsg(7, html, "aceptar")
    editarVerEventoListener(id)
}







const addEventoHTML = () => {
    let horasOptions = ''
    for (let i = 1; i < 25; i++) {
        if (i <= 9) {
            horasOptions += `<option value=0${i}>0${i}</option>`
        } else {
            horasOptions += `<option value=${i}>${i}</option>`
        }
    }
    let selectHoras = `
      <select id="horas">
         ${horasOptions}
      </select>
    `
    let minutosOptions = ''
    minutosOptions += `<option value="00">00</option>`
    minutosOptions += `<option value="15">15</option>`
    minutosOptions += `<option value="30">30</option>`
    minutosOptions += `<option value="45">45</option>`
    let selectMinutos = `
      <select id="minutos">
         ${minutosOptions}
      </select>
    `
    return `
    <input type="text" placeholder='escribe una descripcion para el nuevo evento' class="form-control titulo"><br>
    <label>seleccione hora</label>
    ${selectHoras}
    <label>seleccione minutos</label>
    ${selectMinutos}
    `
}




const getEventos = async () => await getDatosCalendario(sessionStorage.getItem('token')).then(x => {
    if (x.response === 1) {
        return JSON.parse(x.eventosCalendario)
    } else {
        ModalMsg(7, 'no autenticado. debes loguearte primero.', 'aceptar')
            .then(ok => ok.isConfirmed ? window.location.href = serverURL + '/api/ingresar' : null)
    }
})



const ayudaAlUsuario = () => {

    const html = `
       <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Ayuda</h1>
            <p class="lead"><b>1- </b>click dentro del espacio en blanco del dia para agregar un nuevo evento.</p>
            <p class="lead"><b>2- </b>click en un evento existente para ver más detalles o eliminarlo.</p>
          </div>
       </div>
    `
    ModalMsg(7, html, 'aceptar')

}



//instancias
const calendarEl = document.getElementById('calendar')
let calendarius = new FullCalendar.Calendar(calendarEl, {
    eventClick: editarVerEvento,
    dateClick: addNew,
    locale: 'es',
    buttonText: {
        today: 'Hoy',
        day: 'Día',
        week: 'Semana',
        month: 'Mes'
    },
    defaultView: 'agendaWeek',
    slotDuration: '04:30:00',
    headerToolbar: {
        // left: 'prevYear,prev,next,nextYear today',
        left: 'prev,next,today,ayudaAlUsuario',
        center: 'title',
        right: 'dayGridDay,dayGridWeek,dayGridMonth'
    },
    aspectRatio: 1.35,
    navLinks: true,
    editable: false,
    dayMaxEvents: true,
    themeSystem: 'bootstrap4',
    events: getEventos,
    customButtons: {
        ayudaAlUsuario: {
            text: 'Ayuda al usuario',
            click: function () {
                ayudaAlUsuario()
            }
        }
    }
})
calendarius.render()



