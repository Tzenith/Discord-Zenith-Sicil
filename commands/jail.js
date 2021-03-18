const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("ROLID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı Belirtin`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  let jaildekiler = jdb.get(`jail`) || [];
  await uye.roles.set(uye.roles.cache.has("BOOST ROL") ? ["CEZALI ROL", "BOOST ROL"] : ["CEZALI ROL"]).catch();
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    jdb.push(`jail`, `j${uye.id}`);
    kdb.add(`kullanici.${message.author.id}.jail`, 1);
    kdb.add(`ykullanici.${uye.id}.uyarı`, 15);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Sebep: reason,
      Ceza: "Jail",
      Zaman: Date.now()
    });
  };
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Cezalıya Atıldı`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("KANALID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${sebep}** Sebebiyle Cezalıya Atıldı`)
  .setFooter(`THE.ZENİTH`));
};
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
exports.config = {
  name: "jail",
  guildOnly: true,
  aliases: ["jail"],
  description: "Belirtilen Kullanıcıya Jail Atar"
};