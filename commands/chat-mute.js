//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');

module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("ROLID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let sebep = args.splice(1).join(" ");
  if(!uye || !sebep) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Mutelenecek Bir Üye ve Bir Uyarı Sebebi Belirtin`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempmute`) || [];
  await uye.roles.add("ROLID").catch();
  if (!muteler.some(j => j.id == uye.id)) {
    kdb.add(`kullanici.${message.author.id}.mute`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      reason: sebep,
      Ceza: "Chat Mute",
      Zaman: Date.now()
      });
  };
  kdb.add(`ykullanici.${uye.id}.uyarı`, 15);
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Mutelendi`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("KANALID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Mutelendi`)
  .setFooter(`THE.ZENİTH`));
};
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
exports.config = {
  name: "chatmute",
  guildOnly: true,
  aliases: ["chatmute"],
  description: "Belirtilen Kullanıcıya Chat Mute Atar"
};