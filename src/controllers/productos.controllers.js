import { validationResult } from "express-validator";
import Producto from "../models/producto";
export const listarProductos = async (req, res) => {
    try {
        //buscar en la BD la collection de productos
        const productos = await Producto.find();
        //enviar respuesa al frontend
        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar los productos",
        });
    }
};
export const crearProducto = async (req, res) => {
    try {
        //trabajar con el resultado de la validacion
        const errors = validationResult(req);
        //errors.isEmpty()true o flase dependiendo si tiene o no errores
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errores: errors.array(),
            });
        }

        console.log(req.body);
        //tomar el body y validarlo
        //guardar el objeto en la BD
        const productoNuevo = new Producto(req.body);
        await productoNuevo.save();
        res.status(201).json({
            mensaje: "El producto fue creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "ocurrio un error al intentar agregar un producto",
        });
    }
};
export const obtenerProducto = async (req, res) => {
    try {
        //extraer id de la ruta
        console.log(req.params.id);
        //buscar en la BD el producto que tenga ese id
        const productoBuscado = await Producto.findById(req.params.id);
        //responder al frontend con el objeto encontrado
        res.status(200).json(productoBuscado);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar el producto",
        });
    }
};
export const editarProducto = async (req, res) => {
    try {
        //extraer id de la ruta y los datos del objeto a actualizar
        //validar los datos y luego solicitar a la BD actualizar el producto
        await Producto.findByIdAndUpdate(req.params.id, req.body);
        //respondemos al fe
        res.status(200).json({
            mensaje: "Producto editado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "Error al intentar editar el producto",
        });
    }
};
export const borrarProducto = async (req, res) => {
    try {
        //extraer id de la ruta  y luego solicitar a la BD borrar el producto
        await Producto.findByIdAndDelete(req.params.id);
        //respondemos al FE
        res.status(200).json({
            mensaje: "Producto borrado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al intentar borrar el producto",
        });
    }
};
