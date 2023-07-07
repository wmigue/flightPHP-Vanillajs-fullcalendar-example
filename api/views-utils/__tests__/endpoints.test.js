import { fetchData, ModalMsg } from '../../views-scripts/wm.js/utils/http.js'
import { serverURL } from '../../views-scripts/config.js'
import request from "supertest"



const generarToken = async (role) => {
    let credenciales
    if (role === 1) {
        //admin role
        credenciales = [{ email: 'admin@admin.com', pass: '0' }]
        console.log(credenciales);
    } else if(role ===0) {
        //user role
        credenciales = [{ email: 'wmigue@gmail.com', pass: '000000' }]
    }else{
         //otro role
         credenciales = [{ email: 'x@x.com', pass: 'x' }]
    }
    const fd = new FormData()
    fd.append('data', JSON.stringify(credenciales))
    return await fetch(serverURL + '/api/loginUser', {
        method: 'POST',
        body: fd
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('POST /api/desactivar-user', () => {
    const fd = new FormData()
    const desactivarId = 151
    fd.append('idUser', JSON.stringify(desactivarId))
    const llamada = async () => {
        const token = await generarToken(1)
        const token1 = await token.json()
        const token2 = await token1.token
        //console.log('token: ' + token2);
        return await fetch(serverURL + '/api/desactivar-user', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token2,
            },
            body: fd
        })
    }

    test('DESACTIVAR USUARIO', async () => {
        const data = await llamada()
        const json = await data.json()
        expect(json.response).toEqual(1)
    })
})



describe.only('POST api/loginUser', () => {
    test('TOKEN VALIDO', async () => {
        const token = await generarToken(1)
        const token1 = await token.json()
        const token2 = await token1.token
        console.log(token2)
        expect(token2).not.toBeUndefined() 
    })
})
