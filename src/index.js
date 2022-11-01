import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import productoRouter from './routes/productos.routes'
//llamar a la conexion a la BD
import './database'

//crear una instancia de express
const app = express();
//configurar un puerto
app.set('port', process.env.PORT || 4000);

app.listen( app.get('port'), ()=>{
    console.log('Estoy en el puerto '+app.get('port'))
})

//midlewares: funciones que se ejecutan antes de las rutas
app.use(cors()); //permite conexiones remotas
//permiten interpretar el formato json
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(morgan('dev'));
//cargar un archivo estatico
app.use(express.static(path.join(__dirname,'../public')));
// console.log(path.join(__dirname,'../public'));

//rutas
//http://localhost:4000/apicafe/prueba
app.use('/apicafe', productoRouter)