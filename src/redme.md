const { Client, IntentsBitField } = require('discord.js');
const axios = require('axios')

  
//ACESS_TOKEN do discord development portal
const TOKEN = 'MTEyNTgzMzU1Nzg5NDUxNjczNw.G9MKPJ.o8r_j7oHnOXo7QiZ0JZxiq3LxOfB0YhFGeHuCQ'
//prefixo do comando
const PREFIX = 'dalto'
const client = new Client({ 
  intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
  ]
});
 const commandsList = [
            { name: 'ban (nome da pessoa)', value: 'Bane a pessoa do servidor (apenas para administradores)' },
            { name: 'add (nome da pessoa)', value: 'Adiciona a pessoa ao servidor (apenas para gerenciadores do servidor)' },
            {name: 'userifo (nome da pessoa)' value:'Dá algumas informações sobre a pessoa mencionada'},
            { name: 'avatar (nome da pessoa)' value:'Manda a foto do avatar da pessoa mencionada'},
            { name: 'piada', value: 'Conta uma piada aleatória' },

          
          ];

client.on('ready', ()=> {
    console.log(`bot conectado como ${client.user.tag}`)
})

client.on('message',async (message) => {
    if(!message.content.startWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

if(command == 'search'){
    const query = args.join(' ')

    const response = await axios.get(`https://www.google.com/search?q=${query}`)
    message.channel.send(`Aqui está o resultado da pesquisa: ${response.data}`);

}
if (command === 'ban') {
    if (!message.member.hasPermission('BAN_MEMBERS')) {
      return message.reply('Você não tem permissão para usar esse comando!');
    }

    const userToBan = message.mentions.users.first();
    if (!userToBan) {
      return message.reply('Por favor, mencione um usuário para banir!');
    }

    const memberToBan = message.guild.member(userToBan);
    if (!memberToBan) {
      return message.reply('Não foi possível encontrar o usuário mencionado!');
    }

    memberToBan.ban()
      .then(() => {
        message.channel.send(`Usuário ${userToBan} foi banido com sucesso!`);
      })
      .catch((error) => {
        message.reply('Ocorreu um erro ao banir o usuário!');
        console.error(error);
      });
  }


})








client.login(TOKEN)

