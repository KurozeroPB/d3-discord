import { CommandContext, SlashCommand, SlashCreator } from "slash-create";

export default class InviteCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "invite",
            description: "Something about this command"
        });
    }

    async run(ctx: CommandContext): Promise<string> {
        await ctx.defer();
        return "Not implemented yet";
    }
}
