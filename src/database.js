import mongoose from "mongoose";

//const url = 'mongodb://localhost:27017/cafecito-c8i'; // BD local
const url = 'mongodb+srv://tomaslu99:41763323@cluster0.4dnaj80.mongodb.net/cafecito-c8i';


mongoose.connect(url);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{
    console.log('BD conectada');
})