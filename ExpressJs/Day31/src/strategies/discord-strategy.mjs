import passport from "passport";
import {Strategy} from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord_user.mjs";

export default passport.use(
    new Strategy({
        clientID: "1392149637258805280",
        clientSecret: "mdYT9GuwxQPtYsAuhWMH7vICerOQGdg-",
        callbackURL: "http://localhost:3000/api/auth/discord/redirect",
        scope: ["identify", "guilds", "email"],
    }, 
    async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            findUser = await DiscordUser.findOne({ discordID: profile.id});
        } catch (err) {
            return done(err, null);
        }

        try {
            if (!findUser) {
                const newUser = new DiscordUser({
                    username: profile.username,
                    discordID: profile.id,
                });
                const newSavedUser = await newUser.save();
                return done(null, newSavedUser);
            }
            return done(null, findUser);
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    }
));