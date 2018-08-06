

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[═════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});




client.on('message', message => {


if (message.content === prefix + "اقفل الشات") {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You don’t have `Manage Messages` permissions**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("Channel Locked ✅ ")
           });
}
  if (message.content === prefix + "افتح الشات") {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You don’t have `Manage Messages` permissions**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("Channel Unlocked ✅ ")
           });
}


});


client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField(':globe_with_meridians:** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField(':medal:** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField(':red_circle:**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField(':large_blue_circle:**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField(':pencil:**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField(':microphone:**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField(':crown:**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField(':id:**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField(':date:**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });









client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**هل انت متاكد من مسح الشات؟`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`سوف يمسح الشات`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "``تــم مسح الشات ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**تم الغاء مسح الشات**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});

const { Client } = require('discord.js');
client.on(`ready`, () => console.log(`Ready!`))
const channels = {};


client.on('voiceStateUpdate',async function(oldmember, member) {
if(member.user.bot) return;
if(member.voiceChannel === undefined && channels[member.id]) {
console.log(member.guild.members.filter(m => m.voiceChannelID === channels[member.id].channel).size)
if(member.guild.members.filter(m => m.voiceChannelID === channels[member.id].channel).size < 1) {
member.guild.channels.get(channels[member.id].channel).delete();
channels[member.id].channel = undefined;
}
}
if(oldmember.voiceChannel !== undefined || member.voiceChannel !== undefined) {
if(member.voiceChannelID === '456921679642230794') {
member.guild.createChannel(member.displayName, "voice", [{
id: member.id,
allow: ['CONNECT'],
}, {
id: member.guild.id,
deny: ['CONNECT']
}]).then((channel)=> {
    const parent = member.guild.channels.get('456921679642230794').parentID
    channel.setParent(parent);
    if(!channels[member.id]) channels[member.id] = {
        channel: channel.id,
        }
member.user.send(`Hey **${member.displayName}** I've created a channel for you!
------------------------------------------------------------
Use \`\`$unlock [@user | all]\`\` to unlock for a specify or for all.
Use \`\`$lock [@user | all]\`\` to lock & kick for a specify or for all in your voice channel.
Use \`\`$rename [new name]\`\` to rename your voice channel name.
------------------------------------------------------------
`)
member.setVoiceChannel(channel.id);
})
} else return undefined;
}
});

client.on(`message`, async message => {
let args = message.content.trim().split(" ").slice(1); //substring(prefix.length) before split(" ") if you had a prefix.
let user = message.mentions.users.first();
if(message.content.startsWith("$unlock")) {
if(channels[message.author.id] !== undefined) {
if(user) {
if(message.guild.channels.get(channels[message.author.id].channel).permissionsFor(user.id).has(`CONNECT`)) return message.channel.send(`**The user already can connect to your voice channel**\n to lock & kick user use \`\`!lock\`\` `);
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(user.id, {
CONNECT: true
}).then(message.channel.send(`**${user.username}** can connect to your room now!`))
}
else if(args.includes("all")) {
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(message.guild.id, {
CONNECT: true
}).then(message.channel.send("**Everyone** can connect to your room now!"));
} else return message.channel.send(`**Usage: $unlock [all | @user]**`)
}
}
if(message.content.startsWith("$lock")) {
if(channels[message.author.id] !== undefined) {
if(user) {
if(!message.guild.channels.get(channels[message.author.id].channel).permissionsFor(user.id).has(`CONNECT`)) return message.channel.send(`**The user already cannot connect to your voice channel**`);
try {
if(message.guild.members.get(user.id).voiceChannelID === channels[message.author.id].channel) {
message.guild.members.get(user.id).setVoiceChannel('آيدي الشنل الي يروح له العضو بعد ما يصير له lock'); // المكان الي راح ينحطوله بعد ما يصير لهم lock
}
} catch (error) {
console.log(error)
}
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(user.id, {
CONNECT: false
}).then(message.channel.send(`:x: **${user.username}** cannot connect to your room now!`))
}
else if(args.includes("all")) {
message.guild.channels.get(channels[message.author.id].channel).overwritePermissions(message.guild.id, {
CONNECT: false
}).then(message.channel.send(":x: **Everyone** cannot connect to your room now!"));
} else return message.channel.send(`**Usage: $lock [all | @user]**`)
}
}
if(message.content.startsWith("$rename")) {
if(channels[message.author.id] !== undefined) {
if(args.length <= 0) return message.channel.send(`:scroll: **Hmmm the name please*`);
if(message.content.length > 7+15) return message.channel.send(`:x: It appears that's the max letters allowed is **15**.`)
const oldName = await message.guild.channels.get(channels[message.author.id].channel).name
message.channel.send(`:pencil2: Renamed **\`\`${oldName}\`\`** to **\`\`${args.join(" ").toString()}\`\`** alright?`)
message.guild.channels.get(channels[message.author.id].channel).setName(args.join(" ").toString());
}
 }
});





      client.on("guildMemberAdd", member => {
    member.createDM().then(function (channel) {
    return channel.send(`مرحبا بك في سيرفرنا الرجاء قراءه القوانين قبل كتابه رسائل في الشات ${member} `)
  }).catch(console.error)
  })

  client.on('message', message => {
    if(message.content === "$bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
        .addField('**:globe_with_meridians: عدد السيرفرات**' , `${client.guilds.size}`, true)
        .addField('**عدد المستخدمين 👥 **' , `${client.users.size}`, true)
               message.channel.sendEmbed(embed);
           }
});




client.on('message', message => {
              if(!message.channel.guild) return;
    if(message.content.startsWith('$bc1')) {
    if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
    let copy = "MaxBot";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))







    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
       let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
    reaction1.on("collect", r => {
    message.channel.send(`☑ |   ${message.guild.members.size} يتم ارسال البرودكاست الى عضو `).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
    var bc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('البرودكاست') .addField('السيرفر', message.guild.name) .addField('المرسل', message.author.username)
       .addField('الرساله', args)
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, client.user.avatarURL);
    m.send({ embed: bc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    })

        client.on('message', message => {
        if (message.author.id === client.user.id) return;
        if (message.guild) {
        let embed = new Discord.RichEmbed()
        let args = message.content.split(' ').slice(1).join(' ');
        if(message.content.split(' ')[0] == prefix + 'bc2') {
        if(!message.channel.guild) return message.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');
        if (!args[1]) {
        return;
        }
          message.guild.members.forEach(m => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
              var bc = new Discord.RichEmbed()
              .addField('# | الرسالة ', args)
              .setThumbnail(message.guild.iconURL)
              .setColor('RANDOM')
              m.sendMessage(args)
          });
                 if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(":x: **ليس لديك صلاحية للنشر هنا**");
          const AziRo = new Discord.RichEmbed()
          .setColor('RANDOM')
          message.channel.sendEmbed(AziRo);
        }
        } else {
          return;
        }
        });







        client.on('message', message => {
    if (message.content.startsWith("$bc3")) {
    if (message.channel.type === 'dm') return ;
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:false: **| ${message.author.username} you need \`ADMINISTRATOR\` Permission to use this Command !**`)
    if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR'))return message.channel.send(`**:false: | ${message.author.username}  I require the \`ADMINISTRATOR\` permission to send a brodcast !**`)
    let args = message.content.split(' ').slice(1).join(' ')
    if (!args) return message.reply('يجب وضع رسالة لأرسال البرودكاست');
    message.reply(`** هل أنت متأكد من أنك تريد أرسال البرودكاست ؟ **`).then(() => {
        message.channel.awaitMessages(msg => msg.content == 'yes' || msg.content == "نعم", {
            max: 1,
            time: 30000,
            errors: ['time']
        })
            .then(() => {
             message.channel.send('...انتظر قليلا').then(function(m) {
             setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓]1`)
             }, 1000)
             setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓]2%`)
             }, 3000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓]3%`)
             }, 5000)
             setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓]4%`)
             }, 7000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓]15%`)
             }, 9000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓]23%`)
             }, 10000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓]46%`)
             }, 12000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓]59%`)
             }, 14000)
               setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓]68%`)
             }, 16000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓]75%`)
             }, 18000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]87%`)
             }, 20000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]95%`)
             }, 21000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]96%`)
             }, 23000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]97%`)
             }, 24000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]98%`)
             }, 25000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]99%`)
             }, 26000)
                setTimeout(function() {
               m.edit(`جاري ارسال الرسالة: [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100%`)
             }, 27000)
             setTimeout(function() {
               m.edit(`☑ ${message.guild.memberCount} | تم أرسال الرسالة لـ`)
             }, 29000)
              });

                //message.guild.members.filter(m=> m.presence.status !== 'offline').forEach(m => {
                message.guild.members.forEach(m => {
						var bc = new Discord.RichEmbed()
						.setColor('RANDOM')
						.addField('Server :', message.guild.name)
						.addField('Sender :', message.author.username)
						.addField('Message : ', args)
						.setThumbnail(message.guild.iconURL)
						.setAuthor(message.author.username, message.author.avatarURL)
						m.send(bc)


                });
            });
    });
}
 });








        const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;

client.on('message', msg => {
 if (msg.content.startsWith(prefix + 'حاسبه')) {
    let args = msg.content.split(" ").slice(1);
        const question = args.join(' ');
    if (args.length < 1) {
        msg.reply('اكتب المساله.');
} else {    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        msg.reply(`Error: ${err}`);
    }

    const embed = new Discord.RichEmbed()
    .addField("**السؤال**: ",`**${question}**`, true)
    .addField("**الاجابه**: ",`**${answer}**`, true)
    msg.channel.send(embed)
    }
};
});

client.on('message', message => {
    if (message.content.startsWith("$translate")) {

        const translate = require('google-translate-api');
        const Discord = require('discord.js');

    let toTrans = message.content.split(' ').slice(1);
    let language;

    language = toTrans[toTrans.length - 2] === 'to' ? toTrans.slice(toTrans.length - 2, toTrans.length)[1].trim() : undefined;
    if (!language) {
        return message.reply(`Please supply valid agruments.\n**Example** \`$translate [text] to [language]\``);
    }
    let finalToTrans = toTrans.slice(toTrans.length - toTrans.length, toTrans.length - 2).join(' ');
    translate(finalToTrans, {to: language}).then(res => {
            message.channel.send({embed: {
                color: 3447003,
                author: {
                  name: 'Dragon\'s translator',
                  icon_url: client.user.avatarURL
                },
                fields: [{
                    name: "Translator",
                    value: `**From:** ${res.from.language.iso}\n\`\`\`${finalToTrans}\`\`\`\n**To: **${language}\n\`\`\`${res.text}\`\`\``
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "Dragon"
                }
              }
            });
    }).catch(err => {
        message.channel.send({
            embed: {
                description: '❌ We could not find the supplied language.',
                color: 0xE8642B
            }
        });
    });
    }
});

const google = require('google-it');
client.on('message', message => {
 let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'google')) {
    const input = args.join(' ');

google({ query: input, disableConsole: true }).then(results => {
    return message.channel.send(`\n\n**Title**: ${results[0].title}\n***Link***: ${results[0].link}\nDescription: ${results[0].snippet}`);
}).catch(error => {
    if (error) throw error;
});

}})



 client.on('message', message => {
if(message.content.startsWith(prefix +'suggest')) {
      const A8tra7Room = message.guild.channels.find("name", "suggestions")

      if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`)
      ;
   let a8tra7 = message.content.split(" ").slice(1);
   var m8tr7 = message.author.id
if(!message.guild.channels.find("name","suggestions")) return message.channel.send('لايوجد روم اقتراح \`suggestions\`')
var Eror = new Discord.RichEmbed()
   .setTimestamp()
   .setDescription(`الرجاء كتابت إقتراحك بعد الأمر `)
   if(!a8tra7.join(" ")) return message.channel.send(Eror).then(message => {message.delete(50000)});
   var ThxForSug = new Discord.RichEmbed()
   .setTitle(`:white_check_mark: Success!`)
   .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/icons/378184284080439309/17bef133ab9aed50a4931303bdf74688.jpg')
   .setDescription(`شكراً على اقتراحك !`)
.addField(`إقتراحك : `, a8tra7)
   var Sure = new Discord.RichEmbed()
   .setTimestamp()
   .setDescription(`هل انت متأكد من ارسال الاقتراح؟ معك دقيقه قبل الالغاء`)
.addField(`المحتوى : `, a8tra7)
message.channel.sendEmbed(Sure).then(msg => {
    msg.react('❎')
.then(() => msg.react('✅'))

let YesFilter = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
let NoFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

let Yes = msg.createReactionCollector(YesFilter, { time: 60000 });
let No = msg.createReactionCollector(NoFilter, { time: 60000 });

Yes.on("collect", r => {
   var ala8tra7 = new Discord.RichEmbed()
   .setTimestamp()
   .setColor('#50bcdf')
   .setThumbnail('https://cdn.discordapp.com/icons/378184284080439309/17bef133ab9aed50a4931303bdf74688.jpg')
   .setFooter(`${message.author.username}#${message.author.discriminator}`)
   .setTitle(`الاقتراح ⤵`)
   .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=21469585838&scope=bot`)
   .setDescription(`|~~>~~ ${a8tra7} ~~<~~|\n    المقترح : __<@${m8tr7}>__`)
   A8tra7Room.send(ala8tra7)
   message.channel.sendEmbed(ThxForSug).then(message => {message.delete(2000)})
msg.delete();
})
No.on("collect", r => {
message.channel.send('تم الغاء اقتراح بنجاح :white_check_mark: ').then(message => {message.delete(2000)})
msg.delete();
})
})
}
});




  client.on('message', message => {
    if (message.author.id === client.user.id) return;
            if (message.content.startsWith(prefix + "ping")) {
        message.channel.sendMessage(':ping_pong: Pong! In `' + `${client.ping}` + ' ms`');
    }
});



client.on('message', message => {
if (message.content.startsWith(prefix + 'help')) { /// This is The DMS Code Send The Help In DMS // Code By NotGucci
    let pages = [`
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
:earth_africa: The Public Commands :earth_africa:
1༺༻  $id  | Shows User ID [SOON]༺༻
2༺༻  $userinfo | Shows User Info༺༻
3༺༻  $server | Shows Server Info༺༻
4༺༻  $ping | Shows Bot Ping༺༻
5༺༻  $dt| Show date and time༺༻
6༺༻   $invite | Shows Bot Invite Link༺༻
7༺༻   $bot | Shows Bot Info༺༻
8༺༻   $avatar | Shows User Avatar༺༻
9༺༻   $image | Shows Server Avatar༺༻
10༺༻  $mcskin  | Shows Minecraft Players Skin༺༻
11༺༻  $say  | Repeat What Your Saying༺༻
12༺༻  $gif  | Gives You Gif ༺༻
11༺༻  $moveall  | Move All Members To Your Channel༺༻
12༺༻  $hack  | Hack Game༺༻
13༺༻  $rps  | Paper scissors game with the bot༺༻
14༺༻  $مريم  | Mariam Game༺༻
15༺༻  $حاسبه |  Calculator༺༻
16༺༻  $translate |  Translate༺༻
17༺༻  $انمي |  Anime Game༺༻
18༺༻  $حكم |  Rule Game༺༻
19༺༻  $عقاب |  Punishment Game༺༻
20༺༻  $tag  | Give You Custom Words༺༻
21༺༻  $short  | short link༺༻
22༺༻  $micr  | Questions for Minecraft༺༻
23༺༻  $allbots  | View all bots༺༻
24༺༻  $animal  | Random Animal༺༻
25༺༻  $punch  | punch someone༺༻
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
Click On ▶ To Go Administor Side
   `
,`
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
:closed_lock_with_key: Administor Commands:closed_lock_with_key:
1༺༻  $clear | Clear The Chat(without number)༺༻
1༺༻  $nclear | Clear The Chat (with number)༺༻
2༺༻  $bc1 | Msg Everyone In The Server༺༻
2༺༻  $bc2 | Msg Everyone In The Server [without embed]༺༻
3༺༻  $kick | Kick With Reson༺༻
4༺༻  $tempban | Ban With Reason༺༻
5༺༻  $tempmute | mute With Reason༺༻
6༺༻  $unmute | unmute ༺༻
7༺༻ Make Room Called log For Logs༺༻
8༺༻ Make Room Called report For reports༺༻
9༺༻ Make Room Called suggestion For suggestion༺༻
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
Click On ▶ To Go To Bot Info
   `,`
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
1༺༻  There is Commands Just For OrochiX | Bot By:OrochiX༺༻
$bcall -> send msg for all servers
༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻༺▇༻
   `]
    let page = 1;

    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])

    message.author.sendEmbed(embed).then(msg => {

        msg.react('◀').then( r => {
            msg.react('▶')


        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;


        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});



        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
            page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
});

client.on('message', message => {
     if (message.content === (prefix + "help")) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
  .addField("Done" , " تــــم ارســالك في الخــاص")
  message.channel.sendEmbed(embed);
    }
});














             client.on('message', message => {
                if(message.content === prefix + "invite") {
                    let embed = new Discord.RichEmbed ()
                    embed.setTitle("**:arrow_right: لاضافه البوت اضغط هنا**")
                    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=456134218330800128&permissions=8&scope=bot");

                   message.channel.sendEmbed(embed);
                  }
});



client.on('message', message => {
    if (message.content.startsWith("$avatar")) {
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      } else {
          var x5bzm = message.author;

      }
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setImage(`${x5bzm.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});





    const devs = ['429972030092476437' , '' , '' , ''];
const adminprefix = "$";
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'sp')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }}
  )




  client.on('message' , message => {
if (message.content.startsWith("$sg")) {
          if(!message.channel.guild) return message.reply('هذا الامر للسيرفرات فقط')
      if (message.author.bot) return;
            if (!message.channel.guild) return;
            let args = message.content.split(" ").slice(1).join(" ");

                var xsatt = new Discord.RichEmbed()
                .addField('** الـسيرفر**', `${message.guild.name}`,true)
            .addField(' **الـمرسل **', `${message.author.username}#${message.author.discriminator}`,true)
            .addField(' **الرسالة** ', args)
              .setThumbnail('https://images-ext-2.discordapp.net/external/cfiQPI-jiFWEr1dTyHZeT4l5ZSegPifQZSSOYusKSyo/https/cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/letter-256.png?width=100&height=100')
              .setColor('RANDOM')
              client.users.get("429972030092476437").send({embed: xsatt});

            let embed = new Discord.RichEmbed()
               .setAuthor(message.author.username, message.author.avatarURL)
               .setColor("RANDOM")
               .setDescription(' ✅ | **__ تم ارسال الأقتراح الى صاحب البوت __**')
               .setThumbnail('https://images-ext-2.discordapp.net/external/cfiQPI-jiFWEr1dTyHZeT4l5ZSegPifQZSSOYusKSyo/https/cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/letter-256.png?width=100&height=100')


          message.channel.send(embed);
        }});



            const giphy = require('giphy-api')();
    function getValue(key, array) {
  for (var el in array) {
    if (array[el].hasOwnProperty(key)) {
      return array[el][key];
    }
  }
}

    client.on('message', message => {
    if(message.content.startsWith(prefix + 'gif')) {
        sb = message.content.substring(4)
      giphy.RANDOM({
        tag: sb,
        rating: 'g',
        fmt: 'json'
      }, function(err, res) {
        if (getValue("image_url", res)) {

          message.channel.send({files:[{
              attachment: getValue("image_url", res),
              name: 'gif'+sb+'.gif'
          }]
        });
        }

      });
      }
});


const Sra7a = [
     'صراحه  |  صوتك حلوة؟',
     'صراحه  |  التقيت الناس مع وجوهين؟',
     'صراحه  |  شيء وكنت تحقق اللسان؟',
     'صراحه  |  أنا شخص ضعيف عندما؟',
     'صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟',
     'صر��حه  |  يدل على أن الكذب مرات تكون ضرورية شي؟',
     'صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟',
     'صراحه  |  كيفية الكشف عن من يكمن عليك؟',
     'صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟',
     'صراحه  |  أشجع شيء حلو في حياتك؟',
     'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
     'صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟',
     'صرا����ه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟',
     'صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟',
     'صراحه  |  نظرة و يفسد الصداقة؟',
     'صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟',
     'صراحه  |  شخص معك بالحلوه والمُره؟',
     'صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟',
     'صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟',
     'صراحه  |  وش تتمنى الناس تعرف عليك؟',
     'صراحه  |  ابيع المجرة عشان؟',
     'صراحه  |  أحيانا احس ان الناس ، كمل؟',
     'صراحه  |  مع مين ودك تنام اليوم؟',
     'صراحه  |  صدفة العمر الحلوة هي اني؟',
     'صرا��ه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
     'صراحه  |  صفة تحبها في نفسك؟',
     'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
     'صراحه  |  تصلي صلواتك الخمس كلها؟',
     'صراحه  |  ‏تجامل أحد على راحتك؟',
     'صراحه  |  اشجع شيء سويتة بحياتك؟',
     'صراحه  |  وش ناوي تسوي اليوم؟',
     'صراحه  |  وش شعورك لما تشوف المطر؟',
     'صراحه  |  غ��رتك هاديه ولا تسوي مشاكل؟',
     'صراحه  |  ما اكثر شي ندمن عليه؟',
     'صراحه  |  اي الدول تتمنى ان تزورها؟',
     'صراحه  |  متى اخر مره بكيت؟',
     'صراحه  |  تقيم حظك ؟ من عشره؟',
     'صراحه  |  هل تعتقد ان حظك سيئ؟',
     'صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟',
     'صراحه  |  كلمة تود سماعها كل يوم؟',
     'صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟',
     'صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟',
     'صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟',
     'صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟',
     '‏صراحه | هل جرحت شخص تحبه من قبل ؟',
     'صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟',
     '‏صراحه | هل تحب عائلتك ام تكرههم؟',
     '‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟',
     '‏صراحه  |  هل خجلت من نفسك من قبل؟',
     '‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟',
     '‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟',
     '‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟',
	  '‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟',
     '‏صراحه  |  ماذا تختار حبيبك أم صديقك؟',
     '‏صراحه  | هل حياتك سعيدة أم حزينة؟',
     'صراحه  |  ما هي أجمل سنة عشتها بحياتك؟',
     '‏صراحه  |  ما هو عمرك الحقيقي؟',
     '‏صراحه  |  ما اكثر شي ندمن عليه؟',
	 'صراحه  |  ما هي أمنياتك المُستقبلية؟‏',
]
   client.on('message', message => {
 if (message.content.startsWith('$صراحه')) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
  .setTitle("لعبة صراحة ..")
  .setColor('RANDOM')
  .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
  .setImage("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
                  .setTimestamp()

   message.channel.sendEmbed(client);
   message.react("??")
 }
});


const Za7f = [
    "**صورة وجهك او رجلك او خشمك او يدك**.",
    "**اصدر اي صوت يطلبه منك الاعبين**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سمعنا صوتك و غن اي اغنية من اختيار الاعبين الي معك**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**صور اي شيء يطلبه منك الاعبين**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**سكر خشمك و قول كلمة من اختيار الاعبين الي معك**.",
    "**سو مشهد تمثيلي عن مصرية بتولد**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**ذي المرة لك لا تعيدها**.",
    "**ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام**.",
    "**روح عند اي احد بالخاص و قول له انك تحبه و الخ**.",
    "**اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص**.",
    "**قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**غير اسمك الى اسم من اختيار الاعبين الي معك**.",
    "**اتصل على امك و قول لها انك تحبها :heart:**.",
    "**لا يوجد سؤال لك سامحتك :slight_smile:**.",
    "**قل لواحد ماتعرفه عطني كف**.",
    "**منشن الجميع وقل انا اكرهكم**.",
    "**اتصل لاخوك و قول له انك سويت حادث و الخ....**.",
    "**روح المطبخ و اكسر صحن او كوب**.",
    "**اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف**.",
    "**قول لاي بنت موجود في الروم كلمة حلوه**.",
    "**تكلم باللغة الانجليزية الين يجي دورك مرة ثانية لازم تتكلم اذا ما تكلمت تنفذ عقاب ثاني**.",
    "**لا تتكلم ولا كلمة الين يجي دورك مرة ثانية و اذا تكلمت يجيك باند لمدة يوم كامل من السيرفر**.",
    "**قول قصيدة **.",
    "**تكلم باللهجة السودانية الين يجي دورك مرة ثانية**.",
    "**اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك**.",
    "**اول واحد تشوفه عطه كف**.",
    "**سو مشهد تمثيلي عن اي شيء يطلبه منك الاعبين**.",
    "**سامحتك خلاص مافيه عقاب لك :slight_smile:**.",
    "**اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل....**.",
    "**روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك**.",
    "**تاخذ عقابين**.",
    "**قول اسم امك افتخر بأسم امك**.",
    "**ارمي اي شيء قدامك على اي احد موجود او على نفسك**.",
    "**اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك**.",
    "**اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه**.",
    "**تتصل على الوالده  و تقول لها خطفت شخص**.",
    "** تتصل على الو��لده  و تقول لها تزوجت با سر**.",
    "**����تصل على الوالده  و تقول لها  احب وحده**.",
      "**تتصل على شرطي تقول له عندكم مطافي**.",
      "**خلاص سامحتك**.",
      "** تصيح في الشارع انا  مجنوون**.",
      "** تروح عند شخص تقول له احبك**.",

]


 client.on('message', message => {
   if (message.content.startsWith("$عقاب")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('MaxBot' ,
  `${Za7f[Math.floor(Math.random() * Za7f.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[38ab] Send By: ' + message.author.username)
    }
});



var rebelx = ["https://f.top4top.net/p_682it2tg6.png","https://e.top4top.net/p_682a1cus5.png","https://d.top4top.net/p_682pycol4.png","https://c.top4top.net/p_682vqehy3.png","https://b.top4top.net/p_682mlf9d2.png","https://a.top4top.net/p_6827dule1.png","https://b.top4top.net/p_682g1meb10.png","https://a.top4top.net/p_682jgp4v9.png","https://f.top4top.net/p_682d4joq8.png","https://e.top4top.net/p_6828o0e47.png","https://d.top4top.net/p_6824x7sy6.png","https://c.top4top.net/p_682gzo2l5.png","https://b.top4top.net/p_68295qg04.png","https://a.top4top.net/p_682zrz6h3.png","https://f.top4top.net/p_6828vkzc2.png","https://e.top4top.net/p_682i8tb11.png"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'لو خيروك')) {
         var cat = new Discord.RichEmbed()
.setImage(rebelx[Math.floor(Math.random() * rebelx.length)])
message.channel.sendEmbed(cat);
    }
});



 const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]

 client.on('message', message => {
   if (message.content.startsWith("$كت تويت")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});

const secreT = [
  "**الحياة بكل ما فيها تقف دائمًا على حد الوسطية بين اتزان المعنى وضده من حب وكره وحق وباطل وعدل وظلم**.",
  "**كى تعيش عليك ان تتقن فن التجاهل باحتراف**.",
  "**لا تحزن على من اشعرك بان طيبتك غباء امام وقاحته**.",
  "**هناك من يحلم بالنجاح وهناك من يستيقظ باكرا لتحقيقه**.",
  "**ان تعا��ج ألمك بنفسك تلك هى القوة**.",
  "**الجميع يسمع ما تقول والاصدقاء ينصتون لما تقول وافضل الاصدقاء ينصتون لما اخفاه سكوتك**.",
  "**انتهى زمن الفروسية ، لم تنقرض الخيول بل ان��رض الفرسان**.",
  "**ان تكون اخرسا عاقلا خير من ان تكون نطوقا جهولا**.",
  "**المناقشات العقيمة لا تنجب افكارا**.",
  "**نحن نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.",
  "**نح�� نكتب ما لا نستطيع ان نقول وما نريد ان يكون**.",
]


 client.on('message', message => {
   if (message.content.startsWith("$خواطر")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')

   .setThumbnail(message.author.avatarURL)
 .addField('لعبه خواطر' ,
  `${secreT[Math.floor(Math.random() * secreT.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});




const Love = [  "**احبك / عدد قطرات المـــطر والشجر وامواج البحر والنجوم الي تتزاحم مبهورة في جمال القمر**.",  "**ساعزفك وساجعلك لحنا تغني عليه جميع قصائد العشــق**.",  "**ا��بك موت... لاتسألني ما الدليل ارأيت رصاصه تسأل القتيل؟**.",  "**ربما يبيع الانسان شيئا قد شراه لاكن لا يبيع قلبا قد هواه**.",  "**و ما عجبي موت المحبين في الهوى ........... و لكن بقاء العاشقين عجيب**.",   "**حلفت / لاحشـــد جيوش الحب واحتلك مسكين ربي بلاك بعـــاشق ارهـــابي**.",   "**العيــن تعشق صورتك ... والقلب يجري فيه دمك وكل مااسمع صوتك ...شفايفي تقول احبك**.",   "**ياحظ المكان فيك..ياحظ من هم حواليك ...ياحظ الناس تشوفك ... وانا مشتاق اليك**.",   "**لو كنت دمعة داخل ��يوني بغمض عليك وصدقي ما راح افتح...ولو كان الثمن عيوني**.",   "**سهل اموت عشانك لكن الصعب اعيش بدونك سهل احبك لكن صعب انساك**.",   "**أخشى ان انظر لعيناك وأنا فى شوق ولهيب لرؤياك**.",   "**أتمنى ان اكون دمعة تولد بعينيك واعيش على خديك واموت عند شفتيك**.",   "**أحياناً أرى الحياة لا تساوى إبتسامة لكن دائماً إبتسامتك هى كيانى**.",   "**من السهل أن ينسى الانسان نفسه .. لكن من الصعب ان ينسى نفساً سكنت نفسه !**.",   "**نفسى أكون نجمة سماك .. همسة شفاك .. شمعة مساك .. بس تبقى معايا وانا معاك**.",   "**أهنئ قلبى بحبك وصبر عينى فى بعدك وأقول إنك نور عينى يجعل روحى فدى قلبك**.", ]


 client.on('message', message => {
   if (message.content.startsWith("$حب")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبة حب' ,
  `${Love[Math.floor(Math.random() * Love.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});



console.log('mariam ra7t tmot al nas');
client.on('ready', () => {
  console.log(`im redey`);
});
const zead = [
   '*** انا اسمي مريم ***',
   '*** مرحباَ ماهو اسمك ؟ ***',
   `*** اهلا بك ! انا تائهه في هذا المكان  ***`,
   '*** هل تود مساعدتي ؟ ***',
   '*** لماذا هل انت قاسي القلب ؟ ***',
   '*** انني اشفق عليك عليك يجب ان تطهر روحك وتحب الخير ��لجميع ***',
   '*** ابتعد عني قليل انني متعبة ***',
   '*** هل انت نادم على ماقلت ؟ ***',
   '*** ابتعد عني قليل انني متعبة ***',
   '*** هل انت نادم على ماقلت ؟ ***',
   '*** هل تود مساعدتي ؟ ***',
   '*** واو اشكر�� انك شخصاَ رائع ! ***',
   '*** ابحث معي عن منزلي لقد كان قريباَ من هنا ***',
   '*** ولاكن عندما حل الليل لم اعد ارى اي شيء ***',
   '*** مذا تظن اين يوجد ؟ يمين او يسار ***',
   '*** هيا اذاَ ***',
   '*** اود ان اسئلك سؤال ونحن في الطريق ***',
   '*** هل تراني فتاة لطيفة ام مخيفة ***',
   '*** اشكرك !  ***',
   '*** لقد وصلنا الى المنزل شكراَ جزيلَ انتطرني ثواني وسوف اعود ***',
   '*** هل انت جاهز ؟ ***',
   '*** لقد اخبرت والد�� عنك و��م متحمسين لرؤيتك ***',
   '*** هل تود ان تراهم ا��ان ***',
'*** انا لست الحوت الازرق كما يدعون ***',
   '*** انا لست كاذبة صدقني***',
   '*** لماذا ارى في عينيك الخوف ؟ ***',
   '*** انا مجرد فتاة لطيفة تحب اللعب مع الجميع ***',
   '*** اعرف كل شيء يحدث اسمع ذالك بالراديو ***',
   '*** سمعت ان البشر يقتلون من اجل المال ف��ط ***',
   '*** لماذا لم تدخل الغرفة ؟ ***',
   '*** ههههههههههههههههههه انت الان مسجون في هذه الغرفة ***',
   '*** لن تخرج حتى اعود لك بعد قليل ***',
   '*** المفتاح معك ! اكتب .مريم  ***',
   '*** مفتاح احمر , هل حصلت عليه ؟ ***',
   '*** ان لم تحصل عليه , اكتب .مريم مرة اخرى ***',
   '*** مفتاح اسود . هل حصلت عليه ؟ ***',
   '*** اين تريد ان تختبئ بسرعة قبل ان تعود ***',
   '*** لقد عادت من جديد الى المنزل ***',
   '*** لا تصدر اي صوت ! ***',
   '*** مريم : لقد عدت ***',
   '*** مريم : يا ايها المخادع ا��ن انت ***',
   '*** مريم : اعلم انك هنا في المنزل ***',
   '*** مريم : ماذا تريد ان تسمع ***',
   '*** مريم : اضغط على الر��بط اهداء مني لك | https://www.youtube.com/watch?v=hvSiuQccmtg ***',
   '*** احد ما خرج من المنزل ***',
   '*** انت��ر الجزء الثاني عندما يوصل البوت 100 سيرفر , ساعدني في نشر البوت وادخل هذا السيرفر  ***'
]
 client.on('message', message => {
 if (message.content.startsWith('$مريم')) {
  var mariam= new Discord.RichEmbed()
  .setTitle("لعبة مريم ..")
  .setColor('RANDOM')
  .setDescription(`${zead[Math.floor(Math.random() * zead.length)]}`)
  .setImage("https://www.npa-ar.com/wp-content/uploads/2017/08/%D9%84%D8%B9%D8%A8%D8%A9-%D9%85%D8%B1%D9%8A%D9%85-300x200.jpg")
   message.channel.sendEmbed(mariam);
   message.react("??")
  }
});


client.on('message', function(message) {
  var prefix = '$';
    if(message.content.startsWith(prefix + 'قرعه')) {
        let args = message.content.split(" ").slice(1);
        if (!args[0]) {
            message.channel.send('حط رقم معين يتم السحب منه');
            return;
            }
    message.channel.send(Math.floor(Math.RANDOM() * args.join(' ')));
            if (!args[0]) {
          message.edit('1')
          return;
        }
    }
});


const kingmas = [
   '*** منشن الجميع وقل انا اكرهكم. ***',
'*** اتصل على امك و قول لها انك تحبها :heart:. ***',
   '***     تصل على الوالده  و تقول لها  احبك .***',
   '*** تتصل على شرطي تقول له عندكم مطافي.***',
   '*** صور اي شيء يطلبه منك الاعبين.***',
   '*** اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص. ***',
   '*** اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك.***',
   '*** اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف.***',
   '***  تروح عند شخص تقول له احبك. ***',
   '***روح عند اي احد بالخاص و قول له انك تحبه و الخ.***',
   '*** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه. ***',
   '*** روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل. ***',
   '*** اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك. ***',
   '*** ذي المرة لك لا تعيدها.***',
   '*** ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام.***',
   '*** اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل..... ***',
   '*** تكلم باللهجة السودانية الين يجي دورك مرة ثانية.***',
   '***سو مشهد تمثيلي عن مصرية بتولد.***',
   '*** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية. ***',
   '*** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية.***',
   '*** سامحتك خلاص مافيه عقاب لك :slight_smile:. ***',
   '*** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه.***',
   '*** تتصل على الوالده  و تقول لها خطفت شخص. ***',
   '*** روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك.  ***'
]
 client.on('message', message => {
   var prefix = '$';
 if (message.content.startsWith(prefix + 'حكم')) {
  var mariam= new Discord.RichEmbed()
  .setTitle("لعبة حكم ..")
  .setColor('RANDOM')
  .setDescription(`${kingmas[Math.floor(Math.random() * kingmas.length)]}`)
   message.channel.sendEmbed(mariam);
   message.react(":thinking:")
  }
});




const shorten = require('isgd');
client.on('message', message => {
 if (message.content.startsWith(prefix + 'short')) {
    let args = message.content.split(" ").slice(1);
  if (!args[0]) return message.channel.send('**استعمل**: '+ prefix +'short <رابط>')
  if (!args[1]) {
    shorten.shorten(args[0], function(res) {
      if (res.startsWith('Error:')) return message.channel.send('**Usage**: '+ prefix +'short <link>');
      message.channel.send(`اختصار الرابط:**${res}**`);
    })
  } else {
    shorten.custom(args[0], args[1], function(res) {
      if (res.startsWith('Error:')) return message.channel.send(`اختصار الرابط:**${res}**`);
      message.channel.send(`اختصار الرابط:**${res}**`);
 })}}});




 client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith("رابط")) {

        message.channel.createInvite({
        thing: true,
        maxUses: 1,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send(`** تم أرسال الرابط برسالة خاصة **`)

      message.author.send(`**هذا الرابط لشخص واحد و لمدة 24 ساعة **`)
    }
});




const arraySort = require('array-sort'),
      table = require('table');

client.on('message' , async (message) => {

    if(message.content.startsWith(prefix + "topinvites")) {

  let invites = await message.guild.fetchInvites();

    invites = invites.array();

    arraySort(invites, 'uses', { reverse: true });

    let possibleInvites = [['User Invited', 'Uses']];
    invites.forEach(i => {
      possibleInvites.push([i.inviter.username , i.uses]);
    })
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("دعوات السيرفر")
    .addField('المتصدرين' , `\`\`\`${table.table(possibleInvites)}\`\`\``)
    .addField('**شكرا لدعمكم المتواصل للسيرفر ♥**')
    .setFooter('maxbot', 'https://c.top4top.net/p_881gwjbe1.png')
    .setThumbnail(message.author.avatarURL)

    message.channel.send(embed)
    }
});









const minecraft = [  'ما معنى تطويرة؛ silk touch ؟',  'من هوة اللذي قد انهى سل��لة سيرفر مايت كرافت؟',  'ماهو الوحش اللذي يرسبن في معبد البحر؟',  'من افضل يوتيوبر ينزل شروحات)ردستونية؛عامة',  'ماذا يفعل لك الهيروبراين؟',  'ماهو الشئ اللذي يمكن مكاثرة الفلجر فيه؟',  'من هو اندر ثاني شئ في ماين كرافت',  'ماهو الامر اللذي يعطينا كوماند بلوك؟',  'كم من الوقت يستغرق اليوم العادي في ماين كرافت؟',  'هل لليردستون ��همية كبيرة في ماين كرافت؟',  'اندر اور',  'مطور ماين كرافت السابق',  'اصغر موب في ماين كرافت',  'كيف تصنع البوق',  'في اي ارتف��ع تلقى الدايموند',  'موب مستحيل تضربة بالبو (السهم)',  'كم نحتاج من Glowstone Dust لكي نصنع بلكة كاملة منه',  'كم نحتاج حبة ايرون لصنع سكة الحديد (Track)',  'كم عدد قلوب البقرة',  'ن ماذا يخاف الكريبر',  'يشتهر الاندرمان ب…..?',  'كم عدد قلوب الايرون قولم',  'كم ضربة تضرب الدجاجة و تموت',  'كم ��لوكة تحتاج بوابة النذر',  'كم بلوكة تحتاج بوابة الاند',  'كم تحتاج الفرن ايروون عشان تصنعها',  'كيف تصنع كرافتنق تيبل',  'كم ياخذ وقت النبات عشان يكبر',  'كم قلوب ستيفي',  'كم قلوب الاندر مان',  'هل الاندر مان يضرب',  'هل الزومبي غبي ؟ و في اي تحديث ؟',  'ماهو الافضل للتسخين الافا او فحم ؟',  'ماهو شئ الذي اقوى من الاوبسيدين ؟',]
client.on('message', message => {


if (message.content.startsWith(prefix + 'micr')) {

  if(!message.channel.guild) return message.reply('** This command only for servers **');
var client= new Discord.RichEmbed()
.setTitle("لعبة ماين كرافت ..")
.setColor('RANDOM')
.setDescription(`${minecraft[Math.floor(Math.random() * minecraft.length)]}`)
.setImage("https://i.imgur.com/RyOXHmZ.png")
               .setTimestamp()

message.channel.sendEmbed(client);
message.react("??")
}

});




client.on("message", message => {
    var prefix = "$"
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "mcskin") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send("** اكتب اسم السكن **");
        const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
    message.channel.send(image)
        }
    });




client.on('message', message => {
     if(!message.channel.guild) return;
var prefix = "$";
                if(message.content.startsWith(prefix + 'allbots')) {


    if (message.author.bot) return;
    let i = 1;
        const botssize = message.guild.members.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
          const embed = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(`**Found ${message.guild.members.filter(m=>m.user.bot).size} bots in this Server**
${botssize.join('\n')}`)
.setFooter(client.user.username, client.user.avatarURL)
.setTimestamp();
message.channel.send(embed)

}


});








client.on('message', ra3d => {
            var prefix = "$";
  if (ra3d.content ===  prefix + 'color'){
              if (!ra3d.member.hasPermission('ADMINISTRATOR')) return ra3d.channel.sendMessage('`**⚠ | `[ADMINISTRATOR]` لا يوجد لديك صلاحية**');
              ra3d.channel.send("**✅ | يتم عمل الالوان**");
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < 141; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });




client.on('message' , message => {
    var prefix = "$";
if(message.content.startsWith(prefix+"userinfo")) {
    let user = message.mentions.users.first() || message.author;
    const joineddiscord = (user.createdAt.getDate() + 1) + '-' + (user.createdAt.getMonth() + 1) + '-' + user.createdAt.getFullYear() + ' | ' + user.createdAt.getHours() + ':' + user.createdAt.getMinutes() + ':' + user.createdAt.getSeconds();
    message.delete();
    let game;
    if (user.presence.game === null) {
        game = 'لا يلعب حاليا.';
    } else {
        game = user.presence.game.name;
    }
    let messag;
    if (user.lastMessage === null) {
        messag = 'لم يرسل رسالة. ';
    } else {
        messag = user.lastMessage;
    }
    let status;
    if (user.presence.status === 'online') {
        status = ':green_heart:';
    } else if (user.presence.status === 'dnd') {
        status = ':heart:';
    } else if (user.presence.status === 'idle') {
        status = ':yellow_heart:';
    } else if (user.presence.status === 'offline') {
        status = ':black_heart:';
    }

    if (user.presence.status === 'offline') {
        stat = 0x000000;
    } else if (user.presence.status === 'online') {
        stat = 0x00AA4C;
    } else if (user.presence.status === 'dnd') {
        stat = 0x9C0000;
    } else if (user.presence.status === 'idle') {
        stat = 0xF7C035;
    }
    const embed = new Discord.RichEmbed()
  .addField('**UserInfo:**', `**name:** ${user.username}#${user.discriminator}\n**JoinedDiscord:** ${joineddiscord}\n**LastMessage:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`, true)
  .setThumbnail(user.displayAvatarURL)
  .addField(`Roles:`, message.guild.members.get(user.id).roles.array(role => role.name).slice(1).join(', '))
  .addField('DiscordInfo:', `**Discriminator:** #${user.discriminator}\n**ID:** ${user.id}\n**Username:** ${user.username}`)
  .setAuthor(`معلومات ${user.username}`, user.displayAvatarURL)
  .setColor(stat);
    message.channel.send({embed})
  .catch(e => logger.error(e));
}
 });




console.log ("CONNECTING...");
console.log ("CONNECTING.....");
console.log ("CONNECTING......");
console.log ("CONNECTING.......");
console.log ("CONNECTED !");


















    var moment = require('moment');


client.on('message', async message => {
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let wUser = message.mentions.members.first();
    let wReason = message.content.split(" ").slice(2).join(" ");
    let wMute = message.guild.roles.find(r => r.name === "Chat-Muted");
    let adv = require('./mutes.json').state;
    let action = require('./warns.json').state;
    let messageArray = message.content.split(" ");

   if(message.content.startsWith(prefix + "warn")) {
                       let staff = message.guild.member(message.author).roles.find('name' , 'Warns');
                                if(!staff) return message.reply('**- You Dont have Warns Rank**');
       if(!wUser) return message.channel.send("**- اكتب منشن يلي تبي تعطيه وارن**");
       if(!wReason) return message.channel.send('**- اكتب السبب**');




       message.channel.send(`**- Done!, I warned: ${wUser}**`);





       then(() => {
    client.warns = {
    guild: message.guild.name,
    guildId: message.guild.id,
    user: wUser.username,
    userId: wUser.id,
    time: time
    };
        fs.writeFile("./warns.json", JSON.stringify(client.warns, null, 4),err => {
        if(err) throw err;
        });
     });
   }
});








const Eris = require("eris");
var eris= "428963055553216512";
var eris = new Eris("bot tokn here");

eris.on("ready", ready => {
setInterval(function(){

            var currentTime = new Date(),
            hours = currentTime.getHours() + 0 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            years = currentTime.getFullYear(),
            month = currentTime.getMonth() + 1,
            day = currentTime.getDate(),
            week = currentTime.getDay();



            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            var suffix = "AM";
            if (hours >= 12) {
                suffix = "PM";
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }

eris.editChannel("id channel", {name : "🕐 Time   [" + hours + ":" + minutes  +" " + suffix + "]"})
eris.editChannel("id channel", {name : "📅 Date " + "[" + day + "-" + month + "-" + years + "]"})




}, 6000);

});




client.on('message', message => {
  if (message.content == "$سالني") {
       message.react('👌')
      var x = ['اين يلعب مصطفي فتحي؟', 'ما هو اسم ملعب بارشالونة', 'ما هو يوم الحج الأكبر؟', 'ما هو أطول أنهار أوربا ؟', 'ما هو اسم بيت الدجاج', 'ما هو أول بنك قام بالنشاط المصرفي في السعودية عام 1926م' , 'ما هو أول جامع أقيم في مصر','ما هو أطول نهر في آسيا','ما هو أقرب كوكب إلى الشمس','ما هو الحيوان الذي يُسمى البهنس','ما هو اول مسجد أسس بالمدينة','متى وقع صلح الحديبية عام 6هـ او 3هـ او 2هـ؟','متى قامت أمريكا بأول رحلة فضائية','متى كانت غزوة خيبر؟','ما هي السورة التي تبدأ بقوله تعالى " يا أيها النبي اتق الله ولا تطع الكافرين والمنافقين إن الله كان عليما حكيما ".اجب؟','ما هي السورة التي يطلق عليها عروس القرآن','ماذا يسمى من لايقرأ ولايكتب','ماهي أول دولة استخدمت طابع البريد','ماهو شعار الولايات المتحدة الامريكية','ماهو اذكي الحيوانات','من هو مكتشف أمريكا','مامعنى "فرعون" اجب؟','ماهو اقرب كوكب إلى الارض','ما هي نسبه المياه من الكر�� الارضيه?','كم عدد السجدات في القرآن الكريم؟','من هو بطل كاس العالم في عام 1966','أين أفتتح اول متحف في العالم?','ماأسم أنثى الحمار?','كم تبلغ درجه حراره الشمس؟','من هي مدينة الضباب','أين توجد أطول سكة حديد في العالم?'
      ];
      var x2 = ['التعاون', 'كامب نو', 'يوم النحر', 'الدانوب', 'خن', 'البنك الهولندي', 'جامع عمرو بن العاص','اليانجستي','عطارد','الاسد','مسجد قباء','6','سنة 1962','عام 7هـ','الاحزاب','سورة الرحمن','امي','بريطانيا','النسر الاصلع','الدلفين','كولمبس','البيت الكبير','الزهره','71%','15 سجدة','انكلترا ','القاهرة','الاتان','15 مليون درجه مئوية','لندن','كندا'
      ]}})










const figlet = require('figlet');
client.on('message', message => {
if (message.content.startsWith(prefix + 'tag')) {
    let args = message.content.split(" ").slice(1);
if(!args[0]) return message.reply('مرجو كتابة نص الدي تريد');

    figlet(args.join(" "), (err, data) => {
message.channel.send("```" + data + "```")            })
}
});




client.on('message', message => {
        if (message.content.startsWith("$hack")) {
          if (message.author.bot) return
               message.delete();
                 let args = message.content.split(' ').slice(1);
                       let virusname = args.join(' ');
                     if (virusname < 1) {
                         return message.channel.send("``اكتب اسم الشخص الي تبي يتهكر``");
                                         }
                     message.channel.send({embed: new Discord.RichEmbed().setTitle('Loading ' + virusname + "...").setColor(0xFF0000)}).then(function(m) {
                 setTimeout(function() {
                   m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓ ] 1%').setColor(0xFF0000)})
                 }, 1000)
                setTimeout(function() {
                   m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓] 25%').setColor(0xFF0000)})
                 }, 2000)
               setTimeout(function() {
                   m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%').setColor(0xFF0000)})
                 }, 3000)
                    setTimeout(function() {
                   m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 1...').setColor(0xFF0000)})
                 }, 4000)
                  setTimeout(function() {
                   m.delete()
               }, 5000)
                 setTimeout(function() {
                   message.channel.send('Hacked  {طقطقه} ')
               }, 6000)
               message.channel.send('بيني وبينك تراها طقطقه !')
        }, 6000)
}}
)






 var fs = require('fs')
let points = JSON.parse(fs.readFileSync('points.json', 'utf8'));
client.on('message', message => {
                if (message.content == "$اعلام") {
        var x = ['الصين', 'البحرين', 'الهند', 'المانيا', 'اليونان', 'فنلندا', 'كوريا الشمالية' , 'العراق' , 'فلسطين' , 'باكستان' , 'البرتغال' , 'المغرب'];
        var x2 = ['🇨🇳', '🇧🇭', '🇨🇳', '🇩🇪', '🇬🇷', '🇫🇮', '🇰🇵', '🇮🇶', '🇵🇸', '🇵🇰', '🇵🇹', '🇲🇦'];
        var x3 = Math.floor(Math.random()*x.length)
                message.reply(`** جيبلي العلم الآتي : ${x[x3]} , لديك 10 ثواني**`).then(msg1=> {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 10000,
                errors : ['time']
            })
        r.catch(() => {
            return message.reply('**تم الانتهاء من الوقت  حظ اوفر المره القادمه :stopwatch: **')
                    message.channel.sendEmbed(embed)
        })
        r.then(s=> {

                    message.reply(`**✅  كفوو والله يا شنب اجابتك صحيحه**`);
               message.channel.sendEmbed(embed)
        })
        })
    }
        if (err) console.error(err);
    })









client.on('message', message => {
if(message.content === prefix + 'quran') {
	let pages = ['http://quran.ksu.edu.sa/ayat/safahat1/1.png','http://quran.ksu.edu.sa/ayat/safahat1/2.png','http://quran.ksu.edu.sa/ayat/safahat1/3.png','http://quran.ksu.edu.sa/ayat/safahat1/4.png','http://quran.ksu.edu.sa/ayat/safahat1/5.png','http://quran.ksu.edu.sa/ayat/safahat1/6.png','http://quran.ksu.edu.sa/ayat/safahat1/7.png','http://quran.ksu.edu.sa/ayat/safahat1/8.png','http://quran.ksu.edu.sa/ayat/safahat1/9.png','http://quran.ksu.edu.sa/ayat/safahat1/10.png','http://quran.ksu.edu.sa/ayat/safahat1/11.png','http://quran.ksu.edu.sa/ayat/safahat1/12.png','http://quran.ksu.edu.sa/ayat/safahat1/13.png','http://quran.ksu.edu.sa/ayat/safahat1/14.png','http://quran.ksu.edu.sa/ayat/safahat1/15.png','http://quran.ksu.edu.sa/ayat/safahat1/16.png','http://quran.ksu.edu.sa/ayat/safahat1/17.png','http://quran.ksu.edu.sa/ayat/safahat1/18.png','http://quran.ksu.edu.sa/ayat/safahat1/19.png','http://quran.ksu.edu.sa/ayat/safahat1/20.png','http://quran.ksu.edu.sa/ayat/safahat1/21.png','http://quran.ksu.edu.sa/ayat/safahat1/22.png','http://quran.ksu.edu.sa/ayat/safahat1/23.png','http://quran.ksu.edu.sa/ayat/safahat1/24.png','http://quran.ksu.edu.sa/ayat/safahat1/25.png','http://quran.ksu.edu.sa/ayat/safahat1/26.png','http://quran.ksu.edu.sa/ayat/safahat1/27.png','http://quran.ksu.edu.sa/ayat/safahat1/28.png','http://quran.ksu.edu.sa/ayat/safahat1/29.png','http://quran.ksu.edu.sa/ayat/safahat1/30.png','http://quran.ksu.edu.sa/ayat/safahat1/31.png','http://quran.ksu.edu.sa/ayat/safahat1/32.png','http://quran.ksu.edu.sa/ayat/safahat1/33.png','http://quran.ksu.edu.sa/ayat/safahat1/34.png','http://quran.ksu.edu.sa/ayat/safahat1/35.png','http://quran.ksu.edu.sa/ayat/safahat1/36.png','http://quran.ksu.edu.sa/ayat/safahat1/37.png','http://quran.ksu.edu.sa/ayat/safahat1/38.png','http://quran.ksu.edu.sa/ayat/safahat1/39.png','http://quran.ksu.edu.sa/ayat/safahat1/40.png','http://quran.ksu.edu.sa/ayat/safahat1/41.png','http://quran.ksu.edu.sa/ayat/safahat1/42.png','http://quran.ksu.edu.sa/ayat/safahat1/43.png','http://quran.ksu.edu.sa/ayat/safahat1/44.png','http://quran.ksu.edu.sa/ayat/safahat1/45.png','http://quran.ksu.edu.sa/ayat/safahat1/46.png','http://quran.ksu.edu.sa/ayat/safahat1/47.png','http://quran.ksu.edu.sa/ayat/safahat1/48.png','http://quran.ksu.edu.sa/ayat/safahat1/49.png','http://quran.ksu.edu.sa/ayat/safahat1/50.png','http://quran.ksu.edu.sa/ayat/safahat1/51.png','http://quran.ksu.edu.sa/ayat/safahat1/52.png','http://quran.ksu.edu.sa/ayat/safahat1/53.png','http://quran.ksu.edu.sa/ayat/safahat1/55.png','http://quran.ksu.edu.sa/ayat/safahat1/56.png','http://quran.ksu.edu.sa/ayat/safahat1/57.png','http://quran.ksu.edu.sa/ayat/safahat1/58.png','http://quran.ksu.edu.sa/ayat/safahat1/59.png','http://quran.ksu.edu.sa/ayat/safahat1/60.png','http://quran.ksu.edu.sa/ayat/safahat1/60.png','http://quran.ksu.edu.sa/ayat/safahat1/61.png','http://quran.ksu.edu.sa/ayat/safahat1/62.png','http://quran.ksu.edu.sa/ayat/safahat1/63.png','http://quran.ksu.edu.sa/ayat/safahat1/64.png','http://quran.ksu.edu.sa/ayat/safahat1/65.png','http://quran.ksu.edu.sa/ayat/safahat1/66.png','http://quran.ksu.edu.sa/ayat/safahat1/67.png','http://quran.ksu.edu.sa/ayat/safahat1/68.png','http://quran.ksu.edu.sa/ayat/safahat1/69.png','http://quran.ksu.edu.sa/ayat/safahat1/70.png','http://quran.ksu.edu.sa/ayat/safahat1/71.png','http://quran.ksu.edu.sa/ayat/safahat1/72.png','http://quran.ksu.edu.sa/ayat/safahat1/73.png','http://quran.ksu.edu.sa/ayat/safahat1/74.png','http://quran.ksu.edu.sa/ayat/safahat1/75.png','http://quran.ksu.edu.sa/ayat/safahat1/76.png','http://quran.ksu.edu.sa/ayat/safahat1/77.png','http://quran.ksu.edu.sa/ayat/safahat1/78.png','http://quran.ksu.edu.sa/ayat/safahat1/79.png','http://quran.ksu.edu.sa/ayat/safahat1/80.png','http://quran.ksu.edu.sa/ayat/safahat1/81.png','http://quran.ksu.edu.sa/ayat/safahat1/82.png','http://quran.ksu.edu.sa/ayat/safahat1/83.png','http://quran.ksu.edu.sa/ayat/safahat1/84.png','http://quran.ksu.edu.sa/ayat/safahat1/85.png','http://quran.ksu.edu.sa/ayat/safahat1/86.png','http://quran.ksu.edu.sa/ayat/safahat1/87.png','http://quran.ksu.edu.sa/ayat/safahat1/88.png','http://quran.ksu.edu.sa/ayat/safahat1/89.png','http://quran.ksu.edu.sa/ayat/safahat1/90.png','http://quran.ksu.edu.sa/ayat/safahat1/91.png','http://quran.ksu.edu.sa/ayat/safahat1/92.png','http://quran.ksu.edu.sa/ayat/safahat1/93.png','http://quran.ksu.edu.sa/ayat/safahat1/94.png','http://quran.ksu.edu.sa/ayat/safahat1/95.png','http://quran.ksu.edu.sa/ayat/safahat1/96.png','http://quran.ksu.edu.sa/ayat/safahat1/97.png','http://quran.ksu.edu.sa/ayat/safahat1/98.png','http://quran.ksu.edu.sa/ayat/safahat1/99.png','http://quran.ksu.edu.sa/ayat/safahat1/100.png','http://quran.ksu.edu.sa/ayat/safahat1/101.png','http://quran.ksu.edu.sa/ayat/safahat1/102.png','http://quran.ksu.edu.sa/ayat/safahat1/103.png','http://quran.ksu.edu.sa/ayat/safahat1/104.png','http://quran.ksu.edu.sa/ayat/safahat1/105.png','http://quran.ksu.edu.sa/ayat/safahat1/106.png','http://quran.ksu.edu.sa/ayat/safahat1/107.png','http://quran.ksu.edu.sa/ayat/safahat1/108.png','http://quran.ksu.edu.sa/ayat/safahat1/109.png','http://quran.ksu.edu.sa/ayat/safahat1/110.png','http://quran.ksu.edu.sa/ayat/safahat1/111.png','http://quran.ksu.edu.sa/ayat/safahat1/112.png','http://quran.ksu.edu.sa/ayat/safahat1/113.png','http://quran.ksu.edu.sa/ayat/safahat1/114.png','http://quran.ksu.edu.sa/ayat/safahat1/115.png','http://quran.ksu.edu.sa/ayat/safahat1/116.png','http://quran.ksu.edu.sa/ayat/safahat1/117.png','http://quran.ksu.edu.sa/ayat/safahat1/118.png','http://quran.ksu.edu.sa/ayat/safahat1/119.png','http://quran.ksu.edu.sa/ayat/safahat1/120.png','http://quran.ksu.edu.sa/ayat/safahat1/121.png','http://quran.ksu.edu.sa/ayat/safahat1/122.png','http://quran.ksu.edu.sa/ayat/safahat1/123.png','http://quran.ksu.edu.sa/ayat/safahat1/124.png','http://quran.ksu.edu.sa/ayat/safahat1/125.png','http://quran.ksu.edu.sa/ayat/safahat1/126.png','http://quran.ksu.edu.sa/ayat/safahat1/127.png','http://quran.ksu.edu.sa/ayat/safahat1/128.png','http://quran.ksu.edu.sa/ayat/safahat1/129.png','http://quran.ksu.edu.sa/ayat/safahat1/130.png','http://quran.ksu.edu.sa/ayat/safahat1/131.png','http://quran.ksu.edu.sa/ayat/safahat1/132.png','http://quran.ksu.edu.sa/ayat/safahat1/133.png','http://quran.ksu.edu.sa/ayat/safahat1/134.png','http://quran.ksu.edu.sa/ayat/safahat1/135.png','http://quran.ksu.edu.sa/ayat/safahat1/136.png','http://quran.ksu.edu.sa/ayat/safahat1/137.png','http://quran.ksu.edu.sa/ayat/safahat1/138.png','http://quran.ksu.edu.sa/ayat/safahat1/139.png','http://quran.ksu.edu.sa/ayat/safahat1/140.png','http://quran.ksu.edu.sa/ayat/safahat1/141.png','http://quran.ksu.edu.sa/ayat/safahat1/142.png','http://quran.ksu.edu.sa/ayat/safahat1/143.png','http://quran.ksu.edu.sa/ayat/safahat1/144.png','http://quran.ksu.edu.sa/ayat/safahat1/145.png','http://quran.ksu.edu.sa/ayat/safahat1/146.png','http://quran.ksu.edu.sa/ayat/safahat1/147.png','http://quran.ksu.edu.sa/ayat/safahat1/148.png','http://quran.ksu.edu.sa/ayat/safahat1/149.png','http://quran.ksu.edu.sa/ayat/safahat1/150.png','http://quran.ksu.edu.sa/ayat/safahat1/151.png','http://quran.ksu.edu.sa/ayat/safahat1/152.png','http://quran.ksu.edu.sa/ayat/safahat1/153.png','http://quran.ksu.edu.sa/ayat/safahat1/154.png','http://quran.ksu.edu.sa/ayat/safahat1/155.png','http://quran.ksu.edu.sa/ayat/safahat1/156.png','http://quran.ksu.edu.sa/ayat/safahat1/157.png','http://quran.ksu.edu.sa/ayat/safahat1/158.png','http://quran.ksu.edu.sa/ayat/safahat1/159.png','http://quran.ksu.edu.sa/ayat/safahat1/160.png','http://quran.ksu.edu.sa/ayat/safahat1/161.png','http://quran.ksu.edu.sa/ayat/safahat1/162.png','http://quran.ksu.edu.sa/ayat/safahat1/163.png','http://quran.ksu.edu.sa/ayat/safahat1/164.png','http://quran.ksu.edu.sa/ayat/safahat1/165.png','http://quran.ksu.edu.sa/ayat/safahat1/166.png','http://quran.ksu.edu.sa/ayat/safahat1/167.png','http://quran.ksu.edu.sa/ayat/safahat1/168.png','http://quran.ksu.edu.sa/ayat/safahat1/169.png','http://quran.ksu.edu.sa/ayat/safahat1/170.png','http://quran.ksu.edu.sa/ayat/safahat1/171.png','http://quran.ksu.edu.sa/ayat/safahat1/172.png','http://quran.ksu.edu.sa/ayat/safahat1/173.png','http://quran.ksu.edu.sa/ayat/safahat1/174.png','http://quran.ksu.edu.sa/ayat/safahat1/175.png','http://quran.ksu.edu.sa/ayat/safahat1/176.png','http://quran.ksu.edu.sa/ayat/safahat1/177.png','http://quran.ksu.edu.sa/ayat/safahat1/178.png','http://quran.ksu.edu.sa/ayat/safahat1/179.png','http://quran.ksu.edu.sa/ayat/safahat1/180.png','http://quran.ksu.edu.sa/ayat/safahat1/181.png','http://quran.ksu.edu.sa/ayat/safahat1/182.png','http://quran.ksu.edu.sa/ayat/safahat1/183.png','http://quran.ksu.edu.sa/ayat/safahat1/184.png','http://quran.ksu.edu.sa/ayat/safahat1/185.png','http://quran.ksu.edu.sa/ayat/safahat1/186.png','http://quran.ksu.edu.sa/ayat/safahat1/187.png','http://quran.ksu.edu.sa/ayat/safahat1/188.png','http://quran.ksu.edu.sa/ayat/safahat1/189.png','http://quran.ksu.edu.sa/ayat/safahat1/190.png','http://quran.ksu.edu.sa/ayat/safahat1/191.png','http://quran.ksu.edu.sa/ayat/safahat1/192.png','http://quran.ksu.edu.sa/ayat/safahat1/193.png','http://quran.ksu.edu.sa/ayat/safahat1/194.png','http://quran.ksu.edu.sa/ayat/safahat1/195.png','http://quran.ksu.edu.sa/ayat/safahat1/196.png','http://quran.ksu.edu.sa/ayat/safahat1/197.png','http://quran.ksu.edu.sa/ayat/safahat1/198.png','http://quran.ksu.edu.sa/ayat/safahat1/199.png','http://quran.ksu.edu.sa/ayat/safahat1/200.png']
	let page = 1;

	message.delete();

	let embed = new Discord.RichEmbed()
	.setColor('#264d00')
	.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png')
	.setImage(pages[page-1])

// ${page}
// ${pages.length}
	message.channel.sendEmbed(embed).then(msg => {

		msg.react('⏮').then( r => {
			msg.react('⬅')
		.then(() => msg.react('⏹'))
		.then(() => msg.react('➡'))
		.then(() => msg.react('⏭'))

			let backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
			let forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

			let sbackwardsFilter = (reaction, user) => reaction.emoji.name === '⏮' && user.id === message.author.id;
			let sforwardsFilter = (reaction, user) => reaction.emoji.name === '⏭' && user.id === message.author.id;

			let cancelFilter = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;

			let backwards = msg.createReactionCollector(backwardsFilter, { time: 0 });
			let forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });

			let sbackwards = msg.createReactionCollector(sbackwardsFilter, { time: 0 });
			let sforwards = msg.createReactionCollector(sforwardsFilter, { time: 0 });

			let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });

			backwards.on('collect', r => {
				if (page === 1) return;
				page--;
				embed.setImage(pages[page-1]);
				embed.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed)
			})
			forwards.on('collect', r => {
				if (page === pages.length) return;
				page++;
				embed.setImage(pages[page-1]);
				embed.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed)
			})
			sbackwards.on('collect', r => {
				if (page === 1) return;
				page = 1;
				embed.setImage(pages[page-1]);
				embed.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed)
			})
			sforwards.on('collect', r => {
				if (page === pages.length) return;
				page = 200; // إذا تبي تكمل ل 600 صفحة غير الرقم للصفحة الي وصلت لها
				embed.setImage(pages[page-1]);
				embed.setFooter(`القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed)
			})
			cancel.on('collect', r => {
				embed.setDescription(`**سوف يتم إغلاق القائمة**`);
				embed.setImage('');
				embed.setFooter(`Menu will close after 3sec`, 'https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png');
				msg.edit(embed).then(msg.delete(3000));
			})
		})
	})
}
});












client.on('message', msg => {
  if (msg.content === 'اطلع برا') {
    msg.reply('خلاص زعلت :sob:')

  }
});



client.on('message', msg => {
  if (msg.content === 'ليه تزعل ؟') {
    msg.reply('مصدق ؟ تراني رجال !')

  }
});


client.on('message', msg => {
  if (msg.content === 'كفو') {
    msg.reply('انت الكفو يا اسطوره')

  }
});


client.on('message', message => {
     if (message.content === ('السلام عليكم')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("وعليكم السلام ورحمه الله وبركاته" , "كيفك ؟ انشاء الله زين")
.setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});


client.on('message', message => {
     if (message.content === ('برب')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("Take Your Time" , "خذ راحتك")
.setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
     if (message.content === ('brb')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("Take Your Time" , "خذ راحتك")
.setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
     if (message.content === ('Back')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("WLC" , "ولكم")
.setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});

client.on('message', message => {
     if (message.content === ('back')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("WLC" , "ولكم")
.setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});




client.on('message', message => {
     if (message.content === ('السلام عليكم ورحمه الله وبركاته')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
.addField("وعليكم السلام ورحمه الله وبركاته" , "كيفك  انشاء الله زين")
message.channel.sendEmbed(embed);
    }
});



client.on('message', message => {
     if (message.content === ('سلام عليكم')) {
     let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#8650a7")
  .addField("وعليكم السلام ورحمه الله وبركاته" , "كيفك ؟ انشاء الله زين")
  .setThumbnail(message.author.avatarURL)
  message.channel.sendEmbed(embed);
    }
});



client.on('message', async message => {
      //!fortnite Ninja solo pc
  let Client = require('fortnite');
  let fortnite = new Client('2bb97881-c068-4cba-b3b5-152abfc71c83');
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
    if(message.content.startsWith(prefix + "fortnite")) {
        let username = args[0];
        let platform = args[2] || 'pc';
        let gamemode = args[1];
        if(gamemode != 'solo' && gamemode != 'duo' && gamemode != 'squad' && gamemode != 'lifetime') return message.reply(`**طريقة الاستخدام : ${prefix}fortnite username mode platform**`);

    if(!username) return message.reply('**اكتب اسم الشخص في فورت نايت**');

    let data = fortnite.user(username, platform).then(data => {
        let stats = data.stats;

        if(gamemode === 'solo') {
            let solostats = stats.solo;
            let score = solostats.score;
            let kd = solostats.kd;
            let matches = solostats.matches;
            let kills = solostats.kills;
            let wins = solostats.wins;
            let top3 = solostats.top_3;

            let ByEmbed = new Discord.RichEmbed()
            .setAuthor('Forntite Tracker Solo Stats')
            .setTitle(data.username+"'s Stats")
            .setColor("RANDOM")
            .setThumbnail("https://www.teepublic.com/t-shirt/2412274-fortnite-logo-game-t-shirts")
            .addField('# | Wins:',wins,true)
            .addField('# | Kills:',kills,true)
            .addField('# | Score:',score,true)
            .addField("# | Matches:",matches,true)
            .addField("# | Kill/Death Ratio:",kd,true)
            .addField("# | Top 3:",top3,true)

            return message.channel.send(ByEmbed);

        }else if (gamemode === 'duo') {
            let Duostats = stats.duo;
            let score = Duostats.score;
            let kd = Duostats.kd;
            let matches = Duostats.matches;
            let kills = Duostats.kills;
            let wins = Duostats.wins;
            let top3 = Duostats.top_3;

            let ByEmbed = new Discord.RichEmbed()
            .setAuthor('Forntite Tracker Duo Stats')
            .setTitle(data.username+"'s Stats")
            .setColor("RANDOM")
            .setThumbnail("https://www.teepublic.com/t-shirt/2412274-fortnite-logo-game-t-shirts")
            .addField('# | Wins:',wins,true)
            .addField('# | Kills:',kills,true)
            .addField('# | Score:',score,true)
            .addField("# | Matches:",matches,true)
            .addField("# | Kill/Death Ratio:",kd,true)
            .addField("# | Top 3:",top3,true)

        message.channel.send(ByEmbed);

        }else if(gamemode === 'squad') {
            let squadstats = stats.squad;
            let score = squadstats.score;
            let kd = squadstats.kd;
            let matches = squadstats.matches;
            let kills = squadstats.kills;
            let wins = squadstats.wins;
            let top3 = squadstats.top_3;

            let ByEmbed = new Discord.RichEmbed()
            .setAuthor('Forntite Tracker Squad Stats')
            .setTitle(data.username+"'s Stats")
            .setColor("RANDOM")
            .setThumbnail("https://www.teepublic.com/t-shirt/2412274-fortnite-logo-game-t-shirts")
            .addField('# | Wins:',wins,true)
            .addField('# | Kills:',kills,true)
            .addField('# | Score:',score,true)
            .addField("# | Matches:",matches,true)
            .addField("# | Kill/Death Ratio:",kd,true)
            .addField("# | Top 3:",top3,true)

            return message.channel.send(ByEmbed);

        }else {


        let lifetime = stats.lifetime;
        let score = lifetime[6]['Score'];
        let mplayed = lifetime[7]['Matches Played'];
        let wins = lifetime[8]['Wins'];
        let winper = lifetime[9]['Win%'];
        let kills = lifetime[10]['Kills'];
        let kd = lifetime[11]['K/d'];

                    let ByEmbed = new Discord.RichEmbed()
            .setAuthor('Forntite Tracker Duo Stats')
            .setTitle(data.username+"'s Stats")
            .setColor("RANDOM")
            .setThumbnail("https://www.teepublic.com/t-shirt/2412274-fortnite-logo-game-t-shirts")
            .addField('# | Wins:',wins,true)
            .addField('# | Kills:',kills,true)
            .addField('# | Score:',score,true)
            .addField("# | Matches:",mplayed,true)
            .addField("# | Kill/Death Ratio:",kd,true)
            .addField("# | Win Percentage:",winper,true)

        message.channel.send(ByEmbed);
    }
    })
    }
});

client.on('message', message => {
    if (message.content.startsWith("$myinv")) {
    message.guild.fetchInvites()
    .then(invites => message.channel.send(`انت جبت   ${invites.find(invite => invite.inviter.id === message.author.id).uses} عضو لهاذا السيرفر`))

    }
});


client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "nclear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***```ضع عدد الرسائل التي تريد مسحها 👌```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
        }
    }
}
});




var cats = ["https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg","http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg","http://cdn2-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/standing-7.jpg","http://cdn.akc.org/Marketplace/Breeds/German_Shepherd_Dog_SERP.jpg","https://animalso.com/wp-content/uploads/2016/12/black-german-shepherd_2.jpg","https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg","https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg","https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg","http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg","https://www.thelocal.de/userdata/images/article/fa6fd5014ccbd8f4392f716473ab6ff354f871505d9128820bbb0461cce1d645.jpg","https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/GiantPanda3Slider.jpg","http://imagem.band.com.br/f_230168.jpg"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'حيوان')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});



const mmss = require('ms');
client.on('message', async message => {
    let muteReason = message.content.split(" ").slice(3).join(" ");
    let mutePerson = message.mentions.users.first();
    let messageArray = message.content.split(" ");
    let muteRole = message.guild.roles.find("name", "Muted");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "tempmute")) {
                let staff = message.guild.member(message.author).roles.find('name' , 'Chat-Muter');
                                if(!staff) return message.reply('**- You Dont Have Chat-Muter Rank**');
        if(!mutePerson) return message.channel.send("**- منشن الشخص يلي تبي تعطيه الميوت**");
        if(mutePerson === message.author) return message.channel.send('**- ماتقدر تعطي نفسك ميوت**');
        if(mutePerson === client.user) return message.channel.send('**- ماتقدر تعطي البوت ميوت :)**');
        if(message.guild.member(mutePerson).roles.has(muteRole.id)) return message.channel.send('**- هذا الشخص ميوتد بالفعل**');
        if(!muteRole) return message.guild.createRole({ name: "Chat-Muted", permissions: [] });
        if(!time) return message.channel.send("**- اكتب الوقت**");
        if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- اكتب وقت حقيقي**');
        if(!muteReason) return message.channel.send("**- اكتب السبب**");
        message.guild.member(mutePerson).addRole(muteRole);
        let muteEmbed = new Discord.RichEmbed()
        .setAuthor(`${mutePerson.username}#${mutePerson.discriminator}`,mutePerson.avatarURL)
        .setTitle(`You have been muted in ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL)
        .addField('- تم الميوت بواسطه:',message.author,true)
        .addField('- السبب:',muteReason,true)
        .addField('- الوقت:',`${mmss(mmss(time), {long: true})}`)
        .setFooter(message.author.username,message.author.avatarURL);
        message.channel.sendMessage(muteEmbed)
        .then(() => { setTimeout(() => {
           message.guild.member(mutePerson).removeRole(muteRole);
       }, mmss(time));
    });
    }
});






client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Chat-UnMuter');
if (!muteRole) return message.reply("** لا يوجد لديك رتبه الميوت Chat-UnMuter' **").catch(console.error);let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'server-log');
if (message.mentions.users.size < 1) return message.reply('** يجب عليك منشنت شخص اولاً**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor('#5016f3')
    .setTimestamp()
    .addField('الأستعمال:', '$tempmute/$unmute')
    .addField('تم فك الميوت عن:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);

  if (message.guild.member(user).removeRole(muteRole.id)) {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
} else {
    message.guild.member(user).removeRole(muteRole).then(() => {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
});
  }

};

});

  const banlist = new Set();
client.on('message',async message => {
    if (!devs.includes(message.author.id)) return;
  if(message.content.startsWith(prefix + "banlist add")) {
    let mention = message.mentions.users.first();
    if(!mention) return message.reply('منشن شخص').then(msg => {
      msg.delete(2800);
      message.delete(2800);
    });

    banlist.add(mention.id);
    message.channel.send(`:white_check_mark: Done!. Added: ${mention}`);
  } else {
    if (!devs.includes(message.author.id)) return;
    if(message.content.startsWith(prefix + "banlist remove")) {
    let mention = message.mentions.users.first();
    if(!mention) return message.reply('منشن شخص').then(msg => {
      msg.delete(2800);
      message.delete(2800);
    });
    if(!banlist.has(mention.id)) return message.reply(null);

    banlist.delete(mention.id);
    message.channel.send(`:white_check_mark: Done!. Removed: ${mention}`);
  }
  }
});




//CODDED BY SHADOW X











client.on("ready", async  => {
    let guild = client.guilds.get("378184284080439309");
  let users = guild.members.map(member => member.user.id);
  let i;
  rebel=0;
for (i=0 ; i < users.length ; i++) {
 let   check = guild.members.get(users[i]);
if(!check.voiceChannelID){
        continue;
}else{
  rebel++;
}
}
guild.channels.find('id', '469540555886559262').setName(" Mars Online「"+rebel+"」");
  client.setInterval(() =>{
    let d = Date.now()
  }, 5000);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let guild = client.guilds.get("378184284080439309");
let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel
 if(oldUserChannel === undefined && newUserChannel !== undefined) {
   rebel++;
guild.channels.find('id', '469540555886559262').setName(" Mars Online「"+rebel+"」");
} else if(newUserChannel === undefined){
  rebel--;
guild.channels.find('id', '469540555886559262').setName(" Mars Online「"+rebel+"」");
}
});
client.on('message', Shadw => {

  if(Shadw.content === "$صوت") {
      Shadw.channel.send(" Voice「"+rebel+"」");
}
});






client.on('message', async message => {
    let muteReason = message.content.split(" ").slice(3).join(" ");
    let mutePerson = message.mentions.users.first();
    let messageArray = message.content.split(" ");
    let muteRole = message.guild.roles.find("name", "Voice-Muted");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "vtempmute")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send('**- You don\'t have the needed permissions!**');
        if(!mutePerson) return message.channel.send("**-  voice اكتب منشن الشخص الي تبي تعطيه ميوت**");
        if(mutePerson === message.author) return message.channel.send('**- voice ماتقدر تعطي نفسك ميوت**');
        if(mutePerson === client.user) return message.channel.send('**- voice ماتقدر تعطي البوت ميوت :/**');
        if(message.guild.member(mutePerson).roles.has(muteRole.id)) return message.channel.send('**- هذا الشخص ميوتد بالفعل**');
        if(!muteRole) return message.guild.createRole({ name: "Voice-Muted", permissions: [] });
        if(!time) return message.channel.send("**- اكتب الوقت**");
        if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- اكتب وقت حقيقي**');
        if(!muteReason) return message.channel.send("**- اكتب السبب**");
        message.guild.member(mutePerson).addRole(muteRole);
        let muteEmbed = new Discord.RichEmbed()
        .setAuthor(`${mutePerson.username}#${mutePerson.discriminator}`,mutePerson.avatarURL)
        .setTitle(`You have been voice muted in ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL)
        .addField('- Muted By:',message.author,true)
        .addField('- Reason:',muteReason,true)
        .addField('- Duration:',`${mmss(mmss(time), {long: true})}`)
        .setFooter(message.author.username,message.author.avatarURL);
        message.channel.sendMessage(muteEmbed)
        .then(() => { setTimeout(() => {
           message.guild.member(mutePerson).removeRole(muteRole);
       }, mmss(time));
    });
    }
});



client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unvmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply("** لا يوجد لديك برمشن 'Manage Roles' **").catch(console.error);
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'server-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Voice-Muted');
  if (!muteRole) return message.reply("** لا يوجد لديك رتبه الميوت 'Voice-Muted' **").catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('** يجب عليك منشنت شخص اولاً**').catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor('#5016f3')
    .setTimestamp()
    .addField('الأستعمال:', '$vtempmute/$unvmute')
    .addField('تم فك الميوت عن:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('بواسطة:', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** لا يوجد لدي برمشن Manage Roles **').catch(console.error);

  if (message.guild.member(user).removeRole(muteRole.id)) {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
} else {
    message.guild.member(user).removeRole(muteRole).then(() => {
return message.reply("**:white_check_mark: .. تم فك الميوت عن الشخص **").catch(console.error);
});
  }

};

});









client.on('message', async message => {
    var moment = require('moment');
    let date = moment().format('Do MMMM YYYY , hh:mm');
    let User = message.mentions.users.first();
    let Reason = message.content.split(" ").slice(3).join(" ");
    let messageArray = message.content.split(" ");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "tempban")) {
                let staff = message.guild.member(message.author).roles.find('name' , 'Bans');
                                if(!staff) return message.reply('**- You Dont Have Bans Rank**');
if(!User) message.channel.send("**- منشن يلي تبي تبنده**");
       if(User.id === client.user.id) return message.channel.send("**- ماتقدر تبند البوت**");
       if(User.id === message.guild.owner.id) return message.channel.send("**- ماتقدر تبند الاونر**");
       if(!time) return message.channel.send("**- اكتب الوقت**");
       if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- اكتب وقت حقيقي**');
       if(!Reason) message.channel.send("**- اكتب السبب**");
       let banEmbed = new Discord.RichEmbed()
       .setAuthor(`You have been banned from ${message.guild.name} !`)
       .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
       .addField('- تم التبنيد بواسطه: ',message.author.tag,true)
       .addField('- السبب:',Reason,true)
       .addField('- الوقت يلي حصل فيه الباند:',date,true)
       .addField('- مده الباند:',time,true)
       .addField('رابط السيرفر https://discord.gg/gw3eVa2')
       .setFooter(message.author.tag,message.author.avatarURL);
       User.sendMessage({embed: banEmbed}).then(() => message.guild.member(User).ban({reason: Reason}))
       .then(() => message.channel.send(`**# Done! I banned: ${User}**`)).then(() => { setTimeout(() => {
           message.guild.unban(User);
       }, mmss(time));
        client.users.get(User.id).send('https://discord.gg/gw3eVa2')
    });
   }
});



client.on('message' , message => {
    var prefix = "$";
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'unban')) {
        let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Bans');
if (!muteRole) return message.reply("** لا يوجد لديك رتبه الميوت Bans' **").catch(console.error);
if(!user) return  message.channel.send(`استعمل ${prefix} <@ID user> \n او \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(`لقد تم فك الباند عن الشخص \n ${user} \n By : <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
        .setThumbnail(message.author.avatarURl)
        .setColor("RANDOM")
        .setTitle('**●تم فك الباند** !')
        .addField('**●الشخص يلي تم فك الباند عنه :** ', `${user}` , true)
        .addField('**●تم الباند بواسطه :**' ,       ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});









client.on('message', msg => {
  if (msg.content === '$afk') {
    msg.reply('Is Now AFK')

  }
});

client.on('message', msg => {
  if (msg.content === '$AFK') {
    msg.reply('Is Now AFK')

  }
});


client.on('message', msg => {
  if (msg.content === '$Afk') {
    msg.reply('Is Now AFK')

  }
});



    client.on("message", message => {
        let args = message.content.split(" ").slice(1);
      if (message.content.startsWith((prefix) + 'report')) {
            let user = message.mentions.users.first(); message.guild.member(message.author).roles.find('name' , '✽ Discord Staff');
            let reason = args.slice(1).join(' ');
            let modlog = client.channels.find('name', 'reports');
            if (!reason) return message.reply('**امممم .. اكتب تبليغك**');


        if (!modlog) return message.reply('**لا يوجد روم بأسم reports**');

                                if(!user) return message.reply('**- هذا الشخص ليس من الاداريين**');
        const embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setTimestamp()
          .addField('نوع الرسالة:', 'Report')
          .addField('المراد الابلاغ عليه:', `${user.username}#${user.discriminator} (${user.id}`)
          .addField('صاحب الابلاغ:', `${message.author.username}#${message.author.discriminator}`)
          .addField('السبب', reason);
          message.delete()
          return client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
              }
      });




client.on("message", message => {

          if(!message.channel.guild) return;
   if(message.author.bot) return;
      if(message.content === prefix + "image"){
          const embed = new Discord.RichEmbed()

      .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
  .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
                    .setTimestamp()

   message.channel.send({embed});
      }
  });



  client.on('message', message => {
    if (message.author.bot) return;
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('$bcall')){
 if(!message.author.id === '429972030092476437') return;
message.channel.sendMessage('جار ارسال الرسالة |✅')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});

















client.on('message', msg => {
if (msg.content.startsWith(`$support`)) {
// تعريف الارجس
   let args = msg.content.split(" ").slice(1);
// لو ما كتب تبليغ بيقوله اكتب تبليغ
  if (!args[1]) return msg.reply(`اكتب المشكله`)
// استبدل <الروم> بأسم الروم حقك
  if (msg.guild.channels.find('name', 'support')) {
// استبدل هنا بعد
    msg.guild.channels.find('name', 'support').send(`
  يلي واجهته المشكله : ${msg.member}
  في روم : ${msg.channel.name}
  المشكله : **${args.join(" ").split(msg.mentions.members.first()).slice(' ')}**
  `)
  }
}
})



client.on('message', async message => {
    let messageArray = message.content.split(" ");
    let muteRole = message.guild.roles.find("name", "Chat-Muted");
    let muteId = message.mentions.users.first();
    let muteReason = messageArray[3];
    let Swearing = '1d';
    let LackOFReaspect = '4h';
    let Spam = '3h';
   if(message.content.startsWith(prefix + "sltempmute")) {
       if(!muteRole) return message.guild.createRole({ name: "Chat-Muted", permissions: [] });
       if(!message.guild.member(message.author).hasPermission("MUTE_MEMBERS")) return message.channel.send("**- ماعندك برمشن**");
       if(!muteId) return message.channel.send("**- اكتب منشن الشخص يلي تبي تعطيه ميوت**");
       if(muteId === message.author) return message.channel.send('**- ماتقدر تعطي نفسك ميوت**');
       if(muteId === client.user) return message.channel.send('**- ماتقدر تعطي البوت ميوت**');
       message.guild.channels.forEach((channel, id) => {
      message.channel.overwritePermissions(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
    message.channel.send(`
    \`\`\`ml
" قم بأختيار رقم السبب "
1 : السب و الشتم
time : 1 day
2 : قله احترام الاعضاء
time : 4 hour
3 : السبام
time : 3 hour
=====================================
ملاحظه اذا لم يطابق الوقت الموجود في قوانين الميوت
قم باستعمال $tempmute
=====================================
\`\`\`
__امامك 20 ثانية للاختيار__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === '1', {
    max: 1,
    time: 20000,
    errors: ['time'],
  })
  .then((collected) => {
      message.guild.member(muteId).addRole(muteRole)
      .then(() => { setTimeout(() => {
           message.guild.member(muteId).removeRole(muteRole);
       }, mmss(Swearing));
       message.channel.send(`**تم!, تم اعطاء ميوت لـ${muteId} بسبب السب و الشم**`);
      });
    });

message.channel.awaitMessages(response => response.content === '2', {
    max: 1,
    time: 20000,
    errors: ['time'],
  })
  .then((collected) => {
      message.guild.member(muteId).addRole(muteRole)
      .then(() => { setTimeout(() => {
           message.guild.member(muteId).removeRole(muteRole);
       }, mmss(LackOFReaspect));
       message.channel.send(`**تم اعطاء ميوت لـ${muteId} بسبب قله احترام الاعضاء**`);
      });
    });
message.channel.awaitMessages(response => response.content === '3', {
    max: 1,
    time: 20000,
    errors: ['time'],
  })
  .then((collected) => {
      message.guild.member(muteId).addRole(muteRole)
      .then(() => { setTimeout(() => {
           message.guild.member(muteId).removeRole(muteRole);
       }, mmss(Spam));
       message.channel.send(`**تم اعطاء ميوت لـ${muteId} بسبب السبام**`);
      });
    });
   });
   }
});








/*
صدقه جارية للجميع
*/

const ytdl = require('ytdl-core');
const request = require('request');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";

client.on('message', message => {
	if(message.content.startsWith(prefix + 'قران')) {
		message.delete();
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`**يحب ان تكون في روم صوتي**`);

	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.setFooter("صدقه جاريه للجميع", 'https://c.top4top.net/p_8981fwg11.png')
      .setDescription(`
     🕋 اوامر بوت القرآن الكريم 🕋
🇦 القرآن كاملاً ماهر المعيقلي
🇧 سورة البقرة كاملة للشيخ مشاري العفاسي
🇨 سورة الكهف كاملة بصوت مشارى بن راشد العفاسي
⏹ لإيقاف القرآن الكريم
🇩 القرآن كاملاً عبدالباسط عبدالصمد
🇪 القرآن كاملاً ياسر الدوسري
🇫 سورة الواقعه بصوت الشيخ مشاري بن راشد العفاسي`)

	message.channel.sendEmbed(embed).then(msg => {
			msg.react('🇦')
		.then(() => msg.react('🇧'))
		.then(() => msg.react('🇨'))
		.then(() => msg.react('⏹'))
		.then(() => msg.react('🇩'))
		.then(() => msg.react('🇪'))
		.then(() => msg.react('🇫'))

// Filters
	let filter1 = (reaction, user) => reaction.emoji.name === '🇦' && user.id === message.author.id;
	let filter2 = (reaction, user) => reaction.emoji.name === '🇧' && user.id === message.author.id;
	let filter3 = (reaction, user) => reaction.emoji.name === '🇨' && user.id === message.author.id;
	let filter4 = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
	let filter5 = (reaction, user) => reaction.emoji.name === '🇩' && user.id === message.author.id;
	let filter6 = (reaction, user) => reaction.emoji.name === '🇪' && user.id === message.author.id;
	let filter7 = (reaction, user) => reaction.emoji.name === '🇫' && user.id === message.author.id;

// Collectors
	let collector1 = msg.createReactionCollector(filter1, { time: 120000 });
	let collector2 = msg.createReactionCollector(filter2, { time: 120000 });
	let collector3 = msg.createReactionCollector(filter3, { time: 120000 });
	let collector4 = msg.createReactionCollector(filter4, { time: 120000 });
	let collector5 = msg.createReactionCollector(filter5, { time: 120000 });
	let collector6 = msg.createReactionCollector(filter6, { time: 120000 });
	let collector7 = msg.createReactionCollector(filter7, { time: 120000 });

// Events
collector1.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=Ktync4j_nmA", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
   });
});
collector2.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=qFq5h4wtjaM&t=30s", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector3.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=8UWKiKGQmsE", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector4.on('collect', r => {
	if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم إيقاف القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
});
collector5.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=vqXLGtZcUm8", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector6.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=WYT0pQne-7w", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector7.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=LTRcg-gR78o", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **تم تشغيل القرآن الكريم**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
})
}
});

















client.on('message', message => {
if(message.content.startsWith(prefix + 'moveall')) {
 if (!message.member.hasPermission("Administrator")) return message.channel.send('**لايوجد لديك صلاحية سحب الأعضاء**');
   if(!message.guild.member(client.user).hasPermission("MOVE_MEMBERS")) return message.reply("**لايوجد لدي صلاحية السحب**");
if (message.member.voiceChannel == null) return message.channel.send(`**الرجاء الدخول لروم صوتي**`)
 var author = message.member.voiceChannelID;
 var m = message.guild.members.filter(m=>m.voiceChannel)
 message.guild.members.filter(m=>m.voiceChannel).forEach(m => {
 m.setVoiceChannel(author)
 })
 message.channel.send(`**تم سحب جميع الأعضاء إليك**`)


 }
   });







client.on('message', msg => {
    if(msg.content === '$staff-rules') {

        if(!msg.channel.guild) return msg.reply("هذا الأمر للسيرفرات فقط")
        let staff = msg.guild.member(msg.author).roles.find('name' , '✽ Discord Staff');

if(!staff) return msg.reply('انت لست من الأداره')
if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()

            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL)
                                .setTitle("**أوامر الأداره**")
                                                                .setTitle("**هذه الخاصيه لسيرفر مارس ام سي فقط**")

            .setDescription(`اهلاً ايها الأداري ${msg.author.tag}
قوانين عامة تلتزم بها كل الادارة :
1- الاحترام وعدم الاساءة لاحد
2- ممنوع اعطاء دليلك لممبر الا في حالة طلبه منك الاعلى منك في الرتبة
3- ممنوع اعلام احد عن شخص بالع ميوت او بان الا باذن
4- استغلال الصلاحيات سيؤدي لسحب الرتبة
5- تعطى الانذارات من الاداري الاعلى منك رتبة وعنده يكون الابيل
6- كتابة الاوامر في #staffs_commands عدى اوامر الوارن
7- ممنوع فك العقوبة من اي شخص الا باذن من الاعلى منك
8- وكل واحد مسؤول عن الي اعطاه العقوبة .. يعني ما اجي اطلب فك ميوت من واحد ما اعطيته
9- ممنوع لاي اداري اخذ شكوة على اداري اخر الا لو كان الرتبة الي تحته مباشرة . يعني ما يجي ياخذ شكوة على مود وهو ادمن . ولا شكوة على ادمن وهو مانيجير .
10- من يخالف القوانين اعلاه سيعاقب .. وشكراً
---
<--<-[ MarsMC ]->-->
            `)


        msg.author.sendEmbed(embed)

    }

});






client.on('message', msg => {
    if(msg.content === '$staff-help') {

        if(!msg.channel.guild) return msg.reply("هذا الأمر للسيرفرات فقط")
        let staff = msg.guild.member(msg.author).roles.find('name' , '✽ Discord Staff');

if(!staff) return msg.reply('انت لست من الأداره')
if (msg.author.bot) return;
  const embed = new Discord.RichEmbed()

            .setColor("RANDOM")
            .setThumbnail(msg.author.avatarURL)
                                .setTitle("**أوامر الأداره**")
                                                                .setTitle("**هذه الخاصيه لسيرفر مارس ام سي فقط**")

            .setDescription(`اهلاً ايها الأداري ${msg.author.tag}
         <<<<<<<< هذه اوامر الأداره للتذكير >>>>>>>>
            <--<-( Rules  Staff )->-->
Warns :
1- ?warn/?w mention يمنع استخدام اوامر البوت هنا , توجه الى #bot-commands
2- ?warn/?w mention  يمنع التحدث هنا , توجه الى #public_chat
3- ?warn/?w mention يمنع ارسال الصور هنا , توجه الى #all-media
4- ?warn/?w mention الرجاء عدم السبام
------------------------------------------------
Mutes :
1- ?mute/?m mention 2h  استخدام اوامر البوت في روم الاوامر فقط
2- ?mute/?m mention 2h كتابه في روم شات العام فقط
3- ?mute/?m mention 2h ارسال الصور في روم الصور فقط
4- ?mute/?m mention 3h سبام
5- ?mute/?m mention 12h تقليل احترام
6- ?mute/?m mention 12h خطابات تحض على الكراهيه او العنصريه
7- ?mute/?m mention 1d سب
------------------------------------------------
Bans :
1- ?ban/?b mention ارسال دعوات  سيرفرات
------------------------------------------------
Others :
1- المواضيع السياسية والقبليه سيتم تحذيره ثلاث مرات قبل إجراء العقاب والسبام بعد
?warn/?w @mention يمنع التحدث في المواضيع السياسيه
?warn/?w @mention يمنع التحدث في المواضيع القبليه والعرقيه
------------------------------------------------
<--<-[ MarsMC ]->-->
            `)


        msg.author.sendEmbed(embed)

    }

});










client.on('message',function(message) {
    let w = ['Rock','Paper','Scissors'];
   if(message.content.startsWith(prefix + "rps")) {
       message.channel.send(`\`\`\`css
Choose one of the following.
#1 ( Rock )
#2 ( Paper )
#3 ( Scissors )
\`\`\`
__امامك  5 توان للاختيار__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === '1', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
      if(message.author !== message.author)return;
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
});
  message.channel.awaitMessages(response => response.content === '2', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
      message.channel.awaitMessages(response => response.content === '3', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
   }
});





client.on('message', message => {
   if(message.content.startsWith(prefix + "myinvites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} has ${inviteCount} invites.`);
});
  }
});


const Shadw = {
    ' ': '   ',
    '0': '0⃣',
    '1': '1⃣',
    '2': '2⃣',
    '3': '3⃣',
    '4': '4⃣',
    '5': '5⃣',
    '6': '6⃣',
    '7': '7⃣',
    '8': '8⃣',
    '9': '9⃣',
    '!': '❕',
    '?': '❔',
    '#': '#⃣',
    '*': '*⃣'
  };

  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    Shadw[c] = Shadw[c.toUpperCase()] = ` :regional_indicator_${c}:`;
  });


  client.on('message' , async message => {
         if(message.content.startsWith(prefix + "e")) {
            let args = message.content.split(" ").slice(1);
    if (args.length < 1) {
      message.channel.send('You must provide some text to emojify!');
  }

  message.channel.send(
      args.join(' ')
          .split('')
          .map(c => Shadw[c] || c)
          .join('')
  );
  };
  });






   const zalgo = require('zalgolize');
 client.on('message', message => {
   if(message.content.startsWith(prefix + "zalgo")) {
 let args = message.content.split(' ').slice(1);
 message.channel.sendMessage("", {embed: {
      title: `tag`,
      color: 0x06DF00,
      description: `\n ${zalgo(args.join(' '))}`,

    }
    });
  }
});






client.on('message',function(message) {
    let messageArray = message.content.split(" ");
    let args = messageArray[1];
   if(message.content.startsWith(prefix + "counting")) {
         let staff = message.guild.member(message.author).roles.find('name' , 'Counter');
                                if(!staff) return message.reply('**- You Dont Have Counter Rank**');
       if(!args) return message.reply('ℹ ``اختر رقم``');
       let i;
       for (i = 0; i < `${parseInt(args) + 1}`; ++i)
       message.channel.send(i)
   }
});






client.on('message', message => {
  const port = '25565'
  if(message.content.startsWith('$mcserver')) {
 const args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send("** اكتب ايبي السيرفر **");
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(`https://api.minetools.eu/favicon/${args}/25565`)
        .addField(":scroll: ايبي السيرفر",`${args}`,true)
        .addField(":globe_with_meridians: منفذ السيرفر",`${port}`)
        .setImage(`http://status.mclive.eu/${args}/${args}/25565/banner.png`)
        .setFooter(`${client.user.username}`)
                .setTimestamp()
    message.channel.send(embed)
}})




client.on('message', message => {
if (message.content.startsWith("$kick")) {
    var mention = message.mentions.members.first();
    if(!mention) return message.channel.send("اكتب منشن الشخص يلي تبي تعطيه كيك");

    mention.kick("By: " + message.author.tag);

    message.channel.send("تم أعطاء كيك الى : " + mention.tag);
};
});






client.on('message', message => {
    if(message.content.startsWith(prefix +'appeal')) {
           let staff = message.guild.member(message.author).roles.find('name' , 'Muted');
                                if(!staff) return message.reply('**- لازم تكون ميوتد علشان تسوي الامر ذا**');
          const A8tra7Room = message.guild.channels.find("name", "staff-appeals")

          if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`)
          ;
       let a8tra7 = message.content.split(" ").slice(1);
       var m8tr7 = message.author.id
    if(!message.guild.channels.find("name","staff-appeals")) return message.channel.send('لايوجد روم للابيل \`staff-appeals\`')
    var Eror = new Discord.RichEmbed()
       .setTimestamp()
    .setDescription(`الرجاء كتابت سبب الابيل  بعد الأمر `)
     if(!a8tra7.join(" ")) return message.channel.send(Eror).then(message => {message.delete(50000)});
       var ThxForSug = new Discord.RichEmbed()
       .setTitle(`:white_check_mark: Success!`)
       .setTimestamp()
          .setThumbnail('https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=2048')
       .setDescription(`سيتم مراجعه الابيل من الاداره !`)
    .addField(`سبب الابيل : `, a8tra7)
       var Sure = new Discord.RichEmbed()
       .setTimestamp()
    .setDescription(`هل انت متأكد من ارسال الابيل؟ معك دقيقه قبل الالغاء`).addField(`المحتوى : `, a8tra7)
    message.channel.sendEmbed(Sure).then(msg => {
        msg.react('❎')
    .then(() => msg.react('✅'))

    let YesFilter = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
    let NoFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

    let Yes = msg.createReactionCollector(YesFilter, { time: 60000 });
    let No = msg.createReactionCollector(NoFilter, { time: 60000 });

    Yes.on("collect", r => {
       var ala8tra7 = new Discord.RichEmbed()
       .setTimestamp()
       .setColor('#50bcdf')
       .setThumbnail('https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=2048')
       .setFooter(`${message.author.username}#${message.author.discriminator}`)
       .setTitle(`New Appeal ⤵`)
       .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=21469585838&scope=bot`)
       .setDescription(`
     Appeal :
Appeal Reason: ${a8tra7} \n
Send By : __<@${m8tr7}>__`)

       A8tra7Room.send(ala8tra7)
       message.channel.sendEmbed(ThxForSug).then(message => {message.delete(2000)})
    msg.delete();
    })
    No.on("collect", r => {
    message.channel.send('تم الغاء الابيل بنجاح :white_check_mark: ').then(message => {message.delete(2000)})
    msg.delete();
    })
    })
    }
    });



client.on('guildCreate', guild => {


    var star = new Discord.RichEmbed()
    .setTitle("MaxBot")
    .setColor(000000)
    .setDescription(`***شكرا لختيارك بوت ماكس***`)
              .setFooter(`MaxBot`, 'https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=2048')
        guild.owner.send(star)
  })



const weather = require('weather-js');//npm install weather-js
client.on('message', message => {
    let msg = message.content.toUpperCase();
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    if (msg.startsWith(prefix + 'weather')) {

        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);


            if (result.length === 0) {
                message.channel.send('**اكتب المنطقه**').
                return;
            }


            var current = result[0].current;
            var location = result[0].location;


            const embed = new Discord.RichEmbed()
.setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)


                message.channel.send({embed});
        });
    }

});




client.on('message', message => {
         if (message.content === prefix + "dt") {
         if (!message.channel.guild) return message.reply('** هذا الامر للسيرفرات فقط **');
         var currentTime = new Date(),
            hours = currentTime.getHours() + 4 ,
            hours2 = currentTime.getHours() + 3 ,
            hours3 = currentTime.getHours() + 2 ,
            hours4 = currentTime.getHours() + 3 ,
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
             var h = hours
  if(hours > 12) {
               hours -= 12;
            } else if(hours == 0) {
                hours = "12";
            }
             if(hours2 > 12) {
               hours2 -= 12;
            } else if(hours2 == 0) {
                hours2 = "12";

            }
                         if(hours3 > 12) {
               hours3 -= 12;
            } else if(hours3 == 0) {
                hours3 = "12";
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            var suffix = 'صباحاَ';
            if (hours >= 12) {
                suffix = 'مساء';
                hours = hours - 12;
            }
            if (hours == 0) {
                hours = 12;
            }


                var Date15= new Discord.RichEmbed()
                .setThumbnail("https://i.imgur.com/ib3n4Hq.png")
                .setTitle( "『التاريخ  والوقت』")
                .setColor('RANDOM')
                .setFooter(message.author.username, message.author.avatarURL)
                .addField('الامارات',
                "『"+ hours + ":" + minutes +":"+ seconds + "』")
                 .addField('مكه المكرمه',
                "『"+ hours2 + ":" + minutes +":"+ seconds  + "』")
                .addField('مصر',
                "『"+ hours3 + ":" + minutes +":"+ seconds  + "』")

                .addField('Date',
                "『"+ Day + "-" + Month + "-" + Year +  "』")

                 message.channel.sendEmbed(Date15);
        }
    });




    client.on("message", message => {
    const command = message.content.split(" ")[0];
    const args = message.content.split(" ").slice();
  let container = message.content.split(" ");
  let result =  Number(container[1]) + Number(container[3]);
  let result2 = Number(container[1]) - Number(container[3]);
  let result3 = Number(container[1]) * Number(container[3]);
  let result4 = Number(container[1]) / Number(container[3]);
  if(command === "$رياضيات"){
if(!args[3]) return;
if(!args[2]) return;
    if (container[2] === "+") {
        message.channel.send("Answer is " + result);
        } else if (container[2] === "-") {
          message.channel.send("Answer is " + result2);
        } else if (container[2] === "*" || container[2].toLowerCase() === "x" || container[2].toLowerCase() === "×") {
          message.channel.send("Answer is " + result3);
        } else if (container[2] === "/" || container[2].toLowerCase() == "÷") {
          message.channel.send("Answer is " + result4);
        }
        }
});//.catch(console.error);



client.on('message', message => {
  if (message.content.startsWith('$voicewlc')) {
    const voiceChannel = message.member.voiceChannel;
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://youtu.be/TVo_H8fAN9k ", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());

      });
  }
})
//npm i ytdl-core


client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
    points: 50,
  };
if (message.content.startsWith(prefix + 'فكك')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./fakk.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لتفكك الكلمه **').then(msg => {
    let embed = new Discord.RichEmbed()
    .setColor('#000000')
    .setFooter("فكك  | MaxBot", 'https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=20488')
    .setDescription(`**قم بكتابه الكلمه مفككه : ${item.type}**`)

    msg.channel.sendEmbed(embed).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **اجابه صحيحه **`); //Shadw__X

        console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            message.channel.send(`:x: **لا يوجد احد فكك الكلمه بلوقت المناسب**`);
            console.log(`[Typing] Error: No one type the word.`);
          })
        })
    })
}
});






client.on('message',async message => {
  let args = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.find('name',args) || message.guild.roles.get(args);


  if(message.content.startsWith(prefix + "Role")) {
    if(!args) return message.reply('اكتب اسم الرتبة');
    if(!role) return message.reply('هذه الرتبة غير موجودة');
    let iQp = new Discord.RichEmbed()
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField('- اسم الرتبة',role.name,true)
    .addField('- اي دي الرتبة',role.id,true)
    .addField('- تم انشاء الرتبة',role.createdAt.toLocaleString(),true)
    .addField('- لون الرتبة',role.hexColor,true)
    .addField('- عدد الاعضاء الذي لديهم نفس الرتبة',role.members.size,true)
    .addField('- مركز الرتبة بين كل الرتب',role.position,true)
    .addField('- خصائص الرتبة',role.permissions,true)
    .setFooter(message.author.tag,message.author.avatarURL);

    message.channel.send(iQp);
  }
});









client.on('ready', function() {
    console.log(`i am ready ${client.user.username}`);
});
/*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];
/*
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
*/
client.on('ready', () => {});
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

client.on('message', function(message) {
    const member = message.member;
    const mess = message.content.toLowerCase();
    const args = message.content.split(' ').slice(1).join(' ');

    if (mess.startsWith(prefix + 'play')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        // if user is not insert the URL or song title
        if (args.length == 0) {
            let play_info = new Discord.RichEmbed()
                .setAuthor(client.user.username, client.user.avatarURL)
                .setFooter('طلب بواسطة: ' + message.author.tag)
                .setDescription('**قم بإدراج رابط او اسم الأغنيه**')
            message.channel.sendEmbed(play_info)
            return;
        }
        if (queue.length > 0 || isPlaying) {
            getID(args, function(id) {
                add_to_queue(id);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    let play_info = new Discord.RichEmbed()
                        .setAuthor(client.user.username, client.user.avatarURL)
                        .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                          ${videoInfo.title}
                          **`)
                        .setColor("#a637f9")
                        .setFooter('|| ' + message.author.tag)
                        .setThumbnail(videoInfo.thumbnailUrl)
                    message.channel.sendEmbed(play_info);
                    queueNames.push(videoInfo.title);
                    now_playing.push(videoInfo.title);

                });
            });
        }
        else {

            isPlaying = true;
            getID(args, function(id) {
                queue.push('placeholder');
                playMusic(id, message);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    let play_info = new Discord.RichEmbed()
                        .setAuthor(client.user.username, client.user.avatarURL)
                        .addField('__**تم التشغيل ✅**__', `**${videoInfo.title}
                              **`)
                        .setColor("RANDOM")
                        .addField(`بواسطه`, message.author.username)
                        .setThumbnail(videoInfo.thumbnailUrl)

                    // .setDescription('?')
                    message.channel.sendEmbed(play_info)
                    message.channel.send(`
                            **${videoInfo.title}** تم تشغيل `)
                    // client.user.setGame(videoInfo.title,'https://www.twitch.tv/Abdulmohsen');
                });
            });
        }
    }
    else if (mess.startsWith(prefix + 'skip')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        message.channel.send('`✔`').then(() => {
            skip_song(message);
            var server = server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        });
    }
    else if (message.content.startsWith(prefix + 'vol')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        // console.log(args)
        if (args > 100) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
        if (args < 1) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
        dispatcher.setVolume(1 * args / 50);
        message.channel.sendMessage(`**__ ${dispatcher.volume*50}% مستوى الصوت __**`);
    }
    else if (mess.startsWith(prefix + 'pause')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        message.channel.send('`✔`').then(() => {
            dispatcher.pause();
        });
    }
    else if (mess.startsWith(prefix + 'ok')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
            message.channel.send('`✔`').then(() => {
            dispatcher.resume();
        });
    }
    else if (mess.startsWith(prefix + 'stop')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        message.channel.send('`✔`');
        var server = server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }
    else if (mess.startsWith(prefix + 'تعال')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        message.member.voiceChannel.join().then(message.channel.send(':ok:'));
    }
    else if (mess.startsWith(prefix + 'play')) {
        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
        if (isPlaying == false) return message.channel.send(':anger: || **__تم التوقيف__**');
        let playing_now_info = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                  ${videoInfo.title}
                  **`)
            .setColor("RANDOM")
            .setFooter('طلب بواسطة: ' + message.author.tag)
            .setThumbnail(videoInfo.thumbnailUrl)
        //.setDescription('?')
        message.channel.sendEmbed(playing_now_info);
    }
});

function skip_song(message) {
    if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
    dispatcher.end();
}

function playMusic(id, message) {
    voiceChannel = message.member.voiceChannel;


    voiceChannel.join().then(function(connectoin) {
        let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];

        dispatcher = connectoin.playStream(stream);
        dispatcher.on('end', function() {
            skipReq = 0;
            skippers = [];
            queue.shift();
            queueNames.shift();
            if (queue.length === 0) {
                queue = [];
                queueNames = [];
                isPlaying = false;
            }
            else {
                setTimeout(function() {
                    playMusic(queue[0], message);
                }, 500);
            }
        });
    });
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYoutubeID(str));
    }
    else {
        search_video(str, function(id) {
            cb(id);
        });
    }
}

function add_to_queue(strID) {
    if (isYoutube(strID)) {
        queue.push(getYoutubeID(strID));
    }
    else {
        queue.push(strID);
    }
}

function search_video(query, cb) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        cb(json.items[0].id.videoId);
    });
}


function isYoutube(str) {
    return str.toLowerCase().indexOf('youtube.com') > -1;
}

	client.on('message', message => {
    if (message.content.startsWith("habout")) {
      message.channel.send({
 embed: new Discord.RichEmbed()
    .setColor('RED')
    .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**وقت الاقلاع⌚**', timeCon(process.uptime()), true)
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
     })
    }
  });
  client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith('$bping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('RANDOM')
                        .addField('**Time Taken:**',msg + " ms 📶 ")
                        .addField('**WebSocket:**',api + " ms 📶 ")
         message.channel.send({embed:embed});
                        }
                    });



client.on('ready', () => {
  console.log(`Logs online ${client.user.tag}!`);
});




client.on('message', message => {
    if(message.content.startsWith(prefix +'mcappeal')) {
          const A8tra7Room = message.guild.channels.find("name", "staff-appeals")

          if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`)
          ;
       let a8tra7 = message.content.split(" ").slice(1);
       var m8tr7 = message.author.id
 if(!message.guild.channels.find("name","staff-appeals")) return message.channel.send('لايوجد روم للابيل \`staff-appeals\`')
    var Eror = new Discord.RichEmbed()
       .setTimestamp()
    .setDescription(`الرجاء كتابت سبب الابيل  بعد الأمر `)
     if(!a8tra7.join(" ")) return message.channel.send(Eror).then(message => {message.delete(50000)});
       var ThxForSug = new Discord.RichEmbed()
       .setTitle(`:white_check_mark: Success!`)
       .setTimestamp()
          .setThumbnail('https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=2048')
       .setDescription(`سيتم مراجعه الابيل من الاداره !`)
    .addField(`سبب الابيل : `, a8tra7)
       var Sure = new Discord.RichEmbed()
       .setTimestamp()
    .setDescription(`هل انت متأكد من ارسال الابيل؟ معك دقيقه قبل الالغاء`).addField(`المحتوى : `, a8tra7)
    message.channel.sendEmbed(Sure).then(msg => {
        msg.react('❎')
    .then(() => msg.react('✅'))

    let YesFilter = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
    let NoFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

    let Yes = msg.createReactionCollector(YesFilter, { time: 60000 });
    let No = msg.createReactionCollector(NoFilter, { time: 60000 });

    Yes.on("collect", r => {
       var ala8tra7 = new Discord.RichEmbed()
       .setTimestamp()
       .setColor('#50bcdf')
       .setThumbnail('https://cdn.discordapp.com/avatars/456134218330800128/d991138ecc5ab575ef7e12d2338414d7.png?size=2048')
       .setFooter(`${message.author.username}#${message.author.discriminator}`)
       .setTitle(`New Minecraft Appeal ⤵`)
       .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=21469585838&scope=bot`)
       .setDescription(`
     Appeal :
Appeal Reason: ${a8tra7} \n
Send By : __<@${m8tr7}>__`)

       A8tra7Room.send(ala8tra7)
       message.channel.sendEmbed(ThxForSug).then(message => {message.delete(2000)})
    msg.delete();
    })
    No.on("collect", r => {
    message.channel.send('تم الغاء الابيل بنجاح :white_check_mark: ').then(message => {message.delete(2000)})
    msg.delete();
    })
    })
    }
    });





client.on('message',  (message) => {
        if(message.content.startsWith('$punch')) {
  let user = message.mentions.users.first();
  if (!user) {
    /**
     * The command was ran with invalid parameters.
     * @fires commandUsage
     */
    return ;
  }
  let punches = [
    'https://i.giphy.com/media/iWEIxgPiAq58c/giphy.gif',
    'https://i.giphy.com/media/DViGV8rfVjw6Q/giphy.gif',
    'https://i.giphy.com/media/GoN89WuFFqb2U/giphy.gif',
    'https://i.giphy.com/media/xT0BKiwgIPGShJNi0g/giphy.gif',
    'https://i.giphy.com/media/Lx8lyPHGfdNjq/giphy.gif'
  ];

  message.channel.send({
    embed: {
      description: `${message.author.username} عطاك كففف ${user.username}! :punch:`,
      image: {
        url: punches[Math.floor(Math.random() * punches.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }
});





var cats = ["https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg","http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg","http://cdn2-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/standing-7.jpg","http://cdn.akc.org/Marketplace/Breeds/German_Shepherd_Dog_SERP.jpg","https://animalso.com/wp-content/uploads/2016/12/black-german-shepherd_2.jpg","https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpg","https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg","http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg","https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg","https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg","http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg","https://www.thelocal.de/userdata/images/article/fa6fd5014ccbd8f4392f716473ab6ff354f871505d9128820bbb0461cce1d645.jpg","https://www.adelaidezoo.com.au/wp-content/uploads/sites/2/animals/GiantPanda3Slider.jpg","http://imagem.band.com.br/f_230168.jpg"]
    client.on('message', message => {
        var args = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + 'animal')) {
         var cat = new Discord.RichEmbed()
.setImage(cats[Math.floor(Math.random() * cats.length)])
message.channel.sendEmbed(cat);
    }
});




  client.on('message', message => {


           if (message.content.startsWith(prefix + "user")) {
                     if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات ❌`);

                message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(message.author.id);
      let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var moment = require('moment');
      var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
 var heg;
 if(men) {
     heg = men
 } else {
     heg = message.author
 }
var mentionned = message.mentions.members.first();
  var h;
 if(mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
        moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()

    .setColor("#0a0909")
 .setThumbnail(message.author.avatarURL)
.addField(': تاريخ دخولك للديسكورد',` \`${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} \`**\n ${moment(heg.createdTimestamp).fromNow()}**` ,true)
.addField(': تاريخ دخولك لسيرفرنا', `\`${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')}  \` **\n ${moment(h.joinedAt).fromNow()} **`, true)

.setFooter(message.author.username,'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')
    message.channel.sendEmbed(id);
})
}



     });


client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);



if (command == "say") {
let rank = message.guild.member(message.author).roles.find('name', 'say');
if (!rank) return message.reply('انت لا تمتلك الرتبه المخصصه لهذا الامر')
  message.channel.send(args.join("  "))
    message.delete();
  }


});


client.on('message', message => {
client.on('voiceStateUpdate', (old, now) => {
    const channel = client.channels.get('475730153201336320')
    const any = message.guild.memberCount
    const size = channel.name.match(/\[\s(\d+)\s\]/);
    if (!size) return channel.setName(`Mars Users: [ ${message.guild.memberCount} ]`);
    if (any !== size) channel.setName(`Mars Users: 「 ${message.guild.memberCount} 」`);

  });

})


client.on('message',async message => {
var Shadw = "$";
var args = message.content.split(" ").slice(1);
var title = args[1]
          if(message.content.startsWith(Shadw + "giveaway")) {
              if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **s You Dont Have Premission**');
              if(!args) return message.channel.send(`**Use : $start  <Time> <Presentse>**`);
              if(!title) return message.channel.send(`**Use : **\`$start ${args[0]} Minutes\`** <Presentse>**`);
         if(!isNaN(args)) return message.channel.send(':heavy_multiplication_x:| **The Time Be Nambers `` Do the Commend Agin``**');
                           let giveEmbed = new Discord.RichEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL)
                  .setDescription(`**${title}** \nReact Whit 🎉 To Enter! \n**Time remaining: Minutes :${duration / 60000}**`)
                  .setFooter(message.author.username, message.author.avatarURL);

                  message.channel.send(' :heavy_check_mark: **Giveaway Created** :heavy_check_mark:' , {embed: giveEmbed}).then(m => {
                      message.delete();
                      m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users;
                       let list = users.array().filter(u => u.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('Giveaway End !🎉',`Winners : ${gFilter}`)
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                     },args * 60000);
                   });
          }
});


// Code By : Shadw
// Edited By : ShadowX
client.on('message',async Shadw => {
  var Shadw = "$";
  if(Shadw.content.startsWith(Shadw + "vonlinecreate")) {
  if(!Shadw.guild.member(Shadw.author).hasPermissions('MANAGE_CHANNELS')) return Shadw.reply(':x: **ليس لديك الصلاحيات الكافية**');
  if(!Shadw.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return Shadw.reply(':x: **ليس معي الصلاحيات الكافية**');
  Shadw.guild.createChannel(`Voice Online : [ ${Shadw.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice Online Is Activation In ${Shadw.guild.name}`);
    c.overwritePermissions(Shadw.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(` Online :  ${Shadw.guild.members.filter(m => m.voiceChannel).size} .`)
    },1000);
  });
  }
});


client.login(process.env.BOT_TOKEN)

