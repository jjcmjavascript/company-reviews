export interface TypePrimitive {
  id: number;
  name: string;
  description?: string;
}

export class Type {
  private attributes: TypePrimitive;

  constructor(readonly type: TypePrimitive) {
    this.attributes = type;
  }

  static create(type: Partial<TypePrimitive>): Type {
    return new Type({
      id: type.id,
      name: type.name,
      description: type.description,
    });
  }

  toPrimitive(): TypePrimitive {
    return this.attributes;
  }

  static fromArray(types: Array<TypePrimitive>): Array<Type> {
    return types.map((type) => new Type(type));
  }

  get values() {
    return this.attributes;
  }
}