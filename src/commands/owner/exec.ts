import settings from "../../settings";
import { exec } from "child_process";
import { CommandContext, CommandOptionType, SlashCommand, SlashCreator } from "slash-create";

export default class ExecCommand extends SlashCommand {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "exec",
            description: "Execute shell commands",
            guildIDs: settings.devGuildID,
            defaultPermission: false,
            options: [
                {
                    type: CommandOptionType.STRING,
                    name: "command",
                    description: "Command to execute",
                    required: true
                }
            ]
        });
    }

    hasPermission(ctx: CommandContext): string | boolean {
        return ctx.user.id === settings.owner;
    }

    async run(ctx: CommandContext): Promise<void> {
        await ctx.defer();

        exec(ctx.options.command, { maxBuffer: Infinity }, async (error, stdout, stderr) => {
            try {
                if (error) {
                    await ctx.send(`\`\`\`fix\n${error}\n\`\`\``);
                } else if (stderr) {
                    await ctx.send(`\`\`\`fix\n${stderr}\n\`\`\``);
                } else {
                    await ctx.send(`\`\`\`fix\n${stdout}\n\`\`\``);
                }
            } catch (e) {
                await ctx.send(`\`\`\`fix\n${e instanceof Error ? e.stack ? e.stack : e.message : e}\n\`\`\``);
            }
        });
    }
}
