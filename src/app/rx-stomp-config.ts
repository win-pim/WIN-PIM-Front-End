import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from '../environments/environment';

export const RxStompConfig: InjectableRxStompConfig = {
  brokerURL: environment.wsUrl,
};
