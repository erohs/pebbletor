
import { Socket } from "socket.io-client/build/socket";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export interface IHillPageProps {
    id: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}
