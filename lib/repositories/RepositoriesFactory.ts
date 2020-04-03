import { CartRepository } from "./CartRepository";
import { IRepository } from "./IRepository";

export class RepositoriesFactory {
    private repositoriesMap: Map<string, IRepository>;
    constructor() {
        this.repositoriesMap = new Map<string, IRepository>();
        this.createRepositories();
    }

    public getRepository(repositoryName: string) {
        return this.repositoriesMap.get(repositoryName);
    }

    private createRepositories() {
        this.repositoriesMap.set(CartRepository.name, new CartRepository());
    }
}
