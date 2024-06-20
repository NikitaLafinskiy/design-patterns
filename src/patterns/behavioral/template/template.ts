// Abstract class (the template)
interface InterfaceAI {
  takeTurn(): void;
  collectResources(resources: string[]): void;
  attack(target: AI): void;
  raid(targets: AI[]): void;
  build(): void;
}

abstract class AI {
  abstract aiClass: string;
  abstract weapon: string;
  abstract structure: string;
  takeTurn(resources: string[], targets?: AI[]): void {
    this.collectResources(resources);
    this.build();
    targets && this.raid(targets);
  }

  collectResources(resources: string[]): void {
    for (let i = 0; i < resources.length; i++) {
      console.log(`${resources[i]} collected by a ${this.aiClass}`);
    }
  } // implemented for each of the classes from the start

  raid(targets: AI[]): void {} // hook (does not have to be implemented)

  abstract attack(target: AI): void;

  abstract build(): void; // abstract method, implemented by each class separately
}

// Concrete classes
class HumanAI extends AI {
  aiClass = "human";
  weapon = "sword";
  structure = "fort";

  build() {
    console.log(`A ${this.aiClass} builds a strong ${this.structure}`);
  }

  attack(target: AI) {
    console.log(
      `The ${this.aiClass} has attacked the ${target.aiClass} with a ${this.weapon}`
    );
  }
}

class MonsterAI extends AI {
  aiClass = "monster";
  weapon = "stick";
  structure = "pit";

  build() {
    console.log(`A ${this.aiClass} has built a ${this.structure}`);
  }

  raid(targets: AI[]) {
    for (let i = 0; i < targets.length; i++) {
      this.attack(targets[i]);
      console.log(`${targets[i].aiClass} is attacking in return!`);
      targets[i].attack(this);
    }
  }

  attack(target: AI) {
    console.log(
      `The ${this.aiClass} has attacked the ${target.aiClass} with a ${this.weapon}`
    );
  }
}

const monster = new MonsterAI();

const human = new HumanAI();
const human2 = new HumanAI();
const human3 = new HumanAI();

const humans = [human, human2, human3];

for (let i = 0; i < humans.length; i++) {
  humans[i].takeTurn(["stones", "wood"]);
}

monster.takeTurn(["sticks", "apples", "dirt"], humans);
