import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import productoRouter from "./routes/productos.routes";
//llamar a la conecion a la bd (ejecutar el archivo database)
import "./database";

//crear una instancia de express
const app = express();
//configurar un puerto
app.set("port", process.env.PORT || 4001);

app.listen(app.get("port"), () => {
    console.log("estoy en el puerto " + app.get("port"));
});

//midlewares: funciones que se ejecutan antes de las rutas
app.use(cors()); //permite conexiones remotas
app.use(express.json()); //interpreta el formato json
app.use(express.urlencoded({ extends: true })); // permite extraer la peticion post que viene en json
app.use(morgan("dev"));
//cargar un archivo estatico
app.use(express.static(path.join(__dirname, "../public")));

//rutas
app.use("/apicafe", productoRouter);
