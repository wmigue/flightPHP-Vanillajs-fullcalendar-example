(()=>{"use strict";class u{_formdata;_url;_token;_opcion;_method;constructor(o="",e=1){this._token=o,this._opcion=e,this._method="POST"}setMethod(o){this._method=o}setFormData(o){this._formdata=o}setUrl(o){this._url=o}setOption(o){this._opcion=o,this._formdata.append("opcion",this._opcion)}async fetchDataAsync(){var o=this._token??this._token,e=c(3),o=await(await fetch(this._url,{headers:{Authorization:"Bearer "+o},method:this._method,body:this._formdata??this._formdata})).json();return await e.close(),o}}const c=(o,e=null,t=null)=>{let a="";var n=` 
    <br>
    <div class="lds-spinner" style="height: 13vh;">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>

    `,i={confirmButtonText:null!==t?t:"aceptar",loaderHtml:n,imageWidth:100,imageHeight:100,html:e,showConfirmButton:!0};switch(o){case 0:i.html="Completa los campos REQUERIDOS.",a=Swal.fire(i);break;case 1:i.html="guardado OK",a=Swal.fire(i);break;case 2:i.html="error de conexion.",a=Swal.fire(i);break;case 3:i.html=n+"<br>procesando...",i.showConfirmButton=!1,a=Swal.fire(i);break;case 4:i.html="solo podes adjuntar un archivo. recargar la web para repetir.",a=Swal.fire(i);break;case 5:i.html="ya existe ese e-mail en BD. o no es un email valido.",a=Swal.fire(i);break;case 6:i.html="ERROR: no estas autenticado.",a=Swal.fire(i);break;case 7:a=Swal.fire(i);break;default:return a}return a};let d="";d="https://nutribarf.ar",d,d,d,d;const n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let o;const e=new Uint8Array(16);function i(){if(o=o||"undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto))return o(e);throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")}const t=[];for(let o=0;o<256;++o)t.push((o+256).toString(16).slice(1));function r(o,e=0){return(t[o[e+0]]+t[o[e+1]]+t[o[e+2]]+t[o[e+3]]+"-"+t[o[e+4]]+t[o[e+5]]+"-"+t[o[e+6]]+t[o[e+7]]+"-"+t[o[e+8]]+t[o[e+9]]+"-"+t[o[e+10]]+t[o[e+11]]+t[o[e+12]]+t[o[e+13]]+t[o[e+14]]+t[o[e+15]]).toLowerCase()}function m(o,e,t){if(n.randomUUID&&!e&&!o)return n.randomUUID();var a=(o=o||{}).random||(o.rng||i)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,e){t=t||0;for(let o=0;o<16;++o)e[t+o]=a[o];return e}return r(a)}var a=document.querySelector("#add-mascota-wm");const l=document.querySelector("#mascotanueva");a.addEventListener("click",()=>{var o=document.createElement("div");o.innerHTML=`
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
            
                                   
                        
    
    `,l.appendChild(o)});a=document.querySelector("form");const v=document.getElementsByName("nombreMascota[]"),f=document.getElementsByName("razaMascota[]"),g=document.getElementsByName("pesoMascota[]"),h=document.getElementsByName("edadMascota[]"),y=document.getElementsByName("files[]"),k=new FormData;a.addEventListener("submit",o=>{o.preventDefault();o=Array.from([...v]);const a=Array.from([...f]),n=Array.from([...h]),i=Array.from([...g]),r=Array.from([...y]);let l="",p="";var o=o.reduce((o,e,t)=>(void 0!==r[t].files[0]&&(l=r[t].files[0].name+m(),p=r[t].files[0].name.split(".").pop()),[...o,{id:t+1,nombre:e.value,raza:a[t].value,edad:n[t].options[n[t].selectedIndex].text,peso:i[t].options[i[t].selectedIndex].text,imagen:void 0!==r[t].files[0]?l+"."+p:""}]),[]),e=[{name:document.querySelector('input[name="name"]').value,email:document.querySelector('input[name="email"').value,pass:document.querySelector('input[name="pass"').value,localidad:document.querySelector('input[name="localidad"').value,provincia:document.querySelector('input[name="provincia"').value,direccion:document.querySelector('input[name="direccion"').value,celular:document.querySelector('input[name="celular"').value}],o=[{name:"mascotas",value:o},{name:"datosCliente",value:e}],[o,[...t]]=(r.forEach((o,e)=>{k.append("archivo"+e,o.files[0])}),[k,o]),o=(t=t.reduce((o,e)=>{try{return"INPUT"===e.tagName||"TEXTAREA"===e.tagName?[...o,{[e.name]:e.value}]:"SELECT"===e.tagName?[...o,{[e.name]:e.options[e.selectedIndex].text}]:"object"==typeof e&&Array.isArray(e.value)?[...o,{[e.name]:e.value.reduce((o,e)=>{if("object"!=typeof e||Array.isArray(e))return[...o,e.value];var t,a,n={};for([t,a]of Object.entries(e))n[t]=a;return[...o,n]},[])}]:"object"==typeof e?[...o,{[e.name]:e.value}]:void 0}catch{throw new Error("quizas no existe ese tipo . fijarse en los inputs enviados . sino wmigue@gmail.com .")}},[]),o.append("data",JSON.stringify(t)),new u);const s="/api/confirmeUsuario/"+e[0].email;o.setFormData(k),o.setUrl(d+"/api/insertOneUser"),o.fetchDataAsync().then(o=>1===o.response?c(1).then(o=>o?window.location=d+s:d+s):-1===o.response?c(6):c(5))})})();