interface Pizza {
  toppings: string[];
  price: number;
  getPrice(): number;
  addTopping(...items: string[]): string[];
}

class PizzaBase implements Pizza {
  toppings: string[] = ["bread"];
  price: number = 5;

  constructor(toppings?: string[], price?: number) {
    this.toppings = toppings ? toppings : ["bread"];
    this.price = price ? price : 5;
  }

  getPrice(): number {
    return this.price;
  }

  addTopping(...items: string[]): string[] {
    for (let i = 0; i < items.length; i++) {
      this.toppings.push(items[i]);
    }

    return this.toppings;
  }
}

class BasePizzaDecorator implements Pizza {
  pizzaDecorator: Pizza;
  toppings: string[];
  price: number;

  constructor(pizzaDecorator: Pizza) {
    this.pizzaDecorator = pizzaDecorator;
    this.toppings = pizzaDecorator.toppings;
    this.price = pizzaDecorator.price;
  }

  getPrice(): number {
    return this.pizzaDecorator.getPrice();
  }

  addTopping(...items: string[]): string[] {
    return this.pizzaDecorator.addTopping(...items);
  }
}

class PizzaWithCheese extends BasePizzaDecorator {
  constructor(pizzaDecorator: Pizza) {
    super(pizzaDecorator);
  }

  getPrice(): number {
    return this.pizzaDecorator.getPrice() + 5;
  }

  addTopping(...items: string[]): string[] {
    return this.pizzaDecorator.addTopping(...items, "cheese");
  }
}

class PizzaWithPepperoni extends BasePizzaDecorator {
  constructor(pizzaDecorator: Pizza) {
    super(pizzaDecorator);
  }

  getPrice(): number {
    return this.pizzaDecorator.getPrice() + 10;
  }

  addTopping(...items: string[]): string[] {
    return this.pizzaDecorator.addTopping(...items, "pepperoni");
  }
}

let margharitta = new PizzaBase();
margharitta = new PizzaWithCheese(margharitta);
console.log(margharitta.getPrice());
let pepperoni = new PizzaWithPepperoni(new PizzaWithCheese(new PizzaBase()));
console.log(pepperoni.getPrice());
console.log(pepperoni.addTopping("pepperoni"));
