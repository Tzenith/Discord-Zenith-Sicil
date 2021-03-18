  
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
module.exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has("ROLID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı Belirtin`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempsmute`) || [];
  let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!ms(sure) || !reason) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Süre ve Sebep Belirtin`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  if(uye.voice.channel) uye.voice.setMute(true).catch();
  if (!muteler.some(j => j.id == uye.id)) {
    jdb.push(`tempsmute`, {id: uye.id, kalkmaZamani: Date.now()+ms(sure)})
    kdb.add(`kullanici.${message.author.id}.sesmute`, 1);
    kdb.add(`ykullanici.${uye.id}.uyarı`, 5);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Sebep: reason,
      Ceza: "Ses Mute",
      Zaman: Date.now()
    });
  };
  message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${reason}** Sebebiyle ${sure} Boyunca Susturuldu`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  client.channels.cache.get("KANALID").send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`<@!${uye.id}> İsimli Kullanıcı, <@!${message.author.id}> Tarafından **${reason}** Sebebiyle ${sure} Boyunca Susturuldu`)
  .setFooter(`THE.ZENİTH`));};
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
exports.config = {
  name: "vmat",
  guildOnly: true,
  aliases: ["vmat"],
  description: "Belirtilen Kullanıcıya Ses Mute Atar"
};