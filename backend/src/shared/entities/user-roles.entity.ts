export interface UserRolesPrimitive {
  id: number;
  userId: number;
  name: string;
}

export class UserRoles {
  private attributes: UserRolesPrimitive;

  constructor(readonly userRoles: UserRolesPrimitive) {
    this.attributes = userRoles;
  }

  static create(role: Partial<UserRolesPrimitive>): UserRoles {
    return new UserRoles({
      id: role.id,
      userId: role.userId,
      name: role.name,
    });
  }

  toPrimitive(): UserRolesPrimitive {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      name: this.attributes.name,
    };
  }
  get values() {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      name: this.attributes.name,
    };
  }
}
