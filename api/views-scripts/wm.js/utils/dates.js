//distancia entre 2 fechas en dias.
export const distanciaEntreDosFechas = (f1, f2) => {
    var f1 = new Date(f1); //string
    var diferencia = f1.getTime() - f2.getTime()
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
    return dias
}





//distancia en dias entre hoy y la fecha pasada por parametro
export const diasRestantes = (fecha) => {
    const today = new Date()
    var fechaEspecifica = new Date(fecha); //string
    var diferencia = fechaEspecifica.getTime() - today.getTime()
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
    return dias
}






//en liimite establecemos la distancia requerida para considerar al evento como cercano.
//formato array: ' [{"id":1,"title":"soy admin","start":"2023-04-06T01:30","end":"2023-04-06T01:30"},{"id":2,"title":"soy admin 13","start":"2023-04-13T01:00","end":"2023-04-13T01:00"},{"id":3,"title":"22 tengo un evento","start":"2023-04-22T18:30","end":"2023-04-22T18:30"}] '
//devuelve array con fechas que coinciden.
export const eventosCercanos = (limite, arrFechas) => {
    let toAccum = '';
    const today = new Date();
    const res = arrFechas.reduce((acc, x) => {
        var fechaEspecifica = new Date(x.start); //string
        var diferencia = fechaEspecifica.getTime() - today.getTime();
        var distancia = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        if (distancia >= 0 && distancia <= limite) {
            //console.log(distancia + ' dias');
            toAccum = [...acc, x];
        }
        return toAccum;
    }, []);
    return res;
};





// se pasa un string con este param: 2023-04-04, 11, 55
// devuelve: 2023-04-24T01:30
const formateoFechaParaFullCalendar = (dateStr, horas, minutos) => {
    let dia = dateStr + 'T' + horas + ':' + minutos
    return dia
}




//recibe fecha string '2023-04-22T18:30'
//retorna "sábado, 22 de abril de 2023 18:30 GMT-3"
export const formateoArgentina = (fechaString) => {
    const fecha = new Date(fechaString)
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
        //timeZoneName: 'short'
    };
    const formatter = new Intl.DateTimeFormat('es-AR', options)
    const fechaFormateada = formatter.format(fecha)
    return fechaFormateada
}