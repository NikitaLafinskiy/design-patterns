// Component interfaces (abstract components)

// Furniture Interfaces
interface Chair {
  hasLegs(): boolean;
  sitOn(): void;
}

interface Sofa {
  hasLegs(): boolean;
  lieOn(): void;
}

interface Table {
  hasLegs(): boolean;
  placeItems(): void;
}

// Factory Interface
interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createTable(): Table;
}

// Concrete Factories

class VictorianFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }

  createTable(): Table {
    return new VictorianTable();
  }

  createSofa(): Sofa {
    return new VictorianSofa();
  }
}

class ModernFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }

  createTable(): Table {
    return new ModernTable();
  }

  createSofa(): Sofa {
    return new ModernSofa();
  }
}

// Components
class VictorianChair implements Chair {
  hasLegs(): boolean {
    return true;
  }

  sitOn() {
    console.log("Sitting on a victorian chair");
  }
}

class ModernChair implements Chair {
  hasLegs(): boolean {
    return true;
  }

  sitOn() {
    console.log("Sitting on a modern chair");
  }
}

class VictorianSofa implements Sofa {
  hasLegs(): boolean {
    return true;
  }

  lieOn() {
    console.log("Lying on a victorian sofa");
  }
}

class ModernSofa implements Sofa {
  hasLegs(): boolean {
    return true;
  }

  lieOn() {
    console.log("Lying on a modern sofa");
  }
}

class VictorianTable implements Table {
  hasLegs(): boolean {
    return true;
  }

  placeItems(): void {
    console.log("Put an item on a victorian table");
  }
}

class ModernTable implements Table {
  hasLegs(): boolean {
    return true;
  }

  placeItems(): void {
    console.log("Put an item on a modern table");
  }
}

const victorianFactory = new VictorianFactory();
const victorianChair = victorianFactory.createChair();

victorianChair.sitOn();
