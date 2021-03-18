//- Bu Kod Tamamen Bana Yani \ //The.Zenith#9997\' / Nickine Aittir Satış Yapılması Tamamen Yasaktır.! -\
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.js');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `thezenith`}, status: 'dnd' })
};


// -Status
// online - Çevrimiçi
// idle - Boşta
// dnd - Rahatsız Etmeyin

// -Type
// WATCHING - İZLİYOR
// PLAYING - OYNUYOR
// LISTENING - DİNLİYOR

// -Name
