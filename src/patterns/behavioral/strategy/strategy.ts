// Context
class DocumentConverter {
  strategy: IConversionStrategy;
  constructor(strategy: IConversionStrategy) {
    this.strategy = strategy;
  }

  convert(value: any) {
    this.strategy.convert(value);
  }
}

// Strategy Interface
interface IConversionStrategy {
  convert(value: any): void;
}

// Concrete Strategies
class XMLConverter implements IConversionStrategy {
  convert(value: any): void {
    console.log(`Converted the value into XML: ${value}`);
  }
}

class JSONConverter implements IConversionStrategy {
  convert(value: any): void {
    console.log(`Converted the value into JSON: ${value}`);
  }
}

class CSVConverter implements IConversionStrategy {
  convert(value: any): void {
    console.log(`Converted the value into csv: ${value}`);
  }
}

const jsonStrategy = new JSONConverter();
const converter = new DocumentConverter(jsonStrategy);

converter.convert("value");
