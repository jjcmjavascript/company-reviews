export class BaseRespositoryService<T> {
  constructor(private readonly repository) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<T> {
    return await this.repository.findOneBy({ id } as any);
  }

  async create(entity: any): Promise<T> {
    return await this.repository.save(entity);
  }

  async update(id: number, entity: any): Promise<T> {
    await this.repository.update(id, entity);

    return this.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
