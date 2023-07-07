const singleton = 0  //0: dev 1: prod
const devURL = 'http://localhost:8080/25-3-2023%20nutribarf/public_html'
const prodURL = 'https://nutribarf.ar'
export let serverURL = ''

if (singleton === 1) {
    serverURL = prodURL
} else {
    serverURL = devURL
}

export const routes = {
    'home': serverURL + '/api',
    'data': serverURL + '/api/data',
    'calendario': serverURL + '/api/calendario',
    'ingresar': serverURL + '/api/ingresar',
    'adjuntosDir': serverURL + '/api/adjuntos'
}

