import { Providers } from "src/utils/constants";
import { GatewaySessionManager } from "./gateway.session";


export const gatewayProviders = [{
        provide: Providers.GATEWAY_SESSION_MANAGER,
        useClass: GatewaySessionManager,
}];