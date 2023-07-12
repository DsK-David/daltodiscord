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

//comando de audio youtube
if (command === 'play') {
    // Verifica se foi fornecida uma URL válida do YouTube
    const url = args[0];
    if (!ytdl.validateURL(url)) {
      message.reply('Por favor, forneça uma URL válida do YouTube.');
      return;
    }
  
    // Obtém informações da música
    ytdl.getInfo(url, (error, info) => {
      if (error) {
        console.error('Erro ao obter informações do vídeo:', error);
        message.reply('Ocorreu um erro ao obter informações do vídeo.');
        return;
      }
      if (info.player_response.playabilityStatus.status === 'UNPLAYABLE') {
        message.reply('O vídeo não está disponível para reprodução.');
        return;
      }
  
      // Verifica se o vídeo é um formato de áudio suportado
      if (info.formats.some(format => format.container === 'mp3' && format.audioBitrate)) {
        // Verifica se o usuário está em um canal de voz válido
        const voiceChannelId = message.member.voice.channelId;
        const voiceChannel = client.channels.cache.get(voiceChannelId);
  
        if (!voiceChannel || voiceChannel.type !== 'GUILD_VOICE') {
          message.reply('Você precisa estar em um canal de voz válido para reproduzir música.');
          return;
        }
  
        voiceChannel.join()
          .then(connection => {
            // Reproduz o áudio
            const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
            const dispatcher = connection.play(stream);
  
            // Evento de finalização do áudio
            dispatcher.on('finish', () => {
              voiceChannel.leave();
            });
  
            // Evento de erro na reprodução do áudio
            dispatcher.on('error', error => {
              console.error('Erro ao reproduzir áudio:', error);
              voiceChannel.leave();
            });
  
            // Envia uma mensagem informando a música que está sendo reproduzida
            const embed = new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Reproduzindo música')
              .setDescription(`Tocando: ${info.videoDetails.title}`);
  
            message.channel.send({ embeds: [embed] });
          })
          .catch(error => {
            console.error('Erro ao entrar no canal de voz:', error);
            message.reply('Ocorreu um erro ao entrar no canal de voz.');
          });
      } else {
        message.reply('O formato de áudio do vídeo não é suportado (deve ser .mp3 com áudio).');
      }
    });
  }
  }
  