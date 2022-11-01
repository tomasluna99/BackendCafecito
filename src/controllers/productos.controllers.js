import { validationResult } from "express-validator";
import Producto from "../models/producto";

export const listarProductos = async(req, res)=>{
   try{
    //buscar en la BD la collection de productos
    const productos = await Producto.find();
    //envio la respuesta al frontend
    res.status(200).json(productos);
   }catch(error){
    console.log(error);
    res.status(404).json({
        mensaje: 'Error al buscar los productos'
    })
   }
}
export const obtenerProducto = async(req, res)=>{
   try{
       //extraer el id de la ruta
        console.log(req.params.id)
       //buscar en la BD el producto que coincida con el id
        const productoBuscado = await Producto.findById(req.params.id);
       //respondes con el producto encontrado
        res.status(200).json(productoBuscado);
   }catch(error){
    console.log(error);
    res.status(404).json({
        mensaje: 'Error no se encontro el producto buscado'
    })
   }
}

export const crearProducto = async(req, res)=>{
    try{
        //trabajar con el resultado de la validacion
        const errors = validationResult(req);
        // errors.isEmpty() true: si esta bien, false: si hay un error
        if(!errors.isEmpty()){
           return res.status(400).json({
                errores: errors.array()
            })
        }
        console.log(req.body)
        //tomar body y validarlo
        //guardar ese objeto en la BD
        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        res.status(201).json({
            mensaje: 'El producto fue creado correctamente'
        })

    }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'ocurrio un error al intentar agregar un producto'
        })
    }
}

export const editarProducto = async(req, res)=>{
    try{
        //extrar el parametro de la ruta y los datos del objeto
        //validar los datos y luego solicitar a la bd actualizar el producto
        await Producto.findByIdAndUpdate(req.params.id, req.body);
        //respondemos al frontend
        res.status(200).json({
            mensaje: 'El producto pudo ser editado correctamente'
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            mensaje: 'Error al intentar editar un producto'
        })
    }

}
export const borrarProducto = async(req, res)=>{
    try{
       //buscar el id de la ruta, luego pedir a la BD borrar ese producto
       await Producto.findByIdAndDelete(req.params.id);
       //enviar respuesta al frontend
        res.status(200).json({
            mensaje: 'El producto fue eliminado correctamente'
        })
    }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al intentar borrar un producto'
        })
    }

}