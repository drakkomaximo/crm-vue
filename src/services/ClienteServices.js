import api from '../lib/axios';

export default {
    obtenerClientes: () => {
        return api.get('/clientes')
    },

    agregarCliente: (cliente) => {
        return api.post('/clientes', cliente)
    },

    obtenerCliente: (id) => {
        return api.get(`/clientes/${id}`)
    },

    editarCliente: (id, cliente) => {
        return api.patch(`/clientes/${id}`, cliente)
    },

    eliminarCliente: (id) => {
        return api.delete(`/clientes/${id}`)
    },

    cambiarEstadoCliente: (id, estado) => {
        return api.patch(`/clientes/${id}`, { estado })
    }
}