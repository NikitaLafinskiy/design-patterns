interface Product {
  price?: number;
  getPrice(): number;
  name?: string;
  id?: number;
}

class Phone implements Product {
  price: number;
  name: string;
  id: number;

  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }

  getPrice(): number {
    return this.price;
  }
}

class Laptop implements Product {
  price: number;
  name: string;
  id: number;

  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }

  getPrice(): number {
    return this.price;
  }
}

class CompositeProduct implements Product {
  children: Product[];

  constructor(children?: Product[]) {
    this.children = children !== undefined ? children : [];
  }

  add(product: Product): Product[] {
    this.children.push(product);
    return this.children;
  }

  remove(product: Product): Product[] | string {
    const productToRemove = this.children.find((productFromChildren) => {
      productFromChildren.id === product.id;
    });
    if (productToRemove) {
      this.children.splice(this.children.indexOf(productToRemove), 1);
      return this.children;
    } else {
      return "Child not found";
    }
  }

  getPrice(): number {
    let price = 0;
    for (let i = 0; i < this.children.length; i++) {
      price += this.children[i].getPrice();
    }
    return price;
  }
}

const compositeProductInstance = new CompositeProduct();
compositeProductInstance.add(new Phone("iPhone", 1000, 1));
compositeProductInstance.add(new Laptop("macbook", 10000, 2));

console.log(`The current price is: ${compositeProductInstance.getPrice()}`);
