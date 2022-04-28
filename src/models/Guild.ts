import Guild from "../types/db/Guild";

import { Document, Model, Schema, model } from "mongoose";

export interface GuildModel extends Guild, Document {}

const GuildSchema = new Schema<GuildModel>({
    uid: { unique: true, type: String }
});

export const Guilds: Model<GuildModel> = model<GuildModel>("Guild", GuildSchema);

export default Guilds;
