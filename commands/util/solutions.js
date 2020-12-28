const { Command } = require("discord.js-commando");
const { MessageEmbed } = require('discord.js');

module.exports = class SolutionsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "solutions",
            aliases: ["solution", "fap"],
            group: "util",
            memberName: "test_server",
            description: "Creates the test server template",
            throttling: {
                usages: 2,
                duration: 40
            }
        });
    };

    async run(message) {
        let args = message.argString.split(" ");
        if (!args[1]) {
            sendSolutions(message.channel);
        } else {
            switch (args[1].toLowerCase().trim()) {
                case 'colour_codes':
                case 'color_codes':
                    sendColourCodes(message.channel);
                    break;
                case '.project':
                    sendDotProject(message.channel);
                    break;
                case 'datagen':
                    sendDatagen(message);
                    break;
                case 'intellij_gradle':
                    sendIntellijGradle(message.channel);
                    break;
                case 'transparent_block':
                case 'transparency':
                    sendTransparency(message.channel);
                    break;
                case 'tooltips':
                case 'tooltip':
                    sendTooltip(message.channel);
                    break;
                case 'block_place':
                case 'place_block':
                    sendBlockPlace(message.channel);
                    break;
                case 'long_transparency':
                case 'extended_transparency':
                case 'xray':
                case 'transparency_long':
                case 'transparency_extended':
                case 'transparency_extension':
                    sendTransparencyLong(message.channel);
                    break;
                case 'latest.log':
                    sendLatestDotLog(message.channel);
                    break;
                default:
                    message.channel.send(`${args[1]} is an invalid solution`);
                    break;
            }
        }
    }
}

function sendSolutions(channel) {
    let solutions = ['colour_codes', '.project', 'datagen', 'intellij_gradle', 'transparency', 'tooltip', 'block_place',
        'transparency_long', 'latest.log', 'java_issues', '.get()', 'mappings_bot', 'intellij_shortcuts', 'eclipse_shortcuts', 'naming_conventions',
        'github', 'action_result_type', 'durability_craft', 'join_first', 'better_trees', 'recipe_matching', 'foliage_placer', '1.16_oregen',
        '3d_armor', 'data_pack_gen', 'missing_license', 'missing_parameters', 'no_protocol', 'obj_not_present', 'gradle_daemon', 'intellij_classpath',
        'resource_location', '.ds_store', 'update_errors', 'events'];

    channel.send("**Available Solutions:** `" + solutions.join('`, `') + '`');
}

function sendLatestDotLog(channel) {
    channel.send({
        embed: {
            "title": "latest.log",
            "description": "To solve the majority of your problems, you will want to go ahead and open the `latest.log`(found in rootfolder/run/logs/latest.log), and give it a good read.\n\n In here you will find texture issues, model issues, blockstate issues, json parsing issues, toml parsing issues, the stacktrace to any runtime errors that are not logical, and much much more. Please give this a read before asking for help with a problem. \n\nIf you can't find anything in the log, send it to us with one of the following sites:\n[hastebin](<https://www.hastebin.com>) - Free: 400KB\n[hatebin](<https://www.hatebin.com>) - Free: 50,000 char limit\n[gist.github](<https://gist.github.com>) - Free(membership required): 100MB\n[paste.ee](<https://paste.ee>) - Free: 1MB, Member: 6MB\n[paste.gg](<https://paste.gg>) - Free: 15MB\n[pastebin](<https://www.pastebin.com>) - Free: 512KB, Paid: 10MB"
        }
    });
}

function sendTransparencyLong(channel) {
    let embed = new MessageEmbed()
        .setColor('0xF2F2F2')
        .setTitle("A fully detailed explaination on transparency")
        .setDescription("Note: In order for all this to work, make sure you have the latest mappings for your version!!")
        .addField("Pixels less than 10% opacity?", "You need to use `getCutout()` if you have pixels in your texture that are less than 10% opacity.", false)
        .addField("Pixels more than 10% opacity?", "You need to use `getTranslucent()` if you have pixels in your texture than are higher than 10% opacity.", false)
        .addField("Don't render connected side's faces?", "If you want your block to behave like glass, and therefore not render the sides of the block if there is an adjacent glass block, then you need to override `isSideInvisible`. The return statement for this method can be found in the `BreakableBlock` class.")
        .addField("Strange x-ray glitch?", "If you are having weird x-ray glitches, make sure you add `.notSolid()` onto the block's properties.")
        .setFooter("Credits to: SapFireMC#3364", 'https://cdn.discordapp.com/avatars/173952257635778560/92311c310d0c4edd0a0bb15d44965c95.png?size=128');
    channel.send({ embed: embed });
}

function sendBlockPlace(channel) {
    let embed = new MessageEmbed()
        .setTitle("Ghost block when opening container with block in hand")
        .setDescription("**When opening your container with a block in your hand, you experience an issue where it places the block for a split second.**\n\n**How to fix:**\nYou can fix this issue by going into your `onBlockActivated` method, and making sure you return the same action result every time. You should always be returning `ActionResultType.SUCCESS` in this specific instance.\n\n**Why does this happen?**\nThe reason this is happening is because of the server side check that you are doing to open the GUI. You are then retuning `SUCCESS` on the server and `FAIL` on the client. Tis means that the client will try to use the held item, since it is being told you were unable to complete the action. Whereas the server knows that you succeded. This means the client will render the block, but only for a split second since the server is denying the placement.");
    channel.send({ embed: embed });
}

function sendTransparency(channel) {
    let embed = new MessageEmbed()
        .setTitle("Blocks with non-opaque pixels")
        .setDescription(`If you want to add a block which has transparency/invisible pixels you must add this line to your \`FMLClientSetupEvent\`:\n
        \`\`\`java\nRenderTypeLookup.setRenderLayer(YourBlocksListClass.YourBlock.get(), RenderType.getCutout());\`\`\`\n
        Instead of \`getCutout()\` there are also other options such as \`getTranslucent()\` which you can use for other cases!`)
        .setFooter("Note: For this to work, your block cannot extend ContainerBlock(which you shouldn't be doing nevertheless).");
    channel.send({ embed: embed });
}

function sendTooltip(channel) {
    let embed = new MessageEmbed()
        .setTitle("Adding tooltips to your items")
        .setDescription(`In order to add a tooltip to your item or block item, you must override the \`addInformation\` method.`)
        .addField("An example of a simple tooltip is as follows:", "```java\n@Override\npublic void addInformation(ItemStack stack, World worldIn, List<ITextComponent> tooltip, ITooltipFlag flagIn) {\n    tooltip.add(new StringTextComponent(\"Hold \" + \"\\u00A7e\" + \"Shift\" + \"\\u00A77\" + \" for More Information\"));\n    //\"\\u00A7e\" is a colour code\n    //\"\\u00A77\" is a colour code\n}```", false)
        .addField("An example of a more advanced tooltip is as follows:", "```java\n@Override\npublic void addInformation(ItemStack stack, World worldIn, List<ITextComponent> tooltip, ITooltipFlag flagIn) {\n    if(InputMappings.isKeyDown(Minecraft.getInstance().getMainWindow().getHandle(), GLFW.GLFW_KEY_LEFT_SHIFT)) {\n        tooltip.add(new StringTextComponent(\"This is a more advanced description\"));\n    } else {\n        tooltip.add(new StringTextComponent(\"Hold \" + \"\\u00A7e\" + \"Shift\" + \"\\u00A77\" + \" for More Information\"));\n        //\"\\u00A7e\" is a color code\n        //\"\\u00A77\" is a color code\n    }\n}```", false);
    channel.send({ embed: embed });
}

function sendColourCodes(channel) {
    let embed = new MessageEmbed()
        .setTitle("Minecraft Colour Codes")
        .setImage('https://i.postimg.cc/mkrjTpxr/colour-codes.png');
    channel.send({ embed: embed });
}

function sendDotProject(channel) {
    let embed = new MessageEmbed()
        .setTitle("'Open Project' has encountered a problem.")
        .setDescription("If you recieve the following error, this usually means you are either missing the '.project' file, or it is corrupted. To fix this, you can run `gradlew cleanEclipse&&gradlew cleanCache&&gradlew genEclipseRuns --refresh-dependencies&&gradlew eclipse`")
        .setImage('https://i.postimg.cc/G2xgLsHX/124.jpg');
    channel.send({ embed: embed });
}

function sendIntellijGradle(channel) {
    let embed = new MessageEmbed()
        .setTitle("IntelliJ Gradle Settings")
        .setDescription("If you use IntelliJ, you might have to set the Gradle Settings from 'default' to 'IntelliJ IDEA' for the Gradle to work properly")
        .setImage('https://i.postimg.cc/1tQ0NPNw/image.png');
    channel.send({ embed: embed });
}

function sendDatagen(message) {
    let args = message.argString.split(" ");
    let datagenEmbed = {
        "fields": [
            {
                "name": "The build.gradle - In your build.gradle you will find 'data' sections for each run, you need to first change that to the following.",
                "value": "```gradle\ndata {\n            workingDirectory project.file('run')\n\n            // Recommended logging data for a userdev environment\n            property 'forge.logging.markers', 'SCAN'\n\n            // Recommended logging level for the console\n            property 'forge.logging.console.level', 'debug'\n\n            args '--mod', 'YOUR_MODID', '--all', '--output', file('src/generated/resources/'), '--existing', sourceSets.main.resources.srcDirs[0]\n            \n            mods {\n                YOUR_MODID{\n                    source sourceSets.main\n                }\n            }```\nYou will have to replace `YOUR_MODID` with your modid. Once you have done that, you will want to go ahead and run the `gradlew genEclipseRuns --refresh-dependencies` or `gradlew genIntellijRuns --refresh-dependencies`.", "inline": false
            }, {
                "name": "Then you will need the class that handles/registers the datagen. Here is an example:",
                "value": "<https://pastebin.com/rru3Ccqf>", "inline": false
            }, {
                "name": "Then you will need a class for each generator. Here is an example for the language generation:",
                "value": "```java\npublic class LanguagesDataGen extends LanguageProvider\n{\n    public LanguagesDataGen(DataGenerator gen, String locale)\n    {\n        super(gen, Reference.MOD_ID, locale);\n    }\n\n    @Override\n    protected void addTranslations()\n    {\n        add(\"itemGroup.items\", \"Airplanes Item\");\n        add(\"itemGroup.vehicles\", \"Airplanes Vehicles\");\n    }\n    \n    @Override\n    public String getName()\n    {\n        return \"Airplanes Mod Languages\";\n    }\n}```", "inline": false
            }, {
                "name": "Here is an example for Item Tags:",
                "value": "```java\npublic class ItemTagsDataGen extends ItemTagsProvider\n{\n    public ItemTagsDataGen(DataGenerator generatorIn)\n    {\n        super(generatorIn);\n    }\n\n    @Override\n    protected void registerTags()\n    {    \n        //ingots\n        addForgeTag(\"ingots/aluminum\", ItemInit.ALUMINUM_INGOT.get());\n        addForgeTag(\"ingots/copper\", ItemInit.COPPER_INGOT.get());\n    }\n    \n    private void addForgeTag(String name, Item... items)\n    {\n        AirplanesMod.LOGGER.debug(\"Creating item tag for forge:\" + name);\n        ResourceLocation loc = new ResourceLocation(\"forge\", name);\n        getBuilder(new Tag<Item>(loc)).replace(false).add(items).build(loc);\n    }\n\n    @Override\n    public String getName()\n    {\n        return \"Item Tags\";\n    }\n}```", "inline": false
            }, {
                "name": "Finally, you just need to enter the gradle tab in your IDE and run the `runData` task. alternatively, you can just run `gradlew runData` in your terminal.",
                "value": "The JSONs will then be generated in src/generated. Just make sure to refresh the folder if you are checking it in your IDE.", "inline": false
            }
        ],
        "title": "For Forge 1.13+, here is how you can automatically generate your jsons.",
        "description": "This is for block states, item models, lang files, loot tables, recipes and tags. However, following the same technique, you can do it for other things too. For 1.16.2+ you can also use this for biomes, surface builders, chunk generators and more.",
        "color": 22747,
        "author": {
            "icon_url": message.author.avatarURL(),
            "name": `Sent by ${message.author.username}`
        },
        "footer": {
            "icon_url": "https://cdn.discordapp.com/avatars/406870590922686464/58c3a548e0020f2df3fb3325c6de3d69.png?size=128",
            "text": "Credits to: Affehund#9883"
        }
    }

    if (!message.mentions.users.first() && !args[2]) {
        message.author.send({
            embed: datagenEmbed
        }).catch(error => {
            message.channel.send("Unable to send you private messages, maybe you have DMs disabled?");
        });
    } else {
        if (args[2] && message.mentions.users.first()) {
            message.mentions.users.first().send({
                embed: datagenEmbed
            }).catch(error => {
                message.channel.send("Unable to send you private messages, maybe you have DMs disabled?");
            });
        } else if (args[2]) {
            message.channel.send("Please ping a valid user!");
        }
    }
}