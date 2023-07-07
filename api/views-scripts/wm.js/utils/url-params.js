


//la url tiene el parametro solicitado?
//recibe algo asi: 'home'
export const tieneEsteParametro = (stringParam) => {
    const url = new URL(window.location.href)
    if (url.searchParams.has(stringParam)) {
        const valor = url.searchParams.get(stringParam)
        console.log('El valor del parámetro es:', valor)
        return true
    } else {
        console.log(url.searchParams)
        return false
    }
}



// recibe por parametro algo asi: '/api/data'
export const incluyeEstosParams = (string) => {
    const url = window.location;
    if (url.pathname.includes(string)) {
        console.log('La ruta '+string+ ' está presente en la URL');
        return true
    } else {
        console.log('La ruta '+string+ ' NO está presente en la URL');
        return false
    }
}

