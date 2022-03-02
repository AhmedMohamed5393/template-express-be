import { TemplateRepository } from "./templateRepository";
import { ITemplateRepository } from "../models/interfaces/classes/ITemplateRepository";
export class RepositoriesFactory {
    constructor() {
        this.repositoriesMap = new Map<string, ITemplateRepository>();
        this.createRepositories();
    }
    private repositoriesMap: Map<string, ITemplateRepository>;
    private static instance: RepositoriesFactory;
    public static get Instance() {
        return RepositoriesFactory.instance || (RepositoriesFactory.instance = new RepositoriesFactory());
    }
    public getRepository(repositoryName: string) { return this.repositoriesMap.get(repositoryName); }
    private createRepositories() { this.repositoriesMap.set(TemplateRepository.name, new TemplateRepository()); }
}
