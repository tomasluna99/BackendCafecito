//rutas
import { Router } from "express";
import { borrarProducto, crearProducto, editarProducto, listarProductos, obtenerProducto } from "../controllers/productos.controllers";
import { check } from "express-validator";
const router = Router();
router
    .route("/productos")
    .get(listarProductos)
    .post(
        [
            check("nombreProducto")
                .notEmpty()
                .withMessage("El nombre del producto es un dato obligatorio")
                .isLength({ min: 2, max: 100 })
                .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
            check("precio")
                .notEmpty()
                .withMessage("El precio del producto es un dato obligatorio")
                .isNumeric()
                .withMessage("El precio debe ser un numero")
                .custom((value) => {
                    if (value >= 0 && value <= 10000) {
                        return true;
                    } else {
                        throw new Error("El precio debe estar entre 0 y 10000");
                    }
                }),
            check("imagen")
                .notEmpty()
                .withMessage("El link de la imagen es un dato obligatorio")
                .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
                .withMessage("debes ingresar una url valida"),
            check("categoria")
                .notEmpty()
                .withMessage("La categoria es un dato obligatorio")
                .isIn(["Bebida caliente", "Bebida fria", "Dulce", "Salado"])
                .withMessage("Debe ingresar una categoría valida"),
        ],
        crearProducto
    );
//matches
router
    .route("/productos/:id")
    .get(obtenerProducto)
    .put(
        [
            check("nombreProducto")
                .notEmpty()
                .withMessage("El nombre del producto es un dato obligatorio")
                .isLength({ min: 2, max: 100 })
                .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
            check("precio")
                .notEmpty()
                .withMessage("El precio del producto es un dato obligatorio")
                .isNumeric()
                .withMessage("El precio debe ser un numero")
                .custom((value) => {
                    if (value >= 0 && value <= 10000) {
                        return true;
                    } else {
                        throw new Error("El precio debe estar entre 0 y 10000");
                    }
                }),
            check("imagen")
                .notEmpty()
                .withMessage("El link de la imagen es un dato obligatorio")
                .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
                .withMessage("debes ingresar una url valida"),
            check("categoria")
                .notEmpty()
                .withMessage("La categoria es un dato obligatorio")
                .isIn(["Bebida caliente", "Bebida fria", "Dulce", "Salado"])
                .withMessage("Debe ingresar una categoría valida"),
        ],
        editarProducto
    )
    .delete(borrarProducto);

// app.get("/prueba", (reg, res) => {
//     res.send("esto es una prueba de peticion get");
// });
// app.delete("/prueba", (reg, res) => {
//     res.send("aqui tendría que borrar un dato");
// });

export default router;
