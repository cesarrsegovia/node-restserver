const {response, request} = require('express')

const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')



const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true};
    

    const [total, usuarios] = await Promise.all([ //Promise.all ejecuta dos promesas de manera simultanea
        Usuario.countDocuments(query), //Promesa 1
        Usuario.find(query)            //Promesa 2
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuarioDB);
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    //Encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - usuariosPatch'
    })
    
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}