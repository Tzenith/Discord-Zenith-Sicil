const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
  if (!message.member.roles.cache.has("ROLID") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField("Yetersiz Yetki",`Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor("RANDOM")).then(m => m.delete({timeout: 7000}));
  if (!args[0] || isNaN(args[0])) return message.channel.send(new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setDescription(`Lütfen Geçerli Bir Kullanıcı ID'si Belirtin`)
  .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
  let uye = await client.users.fetch(args[0]);
  if(uye) {
    let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi";
    message.guild.members.unban(uye.id).catch(err => message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Belirtilen ID Numarasına Bağlı Bir Ban Bulunamadı`)
    .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000})));
    client.channels.cache.get("KANALID").send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`<@!${uye.id}> İsimli Kullanıcının Banı <@!${message.author.id}> Tarafından Kaldırıldı`)
    .setFooter(`THE.ZENİTH`));
} else {
    message.channel.send(new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`Lütfen Geçerli Bir Kullanıcı ID'si Belirtin`)
    .setFooter(`THE.ZENİTH`)).then(x => x.delete({timeout: 5000}));
    } 
};
//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
exports.config = {
  name: "unban",
  guildOnly: true,
  aliases: ["unban"],
  description: "Belirtilen Kullanıcının Banını Kaldırır."
};