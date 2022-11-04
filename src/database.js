import mongoose from "mongoose";

//const url = "mongodb://localhost:27017/cafe-sampy"; // bd local 127.0.0.1 = localhost
const url = "mongodb+srv://Agustines82:12345678&A@cluster0.dsouedm.mongodb.net/cafe";

mongoose.connect(url);

const conexion = mongoose.connection;

conexion.once("open", () => {
    console.log("BD conectada");
});
