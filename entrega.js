class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // ID autoincrementable
  }

  // Agregando un nuevo producto
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
      throw new Error("Error. Los campos son obligatorios.");
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error("Ya existe un producto con el mismo código.");
    }

    const product = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
  }

  // Eliminar un producto por su nombre
  removeProduct(code) {
    this.products = this.products.filter((product) => product.code !== code);
  }

  // Actualizar la información de un producto por su código
  updateProduct(code, updatedProduct) {
    this.products = this.products.map((product) =>
      product.code === code ? { ...product, ...updatedProduct } : product
    );
  }

  // Obtener un producto por su código
  getProductByCode(code) {
    return this.products.find((product) => product.code === code);
  }

 // producto por su ID
  getProductById(id) {
  const product = this.products.find((product) => product.id === id);
  if (!product) {
    console.error("Not Found");
  }
  return product;
}

  // Obtener todos los productos
  getAllProducts() {
    return this.products;
  }
}

const productManager = new ProductManager();
productManager.addProduct("Producto prueba", "Producto de prueba", 200.00, "Sin Imagen", "abc123", 25);

console.log(productManager.getAllProducts());