
import { Socket } from "socket.io-client/build/socket";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

export interface IHillProps {
    id: string,
    size: {
        width: number,
        height: number
    },
    points: Array<Array<number>>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}
