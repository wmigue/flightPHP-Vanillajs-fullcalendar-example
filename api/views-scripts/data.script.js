import { serverURL, routes } from "./config.js"
import { fetchData, ModalMsg } from "./wm.js/utils/http.js"
import { v4 } from '../views-utils/node_modules/uuid/dist/esm-browser/v4.js' //exportar funcion




const getMyData = async (url) => {
    const fd = new FormData()
    const fetch = new fetchData(token)
    fetch.setFormData(fd)
    fetch.setMethod("POST")
    fetch.setUrl(serverURL + url)
    return await fetch.fetchDataAsync()
}


const desactivarUser = async (url, idUser) => {
    const fd = new FormData()
    fd.append('idUser', JSON.stringify(idUser))
    fd.append('role', 'admin')
    const fetch = new fetchData(token)
    fetch.setFormData(fd)
    fetch.setMethod("POST")
    fetch.setUrl(serverURL + url)
    return await fetch.fetchDataAsync()
}


const agregarMascotaNuevaListener = (token, arrMascotasDesactualizadas) => {
    const link = document.getElementById('agregar-mascota')
    link.addEventListener('click', () => {
        const fd = new FormData()
        const fetch = new fetchData(token)
        const id = arrMascotasDesactualizadas.reduce((acc, el) => el.id > acc.id ? el : acc, { id: -1 }).id + 1
        let nombre = ''
        let raza = ''
        let edad = ''
        let peso = ''
        let file = ''
        let nameParaImg = ''
        let fileExtension = ''
        let imagen = ''
        let arrNuevo = []
        const decorador = '<b>Agregar nueva mascota</b><br><br>'
        ModalMsg(7, decorador + htmlEditar('', '', '', '', ''), 'guardar').then(x => {
            x.isConfirmed ? (
                nombre = document.querySelector('input[name="nombreMascota"]').value,
                raza = document.querySelector('input[name="razaMascota"]').value,
                edad = document.querySelector('select[name="edadMascota"]'),
                edad = edad.options[edad.selectedIndex].text,
                peso = document.querySelector('select[name="pesoMascota"]'),
                peso = peso.options[peso.selectedIndex].text,
                file = document.querySelector('input[name="files[]"]'),
                file.files[0] !== undefined ? (
                    nameParaImg = file.files[0].name + v4(),
                    fileExtension = file.files[0].name.split('.').pop(),
                    imagen = nameParaImg + '.' + fileExtension,
                    fd.append('imagenFile1', file.files[0]),
                    fd.append('imagenNuevaName', imagen)
                ) : null,

                //console.log(nombre, raza, edad, peso),
                arrNuevo = [
                    ...arrMascotasDesactualizadas,
                    { id, nombre, raza, edad, peso, imagen }
                ],
                console.log(arrNuevo),
                fd.append('arrayMascotasActualizado', JSON.stringify(arrNuevo)),
                fetch.setFormData(fd),
                fetch.setUrl(serverURL + '/api/protegida/update-mascotas'),
                fetch.fetchDataAsync().then(x => x.response === 1 ?
                    ModalMsg(1).then((ok) => { if (ok) window.location = serverURL + '/api/data' }) :
                    x.response === -1 ? ModalMsg(6) : null
                )
            ) : null
        })
    })




}



const editarListenerUser = (user) => {
    const x = document.querySelector('.editar-user') //button
    x.addEventListener('click', () => {
        const id = Number(x.getAttribute('id'))
        const nombre = x.getAttribute('nombre')
        const loc = x.getAttribute('loc')
        const prov = x.getAttribute('prov')
        const cel = x.getAttribute('cel')
        const email = x.getAttribute('email')

        const html = `
        <form>
          ${htmlEditarUser(id, nombre, loc, prov, cel, email)}
        </form>
        `
        ModalMsg(7, html, 'guardar').then(ok => ok.isConfirmed ? actualizarDataUser(id) : null)
    })
}



const actualizarDataUser = (idusuario) => {
    const id = idusuario
    const nombre = document.getElementsByName("nombre")
    const loc = document.getElementsByName("localidad")
    const prov = document.getElementsByName("provincia")
    const cel = document.getElementsByName("celular")
    const email = document.getElementsByName("email")
    const usuarioParaActualizar =
    {
        id: id,
        nombre: nombre[0].value,
        localidad: loc[0].value,
        provincia: prov[0].value,
        celular: cel[0].value,
        email: email[0].value,
    }

    const fd = new FormData()
    fd.append('data', JSON.stringify(usuarioParaActualizar))
    const fetch = new fetchData(token)
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/protegida/update-usuario')
    fetch.fetchDataAsync().then(x => x.response === 1 ?
        ModalMsg(1).then((ok) => { if (ok) window.location = serverURL + '/api/data' }) :
        x.response === -1 ? ModalMsg(6) : null
    )
}




const editarListener = (mascotas) => {
    const buttons = document.querySelectorAll('.editar')
    Array.from(buttons).map(x => x.addEventListener('click', (e) => {

        const id = Number(x.getAttribute('id'))
        const nombre = x.getAttribute('nombre')
        const raza = x.getAttribute('raza')
        const edad = x.getAttribute('edad')
        const peso = x.getAttribute('peso')

        const html = `
        <form>
          ${htmlEditar(id, nombre, raza, edad, peso)}
        </form>
        `

        ModalMsg(7, html, 'guardar').then(ok => ok.isConfirmed ? actualizarData(id, mascotas) : null)
    }))
}





//actualizar una mascota
const actualizarData = (idmascota, arrMascotasDesactualizadas) => {
    const id = idmascota
    const nombre = document.getElementsByName("nombreMascota")
    const raza = document.getElementsByName("razaMascota")
    const edad = document.getElementsByName("edadMascota")
    const peso = document.getElementsByName("pesoMascota")
    let file = document.querySelector('input[name="files[]"]')
    let nameParaImg = ''
    let fileExtension = ''
    let mascotaParaActualizar

    if (file.files[0] !== undefined) {
        nameParaImg = file.files[0].name + v4()
        fileExtension = file.files[0].name.split('.').pop()
        mascotaParaActualizar =
        {
            id: id,
            nombre: nombre[0].value,
            raza: raza[0].value,
            edad: edad[0].options[edad[0].selectedIndex].text,
            peso: peso[0].options[peso[0].selectedIndex].text,
            imagen: nameParaImg + '.' + fileExtension
        }
    } else {
        let imagenAntiguaUrl = arrMascotasDesactualizadas.find(x => x.id === idmascota)
        mascotaParaActualizar =
        {
            id: id,
            nombre: nombre[0].value,
            raza: raza[0].value,
            edad: edad[0].options[edad[0].selectedIndex].text,
            peso: peso[0].options[peso[0].selectedIndex].text,
            imagen: imagenAntiguaUrl.imagen
        }
    }

    let paraGuardarEnBD = arrMascotasDesactualizadas.filter(x => x.id !== mascotaParaActualizar.id)
    paraGuardarEnBD.push(mascotaParaActualizar)

    console.log(paraGuardarEnBD)

    const fd = new FormData()
    fd.append('arrayMascotasActualizado', JSON.stringify(paraGuardarEnBD))
    fd.append('imagenFile1', file.files[0])
    fd.append('imagenNuevaName', mascotaParaActualizar.imagen)
    const fetch = new fetchData(token)
    fetch.setFormData(fd)
    fetch.setUrl(serverURL + '/api/protegida/update-mascotas')
    fetch.fetchDataAsync()
        .then(x => x.response === 1 ?
            (
                ModalMsg(1).then((ok) => { if (ok) window.location = serverURL + '/api/data' })
            ) :
            x.response === -1 ? ModalMsg(6) : null
        )


}
















const htmlEditarUser = (id, nombre, localidad, provincia, celular, email) => {
    return `
   <label>nombre</label>
   <input type="hidden" name="id" placeholder='nombre' value="${id}" class="form-control">
   <input type="text" name="nombre" placeholder='nombre' value="${nombre}" class="form-control">
   <label>localidad</label>
   <input type="text" name="localidad" placeholder='localidad' value="${localidad}" class="form-control">
   <label>provincia</label>
   <input type="text" name="provincia" placeholder='provincia' value="${provincia}" class="form-control">
   <label>celular</label>
   <input type="text" name="celular" placeholder='celular' value="${celular}" class="form-control">
   <label>email</label>
   <input type="text" name="email" placeholder='email' value="${email}" class="form-control">
   <label>edad</label>
   `
}



const htmlEditar = (id, nombre, raza, edad, peso) => {
    return `
<label>nombre</label>
<input type="text" name="nombreMascota" placeholder='nombre' value="${nombre}" class="form-control">
<label>raza</label>
<input type="text" name="razaMascota" placeholder='raza' value="${raza}" class="form-control">
<label>edad</label>
<select class="custom-select" name="edadMascota">
    <option value="0" selected>${edad}</option>
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
<label>peso</label>
<select class="custom-select" name="pesoMascota">
    <option selected>${peso}</option>
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
<div class="file">
Sube una imágen:
<input type="file" name="files[]" multiple>
</div>


`
}




const eliminarUsuarioListener = () => {
    const btns = document.querySelectorAll('button[name="eliminar-usuario"]')
    const fetch = new fetchData(sessionStorage.getItem('token'))
    Array.from(btns).map(x => {
        x.addEventListener('click', (e) => {
            if (confirm('seguro de eliminar este usuario???')) {
                e.preventDefault()
                const fd = new FormData()
                fd.append('id', x.id)
                fetch.setFormData(fd)
                fetch.setUrl(serverURL + '/api/eliminar-user')
                fetch.fetchDataAsync().then(x => {
                    x.response === 1 ? window.location.href = serverURL + '/api/data' : null
                })
            }

        })
    })
}



const eliminarMascotaListener = () => {
    const btns = document.querySelectorAll(".eliminar-mascota-btn")
    const arr = Array.from(btns)
    arr.map(x => x.addEventListener('click', () => {
        const individual = x.getAttribute('id')
        const fetch = new fetchData(sessionStorage.getItem('token'))
        const fd = new FormData()
        fd.append('id', individual)
        fetch.setFormData(fd)
        fetch.setUrl(serverURL + '/api/protegida/eliminar-mascota')
        fetch.fetchDataAsync().then(x => {
            x.response === 1 ? window.location.href = serverURL + '/api/data' : null
        })
    }))
}












//instancias
let mascotas = []
let usuario = []
const token = sessionStorage.getItem('token')




getMyData('/api/protegida/misDatos').then(x => {
    if (x.response === 1) {
        mascotas = JSON.parse(x.mascotas)
        agregarMascotaNuevaListener(token, mascotas)
        const reducer = mascotas.reduce((acc, x) => {
            return acc + `
            <li class="list-group-item d-flex justify-content-between align-items-center ">
            <div><br>
                <button type="button" class="btn btn-secondary editar" id="${x.id}" nombre="${x.nombre}" raza="${x.raza}" edad="${x.edad}" peso="${x.peso}" >editar</button>
                <button type="button" class="btn btn-danger eliminar-mascota-btn" id="${x.id}">eliminar</button>
            </div>
                 <div class="ms-2 me-auto ">
                     raza: ${x.raza}<br>
                     edad: ${x.edad}<br>
                     peso: ${x.peso}<br>
                 </div>
                 <span class="badge rounded-pill">
                    <img 
                       src="${x.imagen ? routes.adjuntosDir + '/' + x.imagen : './views-utils/img/avatar1.png'}" width="100" height="100" style="border-radius: 50%;"><br>
                    <div class="fw-bold">
                          <b>${x.nombre}</b>
                    </div>
                 </span>
            </li>
            
            `
        }, '')


        usuario = x.usuario[0]
        console.log(x)
        const reducer2 = ` 
            <li class="list-group-item text-left">
                 <div class="ms-2 me-auto">
                     <b>${usuario.nombreCompleto}</b><br>
                     localidad: ${usuario.localidad}<br>
                     provincia: ${usuario.provincia}<br>
                     celular: ${usuario.celular}<br>
                     email: ${usuario.email}<br>
                 </div><br>
                 <button type="button" class="btn btn-secondary editar-user" 
                     id="${usuario.id}" 
                     nombre="${usuario.nombreCompleto}" 
                     loc="${usuario.localidad}" 
                     prov="${usuario.provincia}" 
                     cel="${usuario.celular}" 
                     email="${usuario.email}"
                 >
                 editar
                 </button>
                 ${usuario.role === 'admin' ? '  <a href=" https://nutribarf.ar/_TIENDA/wp-admin/" class="btn btn-secondary">admin tienda</a>' : ''}
                
            </li>
            
        `

        if (usuario.role === 'admin') {
            getMyData('/api/protegida/all-users-data').then(x => {
                const reducer3 = x.todosLosUsuarios.reduce((acc, x) => {
                    const mascotas = JSON.parse(x.mascotas).reduce((acc, x) => {
                        return acc + `
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                          <div> <br>
                          </div>
                               <div class="ms-2 me-auto">
                                   raza: ${x.raza}<br>
                                   edad: ${x.edad}<br>
                                   peso: ${x.peso}<br>
                               </div>
                               <span class="badge rounded-pill">
                                   '<img
                                      src="${x.imagen ? routes.adjuntosDir + '/' + x.imagen : './views-utils/img/avatar1.png'}" 
                                      width="100" 
                                      height="100" 
                                      style="border-radius: 50%;"><br>'
                                   <div class="fw-bold">
                                     <b>${x.nombre}</b>
                                   </div>
                            </span>
                          </li>
                          
                          `
                    }, '')

                    let composition = `
                         <div class="card">
                           <h5 class="card-header bg-warning">${x.nombreCompleto}
                              <b>( ${x.email} )<b>
                           </h5>
                        <p><br>
                           <a class="btn btn-primary btn-sm" data-toggle="collapse" href="#collapseExample${x.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                             Ver ficha
                           </a>
                           <button name="eliminar-usuario" id="${x.id}" class="btn btn-danger btn-sm ">Eliminar</button>
                        </p>
                        <div class="collapse mx-3 " id="collapseExample${x.id}">
                          <div class="card card-body ">
                            <ul class="list-group list-group-flush text-left font-italic">
                              <li class="list-group-item">CEL: ${x.celular}</li>
                              <li class="list-group-item">LOCALIDAD: ${x.localidad}</li>
                              <li class="list-group-item">PROVINCIA: ${x.provincia}</li>
                              <li class="list-group-item">DIRECCION: ${x.direccion}</li>
                              <li class="list-group-item">
                                  ${x.verificado === 1 ? 'ESTADO: <b style="color: green;"> ACTIVO </b>' : '<b style="color: red;">INACTIVO</b>'}
                                  <button type="button" id="usuario-${x.id}" class="btn btn-danger mx-3 desactivar ">${x.verificado === 1 ? 'desactivar' : 'activar'}</button>
                              </li>
                            </ul>
                          </div>
                        </div>

                           <div class="card-body">
                             <h5 class="card-title">mascotas:</h5>
                             <p class="card-text">
                                ${mascotas}
                             </p>
                           </div>
                         </div>
                         <br><br>
                    `
                    return acc + composition
                }, '')
                document.querySelector('.usuario').innerHTML = reducer2;
                document.querySelector('.usuarios').innerHTML = reducer3;
                editarListenerUser(usuario)
                eliminarUsuarioListener()
                //agregando listener para eliminar desactivar user
                x.todosLosUsuarios.map(x => {
                    document.getElementById('usuario-' + x.id).addEventListener('click', (e) => {
                        desactivarUser('/api/desactivar-user', e.target.id.split('-')[1]).then(x => {
                            x.response === 1 ? window.location.href = serverURL + '/api/data' : null
                        })
                    })
                })
            })
            document.querySelector('.mascotasTitle').remove();
        } else {
            //usuario y sus mascotas.
            document.querySelector('.mascotas').insertAdjacentHTML('afterbegin', reducer);
            document.querySelector('.usuario').insertAdjacentHTML('afterbegin', reducer2);
            editarListener(mascotas)
            editarListenerUser(usuario)
            eliminarMascotaListener()
            document.querySelector('.usuariosListaTitle').remove();
        }
    } else {
        ModalMsg(6).then(ok => ok ? window.location.href = serverURL + '/api/ingresar' : null)
    }
})





