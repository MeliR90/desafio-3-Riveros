const fs = require("fs").promises

class ProductManager {

    static lastId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }


    async addProduct(nuevoObjeto) {
        let { title, description, price, image, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !image || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        const newProduct = {

            id: ++ProductManager.lastId,
            title,
            description,
            price,
            image,
            code,
            stock
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductsById(id) {

        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("Producto encontrado: ");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

        return product;
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Error al leer un archivo", error);

        }
    }

    async guardarArchivo(arrayProductos) {
        try {

            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));

        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id, productoActualizado) {

        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("No se encontro el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);

        }


    }

    async deleteProductById(id) {

        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
                console.log("Producto eliminado");
            } else {
                console.log("No se encontro el producto");
            }

        } catch (error) {
            console.log("Error al borrar el producto", error);

        }


    }

}


//Testing

//1) 

const manager = new ProductManager("./src/productos.json");

//2)

manager.getProducts();

//3)

//const arroz = {
//    title: "arroz",
//    description: "no se pasan",
//    price: 500,
//   image: "sin imagen",
//   code: "abc123",
//   stock: 30
//}

//manager.addProduct(arroz);

//4)

//const aceite = {

//    title: "aceite",
//    description: "puro de girasol",
//  price: 900,
//    image: "sin imagen",
//    code: "abc124",
//   stock: 30
//}

//manager.addProduct(aceite);

//const fideos = {

//   title: "fideos",
//    description: "Los más ricos",
//    price: 500,
//    image: "sin imagen",
//    code: "abc125",
//    stock: 30
//}

//manager.addProduct(fideos);

//manager.getProducts();

//5)

//async function testeamosBusquedaPorId() {
//    const buscado = await manager.getProductsById(1);
//    console.log(buscado);
//}

//testeamosBusquedaPorId();


//6)

//const aceiteOliva = {
//  id: 1,
//title: "Aceite de Oliva",
//description: "Oliva extra virgen",
//price: 1500,
//image: "sin imagen",
//code: "abc123",
//stock: 30
//};

//async function testeamosActualizar(){
//    await manager.updateProduct(1, aceiteOliva);
//}

//testeamosActualizar();


//7)

//async function testeamosDeleteProduct(){
////  await manager.deleteProductById(2);
//}

//testeamosDeleteProduct();

//manager.deleteProductById(2);

module.exports = ProductManager;