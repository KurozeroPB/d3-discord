import { SlashCommand, SlashCreator, CommandContext, ApplicationCommandPermissionType } from "slash-create";
import settings from "~/settings";

export default class LeaveCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "leave",
            description: "Something about this command",
            guildIDs: settings.devGuildID,
            permissions: {
                [settings.devGuildID]: [
                    {
                        type: ApplicationCommandPermissionType.USER,
                        id: settings.owner,
                        permission: true
                    }
                ]
            }
        });
    }

    async run(ctx: CommandContext): Promise<string> {
        await ctx.defer();
        return "Not implemented yet";
    }
}