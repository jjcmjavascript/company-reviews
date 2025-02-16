export interface ReportedCompanyPrimitive {
  id: number;
  name: string;
  tax?: string;
  description?: string;
  imageUrl?: string;
  createdAt?: Date;
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
      imageUrl: company.imageUrl,
      tax: company.tax,
      createdAt: company.createdAt,
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
