export interface SubTypePrimitive {
  id: number;
  name: string;
  description?: string;
  typeId: number;
  deletedAt: Date;
}

export class SubType {
  private attributes: SubTypePrimitive;

  constructor(readonly subtype: SubTypePrimitive) {
    this.attributes = subtype;
  }

  static create(subtype: Partial<SubTypePrimitive>): SubType {
    return new SubType({
      id: subtype.id,
      name: subtype.name,
      description: subtype.description,
      typeId: subtype.typeId,
      deletedAt: subtype.deletedAt,
    });
  }

  toPrimitive(): SubTypePrimitive {
    return this.attributes;
  }

  static fromArray(subtypes: Array<SubTypePrimitive>): Array<SubType> {
    return subtypes.map((subtype) => new SubType(subtype));
  }

  get values() {
    return this.attributes;
  }
}
