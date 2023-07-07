(()=>{"use strict";class s{_formdata;_url;_token;_opcion;_method;constructor(e="",t=1){this._token=e,this._opcion=t,this._method="POST"}setMethod(e){this._method=e}setFormData(e){this._formdata=e}setUrl(e){this._url=e}setOption(e){this._opcion=e,this._formdata.append("opcion",this._opcion)}async fetchDataAsync(){var e=this._token??this._token,t=l(3),e=await(await fetch(this._url,{headers:{Authorization:"Bearer "+e},method:this._method,body:this._formdata??this._formdata})).json();return await t.close(),e}}const l=(e,t=null,a=null)=>{let o="";var n=` 
    <br>
    <div class="lds-spinner" style="height: 13vh;">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>

    `,r={confirmButtonText:null!==a?a:"aceptar",loaderHtml:n,imageWidth:100,imageHeight:100,html:t,showConfirmButton:!0};switch(e){case 0:r.html="Completa los campos REQUERIDOS.",o=Swal.fire(r);break;case 1:r.html="guardado OK",o=Swal.fire(r);break;case 2:r.html="error de conexion.",o=Swal.fire(r);break;case 3:r.html=n+"<br>procesando...",r.showConfirmButton=!1,o=Swal.fire(r);break;case 4:r.html="solo podes adjuntar un archivo. recargar la web para repetir.",o=Swal.fire(r);break;case 5:r.html="ya existe ese e-mail en BD. o no es un email valido.",o=Swal.fire(r);break;case 6:r.html="ERROR: no estas autenticado.",o=Swal.fire(r);break;case 7:o=Swal.fire(r);break;default:return o}return o};let d="";d="https://nutribarf.ar",d,d,d,d;const c=(e,t,a)=>{return e+"T"+t+":"+a};const u=async e=>{e=new s(e);return e.setMethod="POST",e.setUrl(d+"/api/protegida/get-calendario"),e.fetchDataAsync()};var e=document.getElementById("calendar");let m=new FullCalendar.Calendar(e,{eventClick:function(e){var a,t=e.event.id,e=`
    <b class="text-primary">Descripcion del Evento: </b>
    <p class="text-danger">${e.event.title}<p>
    <b class="text-primary">Fecha / Hora: </b>
    <p>${(e=>{e=new Date(e);return new Intl.DateTimeFormat("es-AR",{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",timeZone:"America/Argentina/Buenos_Aires"}).format(e)})(e.event.start)}<p>
    <button id="btn-eliminar-${t}" class="btn btn-danger btn-sm">Eliminar evento</button>
    <br><hr><br>
    `;l(7,e,"aceptar"),a=t,document.querySelector(`button[id="btn-eliminar-${a}"]`).addEventListener("click",()=>{var e,t;confirm("Seguro de eliminar el evento?")&&(e=new FormData,t=new s(sessionStorage.getItem("token")),e.append("idEventoAEliminar",a),t.setFormData(e),t.setUrl(d+"/api/protegida/eliminar-evento-calendario"),t.fetchDataAsync().then(e=>m.refetchEvents()))})},dateClick:r=>{const i=sessionStorage.getItem("token");var e=r.dateStr.split("-"),e=`<br><b>DIA: ${e[2]+"-"+e[1]+"-"+e[0]}</b><br><br>`;l(7,e+(()=>{let t="";for(let e=1;e<25;e++)if(e<=9)t+=`<option value=0${e}>0${e}</option>`;else t+=`<option value=${e}>${e}</option>`;let e=`
      <select id="horas">
         ${t}
      </select>
    `,a="",o=`
      <select id="minutos">
         ${a=(a=a+`<option value="00">00</option>`+`<option value="15">15</option>`)+`<option value="30">30</option>`+`<option value="45">45</option>`}
      </select>
    `;return`
    <input type="text" placeholder='escribe una descripcion para el nuevo evento' class="form-control titulo"><br>
    <label>seleccione hora</label>
    ${e}
    <label>seleccione minutos</label>
    ${o}
    `})(),"guardar ").then(e=>{var t=document.querySelector(".titulo"),o=document.getElementById("horas"),n=document.getElementById("minutos");if(t.value){if(e.isConfirmed){let a={id:"",title:t.value,start:c(r.dateStr,o.value,n.value),end:c(r.dateStr,o.value,n.value)};e.isConfirmed&&u(i).then(e=>{var e=JSON.parse(e.eventosCalendario),t=e.length+1;a.id=t,e.push(a),(async(e,t)=>{const a=new FormData,o=(a.append("data",JSON.stringify(t)),new s(e));return o.setMethod="POST",o.setFormData(a),o.setUrl(d+"/api/protegida/add-evento"),await o.fetchDataAsync()})(i,e).then(e=>{console.log(e),m.refetchEvents()})})}}else l(7,"<b>❌ error: complete todos los campos.</b>","aceptar")})},locale:"es",buttonText:{today:"Hoy",day:"Día",week:"Semana",month:"Mes"},defaultView:"agendaWeek",slotDuration:"04:30:00",headerToolbar:{left:"prev,next,today,ayudaAlUsuario",center:"title",right:"dayGridDay,dayGridWeek,dayGridMonth"},aspectRatio:1.35,navLinks:!0,editable:!1,dayMaxEvents:!0,themeSystem:"bootstrap4",events:async()=>u(sessionStorage.getItem("token")).then(e=>{if(1===e.response)return JSON.parse(e.eventosCalendario);l(7,"no autenticado. debes loguearte primero.","aceptar").then(e=>e.isConfirmed?window.location.href=d+"/api/ingresar":null)}),customButtons:{ayudaAlUsuario:{text:"Ayuda al usuario",click:function(){l(7,`
       <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Ayuda</h1>
            <p class="lead"><b>1- </b>click dentro del espacio en blanco del dia para agregar un nuevo evento.</p>
            <p class="lead"><b>2- </b>click en un evento existente para ver más detalles o eliminarlo.</p>
          </div>
       </div>
    `,"aceptar")}}}});m.render()})();