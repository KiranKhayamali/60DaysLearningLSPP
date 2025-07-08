import passport from "passport";
import {Strategy} from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord_user.mjs";

passport.serializeUser((user, done) => { //serialize user into session data
    console.log("Inside serialize user");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize");
    console.log(`Deserializing ID: ${id}`);
    try {
        const findUser = await DiscordUser.findById(id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

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