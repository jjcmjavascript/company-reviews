export interface ReportedCompanyPrimitive {
  id: number;
  name: string;
  tax?: string;
  description?: string;
  image?: string;
}

export class ReportedCompany {
  private attributes: ReportedCompanyPrimitive;

  constructor(readonly company: ReportedCompanyPrimitive) {
    this.attributes = company;
  }

  static create(company: Partial<ReportedCompanyPrimitive>): ReportedCompany {
    return new ReportedCompany({
      id: company.id,
      name: company.name,
      description: company.description,
      image: company.image,
      tax: company.tax,
    });
  }

  toPrimitive(): ReportedCompanyPrimitive {
    return this.attributes;
  }

  static fromArray(
    companies: Array<ReportedCompanyPrimitive>,
  ): Array<ReportedCompany> {
    return companies.map((company) => new ReportedCompany(company));
  }

  get values() {
    return this.attributes;
  }
}
