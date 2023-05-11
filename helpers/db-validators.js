const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

//Verificar si el correo existe
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`el correo ${correo} ya fue registrado`)
}
}   

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(existeUsuario){
        throw new Error(`el id no existe ${id}`)
}
} 



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}