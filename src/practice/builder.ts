// interface HouseInterface {
//   doors: number;
//   windows: number;
//   size: number[];
//   pool?: boolean;
//   tree?: boolean;
//   bench?: boolean;
// }

// class House implements HouseInterface {
//   doors: number;
//   windows: number;
//   size: number[];
//   pool?: boolean;
//   tree?: boolean;
//   bench?: boolean;

//   constructor(
//     doors: number,
//     windows: number,
//     size: number[],
//     pool?: boolean,
//     tree?: boolean,
//     bench?: boolean
//   ) {
//     this.doors = doors;
//     this.windows = windows;
//     this.size = size;
//     this.pool = pool || false;
//     this.tree = tree;
//     this.bench = bench;
//   }

//   public getInfo() {
//     return `The house has ${this.doors} doors and ${
//       this.windows
//     } windows, it's size is ${this.size}. It also ${
//       this.pool ? "has" : "does not have"
//     } a pool. Tree: ${this.tree}, Bench: ${this.bench}`;
//   }
// }

// class HouseBuilder {
//   doors: number = 0;
//   windows: number = 0;
//   size: number[] = [0, 0];
//   pool: boolean = false;
//   tree: boolean = false;
//   bench: boolean = false;

//   public setDoors(doors: number) {
//     this.doors = doors;
//     return this;
//   }

//   public setWindows(windows: number) {
//     this.windows = windows;
//     return this;
//   }

//   public setSize(size: number[]) {
//     this.size = size;
//     return this;
//   }

//   public setPool(pool: boolean) {
//     this.pool = pool;
//     return this;
//   }

//   public setTree(tree: boolean) {
//     this.tree = tree;
//     return this;
//   }

//   public setBench(bench: boolean) {
//     this.bench = bench;
//     return this;
//   }

//   public build() {
//     return new House(
//       this.doors,
//       this.windows,
//       this.size,
//       this.pool,
//       this.tree,
//       this.bench
//     );
//   }
// }

// const house = new HouseBuilder()
//   .setDoors(4)
//   .setBench(true)
//   .setWindows(2)
//   .build();
// console.log(house.getInfo());
