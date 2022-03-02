import { TemplateRepository } from "../repositories/templateRepository";
import { ITemplateRepository } from "../models/interfaces/classes/ITemplateRepository";
import { RepositoriesFactory } from "../repositories/RepositoriesFactory";
import { ITemplateService } from "../models/interfaces/classes/ITemplateService";
import { getLogger } from "../../shared/getLogger";
const TAG = "template-express:template:templateService";
export class TemplateService implements ITemplateService {
    private repository: ITemplateRepository;
    private repositoriesFactory: RepositoriesFactory;
    constructor(repository?: ITemplateRepository) {
        if (!repository) {
            this.repositoriesFactory = RepositoriesFactory.Instance;
            this.repository = this.repositoriesFactory.getRepository(TemplateRepository.name);
        } else this.repository = repository;
    }
}
