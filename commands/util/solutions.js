const { Command } = require("discord.js-commando");
const { MessageEmbed, Message } = require('discord.js');

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
                case '.get':
                case 'registry_object':
                case 'registry_objects':
                case 'deferred_register':
                    sendDotGet(message.channel);
                    break;
                case 'mappings':
                case 'mappings_bot':
                case 'k9':
                case 'forge_bot':
                    sendMappingsBot(message.channel);
                    break;
                case 'intellij_shortcuts':
                case 'intellijank_shortcuts':
                    sendIntelliJShortcuts(message.channel);
                    break;
                case 'eclipse_shortcuts':
                    sendEclipseShortcuts(message.channel);
                    break;
                case 'naming_conventions':
                case 'java_conventions':
                case 'conventions':
                case 'oracle_conventions':
                    sendNamingConventions(message.channel);
                    break;
                case 'github':
                    sendGithub(message.channel);
                    break;
                case 'action_result_type':
                    sendActionResultType(message.channel);
                    break;
                case 'craft_durability':
                case 'crafting_durability':
                case 'craft_damage':
                case 'crafing_damage':
                case 'durability_craft':
                case 'durability_crafting':
                case 'damage_craft':
                case 'damage_crafting':
                    sendDurabilityCrafting(message.channel);
                    break;
                case 'join_first':
                case 'player_join':
                case 'join_player':
                    sendPlayerFirstJoin(message.channel);
                    break;
                case 'better_tree':
                case 'better_trees':
                    sendBetterTrees(message.channel);
                    break;
                case 'recipe_matching':
                case 'matching_recipe':
                case 'recipe_match':
                case 'match_recipe':
                case 'matches_recipe':
                case 'recipe_matches':
                    sendRecipeMatching(message.channel);
                    break;
                case 'register_foliage':
                case 'foliage_register':
                case 'registry_foliage':
                case 'foliage_registry':
                case 'foliage_placer':
                    sendRegisterFoliage(message.channel);
                    break;
                case '1.16_oregen':
                case 'oregen_1.16':
                case '1.16oregen':
                case 'oregen1.16':
                    send116Oregen(message.channel);
                    break;
                case '3d_armor':
                case '3d_armour':
                case 'armor_3d':
                case 'armour_3d':
                case 'model_armor':
                case 'armor_model':
                case 'model_armour':
                case 'armour_model':
                    send3DArmor(message.channel);
                    break;
                case 'datapack':
                case 'datapack_gen':
                case 'data_pack_gen':
                case 'gen_datapack':
                case 'misode':
                    sendDataPackGen(message.channel);
                    break;
                case 'license':
                case 'license_missing':
                case 'missing_license':
                    sendMissingLicense(message.channel);
                    break;
                case 'missing_parameters':
                case 'biome_parameters':
                    sendMissingParameters(message.channel);
                    break;
                case 'no_protocol':
                case 'empty_url':
                    sendNoProtocol(message.channel);
                    break;
                case 'not_present':
                case 'not_registered':
                case 'obj_not_present':
                    sendRegistryNotPresent(message.channel);
                    break;
                case 'gradle_daemon':
                    sendGradleDaemon(message.channel);
                    break;
                case 'intellij_classpath':
                case 'classpath':
                case 'classpath_intellij':
                    sendIntellijClasspath(message.channel);
                    break;
                case 'resource_location':
                case 'non_a-z':
                    sendResourceLocation(message.channel);
                    break;
                case '.ds_store':
                case 'ds_store':
                    sendDSStore(message.channel);
                    break;
                case 'update_errors':
                case 'mappings_errors':
                    sendUpdateErrors(message.channel);
                    break;
                case 'keybinds':
                case 'keybinding':
                case 'keybind':
                    sendKeybinds(message.channel);
                    break;
                case 'glfw_error':
                    sendGLFWError(message.channel);
                    break;
                case 'community_wiki':
                case 'community_docs':
                case 'wiki_community':
                case 'docs_community':
                    sendCommunityWiki(message.channel);
                    break;
                case 'render_text':
                    sendRenderText(message.channel);
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
        'transparency_long', 'latest.log', '.get', 'mappings_bot', 'intellij_shortcuts', 'eclipse_shortcuts', 'naming_conventions',
        'github', 'action_result_type', 'durability_craft', 'join_first', 'better_trees', 'recipe_matching', 'register_foliage', '1.16_oregen',
        '3d_armor', 'data_pack_gen', 'missing_license', 'missing_parameters', 'no_protocol', 'obj_not_present', 'gradle_daemon', 'intellij_classpath',
        'resource_location', '.ds_store', 'update_errors', 'keybinds', 'glfw_error', 'community_wiki', 'events', 'render_text'];

    channel.send("**Available Solutions:** `" + solutions.join('`, `') + '`');
}

function sendKeybinds(channel) {
    let embed = new MessageEmbed()
        .setTitle("Here is what you will need to do in order to create a keybind.")
        .setColor('RANDOM')
        .addField("Registering", "```java\npublic static final KeyBinding MY_KEYBIND = new KeyBinding(\"key.my_keybind\", GLFW.GLFW_KEY_P, \"key.categories.misc\");\n\npublic static registerKeyBinds() {\n    ClientRegistry.registerKeyBinding(MY_KEYBIND);\n}``` Then you will need to call this method in your `FMLClientSetupEvent`.", false)
        .addField("The actual event", "Here you will choose 1 of 2 paths(maybe both if you are special). First you will need to hook onto the client event: `InputEvent.KeyInputEvent`. If you have any client sided code which needs to be run for this keybind, you can run it here. However if your keybind contains any server side logic, you will need to send a packet!", false)
        .addField("Registering the packets", "Forge docs have very good documentation for this [here](https://mcforge.readthedocs.io/en/1.16.x/networking/simpleimpl/), so I will only show the code you need:\n\n```java\npublic class Networking {\n    private static final SimpleChannel INSTANCE = NetworkRegistry.newSimpleChannel(new ResourceLocation(MainClass.MODID, \"main\"), () -> PROTOCOL_VERSION, PROTOCOL_VERSION::equals, PROTOCOL_VERSION::equals);\n\n    public static void registerMessages() {\n	int index = 0;\n\n        INSTANCE.messageBuilder(MyPacketClass.class, index++).encoder(MyPacketClass::write).decoder(MyPacketClass::read).consumer(MyPacketClass::handle).add();\n    }\n\n    public static void sendToServer(Object packet) {\n        INSTANCE.sendToServer(packet);\n    }\n\n    public static void sendToClient(Object packet, ServerPlayerEntity player) {\n        INSTANCE.sendTo(packet, player.connection.netManager, NetworkDirection.PLAY_TO_CLIENT);\n    }\n}```Then you need to make sure you call `registerMessages` inside of your `FMLCommonSetupEvent`.", false)
        .addField("Creating the packet", "Here is the packet class you will need to make ```java\npublic class MyPacketClass {\n    private final int id;\n    public MyPacketClass(int id) {\n        this.id = id;\n    }\n\n    public void write(PacketBuffer buf) {\n        buf.writeInt(id);\n    }\n\n    public static MyPacketClass read(PacketBuffer packet) {\n        return new MyPacketClass(packet.readInt());\n    }\n\n    public void handle(Supplier<NetworkEvent.Context> ctx) {\n        ctx.get().enqueueWork(() -> this.handleThreadsafe(context));\n	contextGetter.get().setPacketHandled(true);\n    }\n\n    public void handleThreadsafe(NetworkEvent.Context context) {\n        ServerPlayerEntity player = context.getSender();\n	if (player != null) {\n            // doStuff\n	}\n    }\n}``` You just need to do all of your logic in the innermost section of `handleThreadsafe`, and read/write anything you are sending with your packet through the `read`/`write` methods.", false)
        .addField("Back to the event", "If you chose to use packets, all you need to do is go back to your event and check ```java\nif(KeybindInit.MY_KEYBIND.isPressed() {\n    Networking.sendToServer(new MyPacketClass(64));\n}``` All this will do is check if your keybind is pressed, and if it is then it sends the packet to the server so that server side logic can be done.", false)
        .setFooter("Credits to: Saksham4106#5294", 'https://icon-library.com/images/discord-icon-colors/discord-icon-colors-10.jpg');
    channel.send({ embed: embed });
}

function sendGLFWError(channel) {
    let embed = new MessageEmbed()
        .setTitle("(MacOS only) Error: 'GLFW error before init: [0x10008]Cocoa: Failed to find service port for display'")
        .setColor('RANDOM')
        .setDescription("To fix this simply add the line \"-Dfml.earlyprogresswindow=false\" to your JVM arguments. Source: https://forums.minecraftforge.net/topic/94803-javalangillegalstateexception-glfw-error-before-init-0x10008cocoa-failed-to-find-service-port-for-display/.")
        .setFooter("Credits to: The Spanish Inquisition#7798", 'https://cdn.discordapp.com/avatars/413040510127833088/b030d1b0acbadc8a9f1f906647232943.png?size=128');
    channel.send({ embed: embed });
}

function sendCommunityWiki(channel) {
    let embed = new MessageEmbed()
        .setTitle("The community Forge Wiki")
        .setColor('RANDOM')
        .setDescription("If you are not satisfied with the official forge docs/wiki, there is a community wiki/docs: https://forge.gemwire.uk/.")
        .setFooter("Credits to: TheOnlyTails#1886", 'https://cdn.discordapp.com/avatars/645291351562518542/cce95bd00df483bc092a433fbd01ebd2.png?size=128');
    channel.send({ embed: embed });
}

function sendResourceLocation(channel) {
    let embed = new MessageEmbed()
        .setTitle("'Non [a-z0-9/._-] character in path of location: modid:something' or 'Invalid modId found in file <file> - <modid> does not match the standard: ^[a-z][a-z0-9_-]{1,63}$'.")
        .setColor('RANDOM')
        .setDescription("In order to fix this issue, ensure that both your modid or the registry name of the object only contains the following:\n- Lowercase letters\n- Numbers\n- Slashes\n- Dots\n- Underscores\n- Dashes")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendDSStore(channel) {
    let embed = new MessageEmbed()
        .setTitle("(MacOS only) Non [a-z0-9_.-] character in namespace of location: .DS_Store:sounds.json")
        .setColor('RANDOM')
        .setDescription("Run find `. -name '.DS_Store' -type f -delete` in the root of your project directory. `.DS_Store` files are files that contain the folder settings for MacOS such as sort by order and snap to grid.")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendUpdateErrors(channel) {
    let embed = new MessageEmbed()
        .setTitle("When updating either your forge version or mappings version, you experience everything erroring.")
        .setColor('RANDOM')
        .setDescription("Firstly, you need to check 2 things:\n- Is the mappings version valid?(See forge discord for latest mappings)\n- Is the forge version valid?\n\nIf both of these are correct, then you will need to do the following.")
        .addField("For IntelliJ:", "Open the `Gradle` tab, and click the reload icon.", false)
        .addField("For Eclipse:", "Right click your project, go down to `Gradle`, and click `Refresh Gradle Project`.")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendIntellijClasspath(channel) {
    let embed = new MessageEmbed()
        .setTitle("(IntelliJ only) If you have the error 'Cannot find class net.minecraftforge.userdev.LaunchTesting':")
        .setColor('RANDOM')
        .setDescription("Go to `Modify Options`, click `Use classpath of module`, and select `YourMod.main`")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendGradleDaemon(channel) {
    let embed = new MessageEmbed()
        .setTitle("Error log mentions task '_', JavaExec, or ProjectScopeServices:")
        .setColor('RANDOM')
        .setDescription("If your error log mentions task '_', JavaExec, or ProjectScopeServices, it means that the Gradle Daemon (which runs in the background and usually speeds up builds) is corrupted and needs to be stopped.")
        .addField("Stopping the daemon", "First you will need to stop the daemon. We can do this by first closing our IDE, and then running `gradlew --stop` in the directory of our mod folder, and then re-opening the IDE.", false)
        .addField("Refreshing the Gradle (IntelliJ)", "In order to refresh the gradle project in IntelliJ, you need to open the `Gradle` tab, and click the reload icon.", false)
        .addField("Refreshing the Gradle (Eclipse)", "In order to refresh the gradle project in Eclipse, you need to right click your project, go down to `Gradle`, and click `Refresh Gradle Project`.", false)
        .setFooter("Credits to: [The Forge Discord](https://discord.gg/UvedJ9m)", 'https://cdn.discordapp.com/icons/313125603924639766/295e507fa505302fd77aa220335f7678.webp?size=128');
    channel.send({ embed: embed });
}

function sendMissingParameters(channel) {
    let embed = new MessageEmbed()
        .setTitle("If you are getting an error 'You are missing parameters to build a proper biome for CustomBiome':")
        .setColor('RANDOM')
        .setDescription("Below this exception it will print the biome with lots of properties. The ones that are set to `null`(not to be confused with `'null'`), are what you need to make sure you have set.")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendRegistryNotPresent(channel) {
    let embed = new MessageEmbed()
        .setTitle("If you are getting the error 'Registry Object not present':")
        .setColor('RANDOM')
        .setDescription("`java.lang.NullPointerException: Registry Object not present: modid:something` This error can be caused by 2 different things. However, this is more of a case by case solution.")
        .addField("Called Early", "The most common issue is using `RegistryObject#get` before the registry object is present. So make sure you do not call it before it is present.", false)
        .addField("Not registered", "The other cause of this error is the object not having being registered. So it is important to ensure the object is actually being registered.", false)
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendNoProtocol(channel) {
    let embed = new MessageEmbed()
        .setTitle("If you are getting an error saying 'no protocol':")
        .setColor('RANDOM')
        .setDescription("Ensure that any URLs in the `mods.toml` are not set to `\"\"`. All of the URLs are optional, so you can just remove it if you do not want a URL.")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendMissingLicense(channel) {
    let embed = new MessageEmbed()
        .setTitle("(1.16 only) If you get an error 'Missing License, please supply a license'")
        .setColor('RANDOM')
        .setDescription("To fix this, you just need to add `license = \"your license name\"` to the top of your `mods.toml`.\n\nA good website for picking a license is 'https://choosealicense.com/'")
        .setFooter("Credits to: xf8b#9420", 'https://cdn.discordapp.com/avatars/332600665412993045/c223dc94e01ce5774503a87d63f3a4d7.png?size=128');
    channel.send({ embed: embed });
}

function sendDataPackGen(channel) {
    let embed = new MessageEmbed()
        .setTitle("A useful site for data generation.")
        .setColor('RANDOM')
        .setDescription('https://misode.github.io/ It has loot tables, predicates, item modifiers, advancements, dimensions, dimension types, world settings and a bunch of world generation options.');
    channel.send({ embed: embed });
}

function send3DArmor(channel) {
    let embed = new MessageEmbed()
        .setTitle("A really good and in-depth 3D Armor Tutorial/Example/Explaination")
        .setColor('RANDOM')
        .setDescription("The GitHub: 'https://github.com/Binae/Forge-1.15-3D-Armor-for-dummies'")
        .setFooter("Credits to: Bina#5281", 'https://cdn.discordapp.com/avatars/296173455865413633/a34974e35e30b69c8f13fa6d579c4ca3.png?size=128');
    channel.send({ embed: embed });
}

function send116Oregen(channel) {
    let embed = new MessageEmbed()
        .setTitle("How to naturally generate your ores in versions 1.16+")
        .setColor('RANDOM')
        .setDescription("This is a working implementation of oregen in 1.16.3 (for all overworld biomes). However you can use it to add the feature to any biome you wish.")
        .addField("The code:", 'https://pastebin.com/SHpZBShL', false)
        .setFooter("Credits to: TheOnlyTails#1886", 'https://cdn.discordapp.com/avatars/645291351562518542/cce95bd00df483bc092a433fbd01ebd2.png?size=128');
    channel.send({ embed: embed });
}

function sendRegisterFoliage(channel) {
    let embed = new MessageEmbed()
        .setTitle("How to register a FoliagePlacerType for 1.16.")
        .setColor('RANDOM')
        .addField("The registry class:", "```java\npublic class FoliageType<P extends FoliagePlacer> extends FoliagePlacerType<P> {\n    private static final List<FoliageType<? extends FoliagePlacerBase>> TYPES = new ArrayList<>();\n    public static final FoliageType<ExampleFoliage> EXAMPLE_FOLIAGE = register(\"example_foliage\", ExampleFoliage.CODEC);\n\n    public FoliageType(Codec<P> codec) {\n        super(codec);\n    }\n\n    public static void registerFoliageTypes(IForgeRegistry<FoliagePlacerType<?>> registry) {\n        TYPES.forEach(type -> Registry.register(Registry.FOLIAGE_PLACER_TYPE, type.getRegistryName(), type));\n    }\n\n    private static <P extends FoliagePlacerBase> FoliageType<P> register(String name, Codec<P> codec) {\n        FoliageType<P> type = new FoliageType<>(codec);\n        type.setRegistryName(new ResourceLocation(ExampleMod.MOD_ID, name));\n        TYPES.add(type);\n        return type;\n    }\n}```", false)
        .addField("Then you need to add this event into a class which has the MOD event bus subscriber applied.", "```java\n@SubscribeEvent\npublic static void onRegisterFoliagePlacers(RegistryEvent.Register<FoliagePlacerType<?>> event) {\n    FoliageType.registerFoliageTypes(event.getRegistry());\n}```")
        .setFooter("Credits to: LordSkittles#5549", 'https://cdn.discordapp.com/avatars/172125875347783681/d404f873d13976bd071c5ed887026196.png?size=128');
    channel.send({ embed: embed });
}

function sendRecipeMatching(channel) {
    let embed = new MessageEmbed()
        .setTitle("Better recipe matching.")
        .setDescription("A helper method for checking whether stuff is in the correct order for custom recipes. If you have a bunch of input slots with one output and you wanted to check whether the items match, this is exactly what you need!")
        .addField("The method:", "```java\npublic static <A, B> boolean checkMatchUnordered(final List<A> wanted, final List<B> gotten, BiPredicate<A, B> compare) {\n    int wsize = wanted.size();\n    if(wsize != gotten.size()) return false;\n    List<A> missing = new ArrayList<A>(wanted);\n    outer:\n    for (int i = wsize - 1; i >= 0; i--) {\n          for (int j = 0; j < missing.size(); j++) {\n                if (compare.test(missing.get(j), gotten.get(i))) {\n                      missing.remove(j);\n                      continue outer;\n                }\n           }\n           return false;\n     }\n     return true;\n}```", false)
        .addField("To convert from a `RecipeWrapper` to a `List`, you can use:", "```java\npublic static NonNullList<ItemStack> asList(RecipeWrapper inv) {\n    NonNullList<ItemStack> out = NonNullList.create();\n    for(int i = 0; i < inv.getSizeInventory(); i++) {\n        out.add(inv.getStackInSlot(i));\n    }    return out;\n}```", false)
        .addField("An example of this combined:", "```java\n@Override\npublic boolean matches(RecipeWrapper inv, @Nullable World worldIn) {\n      return CraftingHelper.checkMatchUnordered(this.inputs, CraftingHelper.asList(inv), (ingred, stack) -> ingred.test(stack));\n}```", false)
        .setFooter("Credits to: The Spanish Inquisition#7798", 'https://cdn.discordapp.com/avatars/413040510127833088/b030d1b0acbadc8a9f1f906647232943.png?size=128');
    channel.send({ embed: embed });
}

function sendBetterTrees(channel) {
    let embed = new MessageEmbed()
        .setTitle("More visually appealing trees(1.15).")
        .setColor('RANDOM')
        .setDescription("If you want to make your trees more visually appealing than vanilla trees, you will need to make your own `TreeFeature`. You will also need a custom `FoliagePlacer`.")
        .addField("Here is a commented version that will help you understand how to make a `FoliagePlacer`.", 'https://pastebin.com/xLg9CGdj', false)
        .addField("You also need an AT on the constructor of FoliagePlacerType so you can actually use the FoliagePlacer.", "public net.minecraft.world.gen.foliageplacer.FoliagePlacerType")
        .setFooter("Credits to: The Spanish Inquisition#7798", 'https://cdn.discordapp.com/avatars/413040510127833088/b030d1b0acbadc8a9f1f906647232943.png?size=128');
    channel.send({ embed: embed });
}

function sendPlayerFirstJoin(channel) {
    let embed = new MessageEmbed()
        .setTitle("Send a message when the player first joins!")
        .setColor('RANDOM')
        .setDescription("What we do:\n1) Hooks onto the `PlayerLoggedInEvent`.\n2) Checks if the player has a boolean NBT for whether it is their first time.\n3) If the player does not have the boolean NBT, add the boolean NBT and set it to true. Then give the player an item and send the message.\n4) If the player does have the boolean NBT, send a different message.")
        .addField("The Code:", "https://pastebin.com/MHExP1CZ", false)
        .setFooter("Credits to: Affehund#9883", 'https://cdn.discordapp.com/avatars/406870590922686464/58c3a548e0020f2df3fb3325c6de3d69.png?size=128');
    channel.send({ embed: embed });
}

function sendDurabilityCrafting(channel) {
    let embed = new MessageEmbed()
        .setTitle("An item that loses durability on craft.")
        .setColor('RANDOM')
        .setDescription("Sometimes you need an item that uses durability when you craft something with that.\n\nTo do this its very simple!")
        .addField("You just need a class for your item and in that class you have to override the following methods, which damage the item when it is used in an crafting recipe:", "```java\n@Override\npublic boolean hasContainerItem(ItemStack stack) {\n    return true;\n}\n\npublic boolean doesContainerItemLeaveCraftingGrid(ItemStack stack) {\n    return false;\n}\n\n@Override\npublic ItemStack getContainerItem(ItemStack itemstack) {\n    ItemStack stack = itemstack.copy();\n    if (stack.getMaxDamage() - stack.getDamage() <= 1) {\n        stack.shrink(1);\n    } else {\n     stack.attemptDamageItem(1, random, null);\n    }\n        return stack;\n}```", false)
        .addField("It is also important to:", "Set the `maxStackSize` to `1` for your item properties, and set the `maxDamage` to whatever durability you want your item to have, when registering the item!", false)
        .setFooter("Credits to: Affehund#9883", 'https://cdn.discordapp.com/avatars/406870590922686464/58c3a548e0020f2df3fb3325c6de3d69.png?size=128');
    channel.send({ embed: embed });
}

function sendActionResultType(channel) {
    let embed = new MessageEmbed()
        .setTitle("Here is a more practical explanation of ActionResultType use cases!")
        .setColor('RANDOM')
        .addField("SUCCESS", "Use this when your item/block/entity has met all the requirements for the interaction, and you have completed everything that needs to be done.\nThis will prevent any further action from being taken with the interaction.", false)
        .addField("CONSUME", "You can use this when you meet the same conditions as SUCCESS, but additionally are consuming an item/block as part of the interaction. This ActionResultType isn't explicitly checked as of 1.15.2, and so using this is mostly optional.\nThis will prevent any further action from being taken with the interaction.", false)
        .addField("PASS", "Use this when you do not meet any of the requirements for the interaction (not holding the right item, etc.). This signals for the game to attempt to interact with the other hand, and also try to use the item's interaction methods and other similar methods.", false)
        .addField("FAIL", "Use this when you have met the minimum requirements for the interaction (holding the right block, etc.), but fail to meet further criteria. This should be used when you want to indicate that the player intended to interact with your object, but failed to meet further criteria.\nThis will prevent any further action from being taken with the interaction.", false)
        .setFooter("Credits to: Tslat#0001", 'https://cdn.discordapp.com/avatars/154827635229196298/a_1d077b7140014e8ffcd58e11e5ac897e.gif?size=128');
    channel.send({ embed: embed });
}

function sendGithub(channel) {
    let embed = new MessageEmbed()
        .setTitle("To review the code for my tutorials, check out my GitHub Repositories!")
        .setColor('RANDOM')
        .addField("1.12:", "https://github.com/DaRealTurtyWurty/Tutorial-Mod", false)
        .addField("1.15:", "https://github.com/DaRealTurtyWurty/1.15-Tut-Mod/", false)
        .addField("1.16:", "Coming Soon", false);
    channel.send({ embed: embed });
}

function sendNamingConventions(channel) {
    let embed = new MessageEmbed()
        .setTitle("Naming Conventions")
        .setColor('RANDOM')
        .setDescription("Please follow the java naming conventions. It makes your code a lot cleaner and therefore easier to read so we can help better.\n\nMore Info here:\nhttps://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html");
    channel.send({ embed: embed });
}

function sendIntelliJShortcuts(channel) {
    let embed = new MessageEmbed()
        .setTitle("A list of IntelliJ Shortcuts and Hotkeys.")
        .setColor('RANDOM')
        .addField("Find/Replace", "Ctrl+F", false)
        .addField("Auto Format Code", "Ctrl+Alt+L", false)
        .addField("Rename Selected File", "Shift+F6", false)
        .addField("Organise Imports (Auto-Import)", "Ctrl+Alt+O", false)
        .addField("Delete Current Line", "Ctrl+Y", false)
        .addField("Search (Find in Path)", "Ctrl+Shift+F", false)
        .addField("Generate Getters and Setters", "Alt+Insert", false)
        .addField("Redo Action", "Ctrl+Shift+Z", false)
        .addField("Comment Out Selected Lines", "Ctrl+/", false)
        .addField("Go to Line Number", "Ctrl+G", false)
        .addField("Open Type (Search For Class)", "Shift Twice/Shift Four Times", false);
    channel.send({ embed: embed });
}

function sendEclipseShortcuts(channel) {
    let embed = new MessageEmbed()
        .setTitle("A list of Eclipse Shortcuts and Hotkeys.")
        .setColor('RANDOM')
        .addField("Find/Replace", "Ctrl+F", false)
        .addField("Auto Format Code", "Ctrl+Shift+F", false)
        .addField("Rename Selected File", "Alt+Shift+R", false)
        .addField("Organise Imports (Auto-Import)", "Ctrl+Shift+O", false)
        .addField("Delete Current Line", "Ctrl+D", false)
        .addField("Search (Find in Path)", "Ctrl+H", false)
        .addField("Generate Getters and Setters", "Alt+Shift+S", false)
        .addField("Redo Action", "Ctrl+Y", false)
        .addField("Comment Out Selected Lines", "Ctrl+Shift+C", false)
        .addField("Go to Line Number", "Ctrl+L", false)
        .addField("Open Type (Search For Class)", "Ctrl+Shift+T", false);
    channel.send({ embed: embed });
}

function sendDotGet(channel) {
    let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Deferred Registers and Registry Objects")
        .setDescription("If you are using registry objects, you may want to be able to actually get the block/item/other object from it. \n\nYou can do this my simply adding `.get()` after `InitClass.OBJECT_FIELD`. \nThis will return the object rather than a `RegistryObject<Object>`!");
    channel.send({ embed: embed });
}

function sendLatestDotLog(channel) {
    channel.send({
        embed: {
            "title": "latest.log",
            "description": "To solve the majority of your problems, you will want to go ahead and open the `latest.log`(found in rootfolder/run/logs/latest.log), and give it a good read.\n\n In here you will find texture issues, model issues, blockstate issues, json parsing issues, toml parsing issues, the stacktrace to any runtime errors that are not logical, and much much more. Please give this a read before asking for help with a problem. \n\nIf you can't find anything in the log, send it to us with one of the following sites:\n[hastebin](<https://www.hastebin.com>) - Free: 400KB\n[hatebin](<https://www.hatebin.com>) - Free: 50,000 char limit\n[gist.github](<https://gist.github.com>) - Free(membership required): 100MB\n[paste.ee](<https://paste.ee>) - Free: 1MB, Member: 6MB\n[paste.gg](<https://paste.gg>) - Free: 15MB\n[pastebin](<https://www.pastebin.com>) - Free: 512KB, Paid: 10MB"
        }
    });
}

function sendMappingsBot(channel) {
    let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Where to get the mapping for a field or get the AT?")
        .setDescription("For this you will need to join the forge server:\nhttps://discord.gg/UvedJ9m. \n\nThen you can DM <@437036817858953217>!");
    channel.send({ embed: embed });
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

function sendRenderText(channel) {
    let embed = new MessageEmbed()
        .setTitle("Minecraft rendering text on screen")
        .setColor('RANDOM')
        .setDescription('```java\n@SubscribeEvent\npublic void renderGameOverlay(RenderGameOverlayEvent.Post event) {\n    Minecraft mc = Minecraft.getInstance();\n    mc.fontRenderer.drawStringWithShadow("Kreds: " + KredsManager.getKreds(), 10, 10, 0xFFFFFF);\n}```')
        .setFooter("Credits to: jojo2357#1417", 'https://cdn.discordapp.com/avatars/524411594009083933/1ff6d708ec60efe7a07882ec97f2951e.png?size=128');
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