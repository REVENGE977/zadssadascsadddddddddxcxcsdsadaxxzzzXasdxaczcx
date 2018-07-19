const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let points = JSON.parse(fs.readFileSync(`./point.json`, `utf8`));
var shortNumber = require('short-number');


let prefix = '$';


client.on('message', message => {
  if (message.author.bot) return;


if(!message.channel.guild) return;

if (!points[message.author.id]) points[message.author.id] = {
	points: 0,
  wins: 0,
  loses: 0,
  };
if (message.content.startsWith(prefix + 'انمي')) {
  if (message.author.bot) return;

const type = require('./anime.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثواني لتخمن الانمي**').then(msg => {

   const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
 .setThumbnail(message.author.avatarURL)
 .addField(`**MaxBot**`,` **${item.type}**`)
 .setFooter(`حظا موفقا !`)

msg.channel.send(embed).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`**${ collected.first().author} كفو اجابه صحيحه
**` , '');
		console.log(`[Typing] ${collected.first().author} typed the word.`);
			let userData = points[collected.first().author.id];
userData.wins += 1
userData.points += 15;

          })

          .catch(collected => {
points[message.author.id].loses += 1;

            message.channel.send(`:x: ** الاجابه الصحيحه هي : __${item.answers}__حظ اوفر المرة القادمة ! لقد خسرت , انتهى الوقت**` , '');
			console.log('[Typing] Error: No one type the word.');

		})
	})
    })
points[message.author.id].game += 1;


}
fs.writeFile("./point.jsmn",JSON.stringify(points), function(err){
    if (err) console.log(err);
  })
});








client.login('NDU2MTM0MjE4MzMwODAwMTI4.DgGH4w.TB-Y85jmgDRPY7OwF7je2PIVx4k')
