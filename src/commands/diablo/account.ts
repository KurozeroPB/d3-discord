import { CommandContext, SlashCommand, SlashCreator } from "slash-create";

export default class AccountCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "account",
            description: "Something about this command"
        });
    }

    async run(ctx: CommandContext): Promise<string> {
        await ctx.defer();
        return "Not implemented yet";
    }
}
