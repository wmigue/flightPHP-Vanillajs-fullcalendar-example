import { routes } from './config.js'


export const redirigir=()=>{
    window.onload = () => {
        setTimeout(() => {
            window.location.href = routes.ingresar
        }, 3000);
    }
}

redirigir()
