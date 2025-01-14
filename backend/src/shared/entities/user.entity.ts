export interface UserPrimitive {
  id: number;
  name: string;
  lastname?: string;
  tax?: string;
  email: string;
  active: boolean;
}

export class User {
  private attributes: UserPrimitive;

  constructor(readonly user: UserPrimitive) {
    this.attributes = user;
  }

  static create(user: Partial<UserPrimitive>): User {
    return new User({
      id: user.id,
      name: user.email,
      email: user.email,
      tax: user.tax,
      active: user.active,
    });
  }

  toPrimitive(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      active: this.attributes.active,
    };
  }

  static fromArray(users: Array<UserPrimitive>): Array<User> {
    return users.map((user) => new User(user));
  }

  get values() {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      active: this.attributes.active,
    };
  }
}
