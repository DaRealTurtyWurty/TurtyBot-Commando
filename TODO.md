# New commands

- Unmute command (removes 'Muted' role)
- Warn command (warns will get saved, at 3 warns it will mute for 24 hours, at 5 warns it will kick, at 8 warns it will ban)
- Revoke/Remove Warn command (removes a warn from the user)

# Editing commands

- Make mute command add back muted role if the member leaves and re-joins during the mute (also adds a warn for 'mute evasion')

# Suggestions

- Replying to suggestions (accept/approve, consider/considered, implement/implemented, deny/denied)
- Editing suggestions (only if it has under x amount of reactions)
- Removing suggestions (sets the suggestion number back for all after it - only if it has under x amount of reactions)
- Admin removing/editing suggestions (ignores amount of reactions)

# Solutions

- Event Solution (https://media.discordapp.net/attachments/665281306426474506/665605979798372392/eventhandler.png)
- Ability to submit solution (gets sent to 'dev-chat' channel)

# Saving information

- Poll and suggestion messages being saved (and allowing the bot to still react to their reactions)

# Logging information

- All moderation commands are logged (in 'admin-notices' channel)

# Starboard

- Messages in 'showcases' channel will automatically get a '⭐' reaction from the bot
- Messages with 'configurable' amount of stars (not including the bot) will get sent to 'starboard' channel with a 'jump' link.
- Embeds attachment (video/image/gif/url image or video)
- If message is deleted in 'showcases' (not by a moderator), it will stay in starboard. However if deleted by a moderator (and it knows), then it will be removed from starboard
- 10 stars = 🌟
- 15 stars = ✨
- 20 stars = 💫
- 25 stars = 🌠
- 30 stars = 🤩
- Both messages are saved so that reactions will persist across reloads.
