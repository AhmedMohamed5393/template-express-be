import { ServiceConfig } from "./config";
import { Service } from "./service";
import MiddlewareFactory from "./utils/middlewares/MiddlewareFactory";
class ServiceFactory {
    public static getConfig() { return new ServiceConfig(); }
    public static createModule() { return new Service(); }
    public static createMiddlewareFactory() { return new MiddlewareFactory(); }
}
export { ServiceConfig, Service, MiddlewareFactory };
export default ServiceFactory;
