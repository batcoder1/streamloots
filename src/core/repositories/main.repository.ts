interface MainRepository<T> {
  getById(id: string): Promise<T>;
  update(id: string, item: T): Promise<T>;
  create(item: T): Promise<T>;
  getAll(): Promise<T[]>;
}
export default MainRepository;
