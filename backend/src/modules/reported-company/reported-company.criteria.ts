export class ReportedCompanyCriteriaWhereLikeName {
  constructor(private readonly name: string) {}

  async apply() {
    return {
      name: {
        contains: this.name,
        mode: 'insensitive',
      },
    };
  }
}

export class ReportedCompanyCriteriaWhereIn {
  constructor(
    private readonly key: string,
    private readonly values: (string | number)[],
  ) {}

  async apply() {
    return {
      [this.key]: {
        in: this.values,
      },
    };
  }
}
