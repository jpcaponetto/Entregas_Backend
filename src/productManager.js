const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.nextId = 1; // ID autoincrementable
    this.path = path ?? "./products.json";
  }


  async save(data) {  
      const content = JSON.stringify(data, null, "\t");
      try {  
        await fs.promises.writeFileSync(this.path, content, "utf-8");
      } catch (error) {
        console.log(error);
      }
    }
  
  
    async load() {
      try {
        if(fs.existsSync(this.path)){
          const jsonToArray = await fs.promises.readFile(this.path,'utf-8');
          return JSON.parse(jsonToArray);
        } else {
          return "no se encontró el archivo products.json"
        }
      } catch (err) {
        console.log(err);
      }
    }


  // Agregando un nuevo producto
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock === undefined) {
      throw new Error("Error. Los campos son obligatorios.");
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error("Ya existe un producto con el mismo código.");
    }

    const product = {
      id: this.products.length+1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    this.save(this.products);
  }

  // Eliminar un producto por su nombre
  deleteProduct(id) {
    if( this.products.length > 0) {
      this.products = this.products.filter((product) => product.id !== id); // va a aplicar un filtro a los productos, todos los productos menos el que tenga este ID (osea lo va a borrar)
      this.save(this.products);
    } else {
      return "La lista está vacia"
    }
  } 

  // Actualizar la información de un producto por su código
  updateProduct(id, title, description, price, thumbnail, code, stock) {
    if( this.products.length > 0) {
      this.products = this.products.map((product) =>
      product.id === id ? { ...product, title, description, price, thumbnail, code, stock } : product
    );
    this.save(this.products);
    } else {
      return "la lista está vacia"
    }
  }

  // Obtener un producto por su código
  getProductByCode(code) {
    return this.products.find((product) => product.code === code);
  }

 // producto por su ID
  getProductById(id, list) {
  // const product = this.products.find((product) => product.id === id);  No hacemos de esta manera porque
  const product = list.find((product) => product.id === id);
  if (!product) {
    return "El producto no existe";
  }
  return product;
}

  // Obtener todos los productos
  getAllProducts() {
    return this.products;
  }
}

module.exports = ProductManager;