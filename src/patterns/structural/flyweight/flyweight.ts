interface ITreeType {
  render(x: number, y: number): string;
}

interface ITree {
  move(x: number, y: number): number[];
  render(): string;
}

interface IForest {
  plantTree(texture: string, variant: string, color: string): ITree[];
  render(): string[];
}

class TreeType implements ITreeType {
  texture: string;
  variant: string;
  color: string;

  constructor(texture: string, variant: string, color: string) {
    this.texture = texture;
    this.variant = variant;
    this.color = color;
  }

  render(x: number, y: number): string {
    return `Rendered a tree texture of ${this.texture} and of variant ${this.variant} of color ${this.color} and it was rendered at location ${x}, ${y}`;
  }
}

class TreeFactory {
  static treeTypes: TreeType[] = [];

  static getTree(texture: string, variant: string, color: string): ITreeType {
    const treeExists = this.treeTypes.find(
      (tree) =>
        tree.color === color &&
        tree.variant === variant &&
        tree.texture === texture
    );
    if (!treeExists) {
      const newTree = new TreeType(texture, variant, color);
      this.treeTypes = [...this.treeTypes, newTree];
      return newTree;
    }

    return treeExists;
  }
}

class Tree implements ITree {
  x: number;
  y: number;
  treeType: ITreeType;

  constructor(x: number, y: number, treeType: ITreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  move(x: number, y: number): number[] {
    this.x = this.x + x;
    this.y = this.y + y;

    return [this.x, this.y];
  }

  render(): string {
    return this.treeType.render(this.x, this.y);
  }
}

class Forest implements IForest {
  trees: ITree[];

  constructor(trees?: ITree[]) {
    this.trees = trees ? trees : [];
  }

  plantTree(texture: string, variant: string, color: string): ITree[] {
    const treeType = TreeFactory.getTree(texture, variant, color);
    const tree = new Tree(0, 0, treeType);
    this.trees = [...this.trees, tree];
    return this.trees;
  }

  render(): string[] {
    let treesRendered = [];
    for (let i = 0; i < this.trees.length; i++) {
      treesRendered.push(this.trees[i].render());
    }

    return treesRendered;
  }
}

const forest = new Forest();

forest.plantTree("texture_1", "1", "green");
forest.plantTree("texture_1", "2", "green");

const renderedTrees = forest.render();

renderedTrees.forEach((tree) => {
  console.log(tree);
});

console.log(TreeFactory.treeTypes);
