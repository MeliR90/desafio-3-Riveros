

const ProductManager = require("./product-manager");
const express = require("express");
const PUERTO = 8080;

const manager = new ProductManager("./src/productos.json");


const app = express();


app.get("/products", async(req, res) => {
    try{
        const arrayProductos = await manager.leerArchivo();

        let limit = parseInt(req.query.limit);

        if (limit){

            const arrayconLimite = arrayProductos.slice(0, limit);
            return res.send(arrayconLimite);
        }else {
            return res.send(arrayProductos);
        }

    }catch(error) {
        console.log(error);
        return res.send("Error al procesar la solicitud");
    }
})


app.listen (PUERTO, () => {

    console.log("Escuchando en el puerto 8080");
})