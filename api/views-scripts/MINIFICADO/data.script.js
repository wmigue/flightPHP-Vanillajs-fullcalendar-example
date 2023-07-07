(()=>{"use strict";let b="";const i={home:(b="https://nutribarf.ar")+"/api",data:b+"/api/data",calendario:b+"/api/calendario",ingresar:b+"/api/ingresar",adjuntosDir:b+"/api/adjuntos"};class g{_formdata;_url;_token;_opcion;_method;constructor(e="",t=1){this._token=e,this._opcion=t,this._method="POST"}setMethod(e){this._method=e}setFormData(e){this._formdata=e}setUrl(e){this._url=e}setOption(e){this._opcion=e,this._formdata.append("opcion",this._opcion)}async fetchDataAsync(){var e=this._token??this._token,t=f(3),e=await(await fetch(this._url,{headers:{Authorization:"Bearer "+e},method:this._method,body:this._formdata??this._formdata})).json();return await t.close(),e}}const f=(e,t=null,a=null)=>{let o="";var i=` 
    <br>
    <div class="lds-spinner" style="height: 13vh;">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>

    `,n={confirmButtonText:null!==a?a:"aceptar",loaderHtml:i,imageWidth:100,imageHeight:100,html:t,showConfirmButton:!0};switch(e){case 0:n.html="Completa los campos REQUERIDOS.",o=Swal.fire(n);break;case 1:n.html="guardado OK",o=Swal.fire(n);break;case 2:n.html="error de conexion.",o=Swal.fire(n);break;case 3:n.html=i+"<br>procesando...",n.showConfirmButton=!1,o=Swal.fire(n);break;case 4:n.html="solo podes adjuntar un archivo. recargar la web para repetir.",o=Swal.fire(n);break;case 5:n.html="ya existe ese e-mail en BD. o no es un email valido.",o=Swal.fire(n);break;case 6:n.html="ERROR: no estas autenticado.",o=Swal.fire(n);break;case 7:o=Swal.fire(n);break;default:return o}return o};const n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const t=new Uint8Array(16);function r(){if(e=e||"undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto))return e(t);throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")}const a=[];for(let e=0;e<256;++e)a.push((e+256).toString(16).slice(1));function l(e,t=0){return(a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]).toLowerCase()}function h(e,t,a){if(n.randomUUID&&!t&&!e)return n.randomUUID();var o=(e=e||{}).random||(e.rng||r)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){a=a||0;for(let e=0;e<16;++e)t[a+e]=o[e];return t}return l(o)}const s=async e=>{var t=new FormData,a=new g(w);return a.setFormData(t),a.setMethod("POST"),a.setUrl(b+e),a.fetchDataAsync()},d=e=>{const n=document.querySelector(".editar-user");n.addEventListener("click",()=>{const r=Number(n.getAttribute("id"));var e=n.getAttribute("nombre"),t=n.getAttribute("loc"),a=n.getAttribute("prov"),o=n.getAttribute("cel"),i=n.getAttribute("email"),e=`
        <form>
          ${`
   <label>nombre</label>
   <input type="hidden" name="id" placeholder='nombre' value="${r}" class="form-control">
   <input type="text" name="nombre" placeholder='nombre' value="${e}" class="form-control">
   <label>localidad</label>
   <input type="text" name="localidad" placeholder='localidad' value="${t}" class="form-control">
   <label>provincia</label>
   <input type="text" name="provincia" placeholder='provincia' value="${a}" class="form-control">
   <label>celular</label>
   <input type="text" name="celular" placeholder='celular' value="${o}" class="form-control">
   <label>email</label>
   <input type="text" name="email" placeholder='email' value="${i}" class="form-control">
   <label>edad</label>
   `}
        </form>
        `;f(7,e,"guardar").then(e=>{if(!e.isConfirmed)return null;var e=r,t=document.getElementsByName("nombre"),a=document.getElementsByName("localidad"),o=document.getElementsByName("provincia"),i=document.getElementsByName("celular"),n=document.getElementsByName("email"),e={id:e,nombre:t[0].value,localidad:a[0].value,provincia:o[0].value,celular:i[0].value,email:n[0].value},t=new FormData,a=(t.append("data",JSON.stringify(e)),new g(w));a.setFormData(t),a.setUrl(b+"/api/protegida/update-usuario"),a.fetchDataAsync().then(e=>1===e.response?f(1).then(e=>{e&&(window.location=b+"/api/data")}):-1===e.response?f(6):null)})})},p=m=>{var e=document.querySelectorAll(".editar");Array.from(e).map(n=>n.addEventListener("click",e=>{const u=Number(n.getAttribute("id"));var t=n.getAttribute("nombre"),a=n.getAttribute("raza"),o=n.getAttribute("edad"),i=n.getAttribute("peso"),t=`
        <form>
          ${y(u,t,a,o,i)}
        </form>
        `;f(7,t,"guardar").then(i=>{if(!i.isConfirmed)return null;{var n,r=u,i=m,l=r,s=document.getElementsByName("nombreMascota"),d=document.getElementsByName("razaMascota"),p=document.getElementsByName("edadMascota"),c=document.getElementsByName("pesoMascota");let e=document.querySelector('input[name="files[]"]'),t="",a="",o;o=void 0!==e.files[0]?(t=e.files[0].name+h(),a=e.files[0].name.split(".").pop(),{id:l,nombre:s[0].value,raza:d[0].value,edad:p[0].options[p[0].selectedIndex].text,peso:c[0].options[c[0].selectedIndex].text,imagen:t+"."+a}):(n=i.find(e=>e.id===r),{id:l,nombre:s[0].value,raza:d[0].value,edad:p[0].options[p[0].selectedIndex].text,peso:c[0].options[c[0].selectedIndex].text,imagen:n.imagen});l=i.filter(e=>e.id!==o.id),s=(l.push(o),console.log(l),new FormData),d=(s.append("arrayMascotasActualizado",JSON.stringify(l)),s.append("imagenFile1",e.files[0]),s.append("imagenNuevaName",o.imagen),new g(w));d.setFormData(s),d.setUrl(b+"/api/protegida/update-mascotas"),d.fetchDataAsync().then(e=>1===e.response?f(1).then(e=>{e&&(window.location=b+"/api/data")}):-1===e.response?f(6):null)}})}))},y=(e,t,a,o,i)=>`
<label>nombre</label>
<input type="text" name="nombreMascota" placeholder='nombre' value="${t}" class="form-control">
<label>raza</label>
<input type="text" name="razaMascota" placeholder='raza' value="${a}" class="form-control">
<label>edad</label>
<select class="custom-select" name="edadMascota">
    <option value="0" selected>${o}</option>
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
    <option selected>${i}</option>
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


`;let c=[],u;const w=sessionStorage.getItem("token");s("/api/protegida/misDatos").then(e=>{if(1===e.response){c=JSON.parse(e.mascotas),m=w,v=c,document.getElementById("agregar-mascota").addEventListener("click",()=>{const t=new FormData,a=new g(m),o=v.reduce((e,t)=>t.id>e.id?t:e,{id:-1}).id+1;let i,n,r,l,s="",d,p,c="",u;f(7,"<b>Agregar nueva mascota</b><br><br>"+y(0,"","","",""),"guardar").then(e=>{e.isConfirmed&&(i=document.querySelector('input[name="nombreMascota"]').value,n=document.querySelector('input[name="razaMascota"]').value,r=(r=document.querySelector('select[name="edadMascota"]')).options[r.selectedIndex].text,l=(l=document.querySelector('select[name="pesoMascota"]')).options[l.selectedIndex].text,void 0!==(s=document.querySelector('input[name="files[]"]')).files[0]&&(d=s.files[0].name+h(),p=s.files[0].name.split(".").pop(),c=d+"."+p,t.append("imagenFile1",s.files[0]),t.append("imagenNuevaName",c)),u=[...v,{id:o,nombre:i,raza:n,edad:r,peso:l,imagen:c}],console.log(u),t.append("arrayMascotasActualizado",JSON.stringify(u)),a.setFormData(t),a.setUrl(b+"/api/protegida/update-mascotas"),a.fetchDataAsync().then(e=>1===e.response?f(1).then(e=>{e&&(window.location=b+"/api/data")}):-1===e.response?f(6):null))})});var t=c.reduce((e,t)=>e+`
            <li class="list-group-item d-flex justify-content-between align-items-center ">
            <div><br>
                <button type="button" class="btn btn-secondary editar" id="${t.id}" nombre="${t.nombre}" raza="${t.raza}" edad="${t.edad}" peso="${t.peso}" >editar</button>
                <button type="button" class="btn btn-danger eliminar-mascota-btn" id="${t.id}">eliminar</button>
            </div>
                 <div class="ms-2 me-auto ">
                     raza: ${t.raza}<br>
                     edad: ${t.edad}<br>
                     peso: ${t.peso}<br>
                 </div>
                 <span class="badge rounded-pill">
                    <img 
                       src="${t.imagen?i.adjuntosDir+"/"+t.imagen:"./views-utils/img/avatar1.png"}" width="100" height="100" style="border-radius: 50%;"><br>
                    <div class="fw-bold">
                          <b>${t.nombre}</b>
                    </div>
                 </span>
            </li>
            
            `,"");u=e.usuario[0],console.log(e);const o=` 
            <li class="list-group-item text-left">
                 <div class="ms-2 me-auto">
                     <b>${u.nombreCompleto}</b><br>
                     localidad: ${u.localidad}<br>
                     provincia: ${u.provincia}<br>
                     celular: ${u.celular}<br>
                     email: ${u.email}<br>
                 </div><br>
                 <button type="button" class="btn btn-secondary editar-user" 
                     id="${u.id}" 
                     nombre="${u.nombreCompleto}" 
                     loc="${u.localidad}" 
                     prov="${u.provincia}" 
                     cel="${u.celular}" 
                     email="${u.email}"
                 >
                 editar
                 </button>
                 ${"admin"===u.role?'  <a href=" https://nutribarf.ar/_TIENDA/wp-admin/" class="btn btn-secondary">admin tienda</a>':""}
                
            </li>
            
        `;("admin"===u.role?(s("/api/protegida/all-users-data").then(e=>{var t=e.todosLosUsuarios.reduce((e,t)=>{var a=JSON.parse(t.mascotas).reduce((e,t)=>e+`
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                          <div> <br>
                          </div>
                               <div class="ms-2 me-auto">
                                   raza: ${t.raza}<br>
                                   edad: ${t.edad}<br>
                                   peso: ${t.peso}<br>
                               </div>
                               <span class="badge rounded-pill">
                                   '<img
                                      src="${t.imagen?i.adjuntosDir+"/"+t.imagen:"./views-utils/img/avatar1.png"}" 
                                      width="100" 
                                      height="100" 
                                      style="border-radius: 50%;"><br>'
                                   <div class="fw-bold">
                                     <b>${t.nombre}</b>
                                   </div>
                            </span>
                          </li>
                          
                          `,"");return e+`
                         <div class="card">
                           <h5 class="card-header bg-warning">${t.nombreCompleto}
                              <b>( ${t.email} )<b>
                           </h5>
                        <p><br>
                           <a class="btn btn-primary btn-sm" data-toggle="collapse" href="#collapseExample${t.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                             Ver ficha
                           </a>
                           <button name="eliminar-usuario" id="${t.id}" class="btn btn-danger btn-sm ">Eliminar</button>
                        </p>
                        <div class="collapse mx-3 " id="collapseExample${t.id}">
                          <div class="card card-body ">
                            <ul class="list-group list-group-flush text-left font-italic">
                              <li class="list-group-item">CEL: ${t.celular}</li>
                              <li class="list-group-item">LOCALIDAD: ${t.localidad}</li>
                              <li class="list-group-item">PROVINCIA: ${t.provincia}</li>
                              <li class="list-group-item">DIRECCION: ${t.direccion}</li>
                              <li class="list-group-item">
                                  ${1===t.verificado?'ESTADO: <b style="color: green;"> ACTIVO </b>':'<b style="color: red;">INACTIVO</b>'}
                                  <button type="button" id="usuario-${t.id}" class="btn btn-danger mx-3 desactivar ">${1===t.verificado?"desactivar":"activar"}</button>
                              </li>
                            </ul>
                          </div>
                        </div>

                           <div class="card-body">
                             <h5 class="card-title">mascotas:</h5>
                             <p class="card-text">
                                ${a}
                             </p>
                           </div>
                         </div>
                         <br><br>
                    `},"");document.querySelector(".usuario").innerHTML=o,document.querySelector(".usuarios").innerHTML=t,d(u);{t=document.querySelectorAll('button[name="eliminar-usuario"]');const a=new g(sessionStorage.getItem("token"));Array.from(t).map(t=>{t.addEventListener("click",e=>{confirm("seguro de eliminar este usuario???")&&(e.preventDefault(),(e=new FormData).append("id",t.id),a.setFormData(e),a.setUrl(b+"/api/eliminar-user"),a.fetchDataAsync().then(e=>{1===e.response&&(window.location.href=b+"/api/data")}))})})}e.todosLosUsuarios.map(e=>{document.getElementById("usuario-"+e.id).addEventListener("click",e=>{(async(e,t)=>{var a=new FormData,t=(a.append("idUser",JSON.stringify(t)),a.append("role","admin"),new g(w));return t.setFormData(a),t.setMethod("POST"),t.setUrl(b+e),t.fetchDataAsync()})("/api/desactivar-user",e.target.id.split("-")[1]).then(e=>{1===e.response&&(window.location.href=b+"/api/data")})})})}),document.querySelector(".mascotasTitle")):(document.querySelector(".mascotas").insertAdjacentHTML("afterbegin",t),document.querySelector(".usuario").insertAdjacentHTML("afterbegin",o),p(c),d(u),e=document.querySelectorAll(".eliminar-mascota-btn"),Array.from(e).map(o=>o.addEventListener("click",()=>{var e=o.getAttribute("id"),t=new g(sessionStorage.getItem("token")),a=new FormData;a.append("id",e),t.setFormData(a),t.setUrl(b+"/api/protegida/eliminar-mascota"),t.fetchDataAsync().then(e=>{1===e.response&&(window.location.href=b+"/api/data")})})),document.querySelector(".usuariosListaTitle"))).remove()}else f(6).then(e=>e?window.location.href=b+"/api/ingresar":null);var m,v})})();