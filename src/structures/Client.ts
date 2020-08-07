import Collection from "@kurozero/collection";
import Command from "../Command";
import settings from "../settings";
import axios from "axios";
import { Client, ClientOptions } from "eris";
import { ICommandStats } from "../types/Options";

const hours = 0.5;

function requestToken(client: Lilith): void {
    axios
        .get("https://us.battle.net/oauth/token", {
            params: {
                client_id: settings.battlenet.id,
                client_secret: settings.battlenet.secret,
                grant_type: "client_credentials"
            }
        })
        .then((response) => {
            switch (response.data.token_type) {
                case "bearer":
                    client.expiresIn = response.data.expires_in;
                    client.token = response.data.access_token;
                    client.lastRequest = Date.now();
                    break;
                default:
                    break;
            }
        })
        .catch(console.error);
}

export default class Lilith extends Client {
    commands: Collection<Command>;
    ready = false;
    stats: ICommandStats;

    token?: string;
    expiresIn?: number;
    lastRequest?: number;

    constructor(token: string, options: ClientOptions) {
        super(token, options);

        this.commands = new Collection(Command);
        this.stats = {
            commandsExecuted: 0,
            messagesSeen: 0,
            commandUsage: {}
        };

        // Request access token
        requestToken(this);

        // Access token expires after 24 hours so check if it's still valid
        // If not valid request new token
        setInterval(() => {
            if (this.lastRequest && this.expiresIn) {
                if (this.lastRequest - Date.now() > this.expiresIn) {
                    console.log("requesting new token");
                    requestToken(this);
                }
            }
        }, hours * 60 * 60 * 1000);
    }
}
