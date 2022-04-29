import Configs from "../../models/Config";
import Embed from "../../utils/Embed";
import Guilds from "../../models/Guild";
import Lilith from "../../utils/Lilith";
import settings from "../../settings";

import { CommandContext, CommandOptionType, SlashCommand, SlashCreator } from "slash-create";

export default class LeaveCommand extends SlashCommand<Lilith> {
    constructor(creator: SlashCreator) {
        super(creator, {
            name: "leave",
            description: "[Bot Owner Only] Make the bot leave a guild",
            guildIDs: settings.devGuildID,
            defaultPermission: false,
            requiredPermissions: [
                "SEND_MESSAGES"
            ],
            options: [
                {
                    type: CommandOptionType.NUMBER,
                    name: "id",
                    description: "Guild ID",
                    required: true
                },
                {
                    type: CommandOptionType.BOOLEAN,
                    name: "blacklist",
                    description: "Add guild id to blacklist",
                    required: true
                }
            ]
        });
    }

    hasPermission(ctx: CommandContext): string | boolean {
        return ctx.user.id === settings.owner;
    }

    async run(ctx: CommandContext): Promise<void> {
        ctx.defer();

        const guild = this.client.guilds.get(ctx.options.id);
        if (guild) {
            if (ctx.options.blacklist) {
                await Configs.findOneAndUpdate({ name: "blacklist" }, { $push: { guilds: ctx.options.id } }, { new: true }).exec();
            }
            await guild.leave();
            await Guilds.findOneAndDelete({ uid: ctx.options.id }).exec();
            await Embed.Success(ctx, `✅ Left guild **${guild.name}**`);
        } else {
            await Embed.Danger(ctx, `❌ Could not find guild with id **${ctx.options.id}**`);
        }
    }
}
