export interface IRepository {
    findOne(requestObject: any): any;
    findById(id: any): any;
    findAll(): any[];
    create(requestObject: any): any;
    update(id: string, requestObject: any): any;
    delete(): any;
}
