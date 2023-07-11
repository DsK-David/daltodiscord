const { Client, IntentsBitField, EmbedBuilder, GuildInviteManager } = require('discord.js');
require('dotenv').config();






//ACESS_TOKEN do discord development portal
const TOKEN = process.env.TOKEN
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

client.on('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.startsWith(PREFIX)) {
        const args = content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'ban') {
            if (message.member.permissions.has('ADMINISTRATOR')) {
                const userToBan = message.mentions.users.first();
                if (userToBan) {
                    const memberToBan = message.guild.members.cache.get(userToBan.id);
                    memberToBan.ban();
                    message.channel.send(`${userToBan.username} foi banido do servidor.`);
                } else {
                    message.channel.send('Usuário inválido.');
                }
            } else {
                message.channel.send('Você não tem permissão para usar esse comando.');
            }
        } else if (command === 'add') {
            if (message.member.permissions.has('MANAGE_GUILD') || message.guild.ownerId === message.author.id) {
                const memberName = args.join(' ');
                const member = message.guild.members.cache.find((m) => m.user.username === memberName);

                if (member) {
                    try {
                        member.roles.add('role_id_here');
                        message.channel.send(`O membro ${member} foi adicionado ao servidor.`);
                    } catch (error) {
                        console.error('Erro ao adicionar membro:', error);
                        message.channel.send('Ocorreu um erro ao adicionar o membro ao servidor.');
                    }
                } else {
                    message.channel.send('Não foi possível encontrar o membro especificado.');
                }
            } else {
                message.channel.send('Você não tem permissão para usar este comando.');
            }
        } else if (command === 'piada') {
            const jokes = [
                'Por que o livro de matemática sempre está triste? Porque ele tem muitos problemas.',
                'O que o zero disse para o oito? Oi, cinturinha!',
                'Qual é o cúmulo da paciência? Esperar a uva passa.',
                'Qual é o contrário de volátil? Vem cá, sobrinho.',
                'O que o pato disse para a pata? Vem quá!',
                'Por que o jacaré tirou o jacarezinho da escola? Porque ele réptil de ano.',
                'Qual é o país mais alegre do mundo? O Chile.',
                'Por que o gato não gosta de apostar corrida? Porque ele é sempre o último a chegar.',
                'Qual é o lugar mais espaçoso do mundo? O espaço.',
                'Qual é o animal mais antigo do mundo? A zebra, porque está sempre nas listas de espera.',
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.channel.send(randomJoke);
        }
        if (command === 'blackhumor') {
            const blackjokes = [
                'Por que o menino não consegue atravessar a rua? Porque ele não tem braços nem pernas.',
                'O que é pior do que encontrar um verme em sua maçã? Encontrar meio verme.',
                'Por que a menina caiu do balanço? Porque ela não tinha braços.',
                'Qual é o ponto mais difícil de comer um vegetal? A cadeira de rodas.',
                'O que é mais engraçado do que uma criança morta? Uma criança morta rindo.',
                'Qual é o esporte favorito dos surdos? Vôlei.',
                'O que é um pontinho preto no céu? Uma freira voando de costas.',
                'O que é uma maçã podre? A maçã de Newton.',
                'Como chama uma pessoa sem braços e sem pernas na piscina? Bob.',
                'O que é preto e branco e vermelho por dentro? Um pinguim sendo atropelado por um ônibus.',
            ];
            const randomJoke = blackjokes[Math.floor(Math.random() * blackjokes.length)];
            message.channel.send(randomJoke);
        }
        else if (command === 'comandos') {
            const commandsList = [
                { name: 'ban (nome da pessoa)', value: 'Bane a pessoa do servidor (apenas para administradores).' },
                { name: 'add (nome da pessoa)', value: 'Adiciona a pessoa ao servidor (apenas para gerenciadores do servidor).' },
                { name: 'userifo (nome da pessoa)', value: 'Dá algumas informações sobre a pessoa mencionada.' },
                { name: 'avatar (nome da pessoa)', value: 'Manda a foto do avatar da pessoa mencionada.' },
                { name: 'clear (quantas mensagens desejas apagar)', value: 'Deleta o número de mensagens que o usuário quiser.' },
                { name: 'piada', value: 'Conta uma piada aleatória.' },
                { name: 'blackhumor', value: 'Conta uma piada aleatória do estilo humor negro.' },
                { name: 'say (o que queres que ele repita)', value: 'Repete o que o usuário mandar.' },
                { name: 'cat', value: 'Mostra uma imagem de um gato aleatório.' },
                { name: 'dog', value: 'Mostra uma imagem de um cachorro aleatório.' },
                {name: 'anime (nome do anime)',value:'Manda um quote aleatorio do anime desejado'},
                {name:'waifu',value:'Mostra uma imagem aleatoria de um waifu'},
                { name: 'flipcoin', value: 'Joga uma moeda e mostra o resultado (cara ou coroa).' },
                { name: 'roll (quantidade de lados do dado)', value: 'Rola um dado com a quantidade de lados especificada.' },
                { name: 'kick (nome da pessoa)', value: 'Expulsa a pessoa do servidor (apenas para moderadores).' },
                { name: 'math (número1 número2 operador)', value: 'Realiza uma operação matemática básica (+, -, *, /).' },
                { name: 'random (número mínimo número máximo)', value: 'Gera um número aleatório entre o mínimo e o máximo.' },
                { name: 'quote (ID da mensagem)', value: 'Cita uma mensagem anterior pelo seu ID.' },
                { name: 'remind (tempo unidade)', value: 'Envia um lembrete após o tempo especificado (s para segundos, m para minutos, h para horas).' },
            ]



            const commandsEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Comandos Disponíveis')
                .setDescription('Aqui estão alguns comandos disponíveis:')
                .addFields(commandsList);

            message.reply({ embeds: [commandsEmbed] });
        }
        else if (command === 'clear') {
            if (message.member.permissions.has('MANAGE_MESSAGES')) {
                const amount = parseInt(args[0]);

                if (isNaN(amount) || amount < 1 || amount > 100) {
                    return message.channel.send('Por favor, forneça um número válido entre 1 e 100 para excluir mensagens.');
                }

                message.channel.bulkDelete(amount, true)
                    .then((deletedMessages) => {
                        message.channel.send(`Foram excluídas ${deletedMessages.size} mensagens.`);
                    })
                    .catch((error) => {
                        console.error('Erro ao excluir mensagens:', error);
                        message.channel.send('Ocorreu um erro ao excluir as mensagens.');
                    });
            } else {
                message.channel.send('Você não tem permissão para usar esse comando.');
            }
        } else if (command === 'say') {
           
                const messageToSay = args.join(' ');
                message.channel.send(messageToSay);
           
                
           
        } else if (command === 'avatar') {
            const user = message.mentions.users.first() || message.author;
            const avatarEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }));

            message.channel.send({ embeds: [avatarEmbed] });
        } else if (command === 'server') {
            message.guild.invites.fetch().then(invites => {
                const invite = invites.find((inv) => inv.inviter.id === client.user.id);
                if (invite) {
                    message.channel.send(`Aqui está o convite para o servidor: ${invite.url}`);
                }
            }).catch(err => {
                console.error('Erro ao buscar convites:', err);
            });
        }
        else if (command === 'userinfo') {
            const user = message.mentions.users.first() || message.author;
            const member = message.guild.members.cache.get(user.id);
            const userInfoEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Informações do Usuário')
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
                .addFields(
                    { name: 'Nome', value: user.username },
                    { name: 'ID', value: user.id },
                    { name: 'Cargo(s)', value: member.roles.cache.map(role => role.name).join(', ') },
                    { name: 'Entrou no Servidor', value: member.joinedAt.toLocaleString() },
                    { name: 'Conta Criada em', value: user.createdAt.toLocaleString() },

                );

            message.channel.send({ embeds: [userInfoEmbed] });
        }
        if (command === 'serverlink') {
            message.guild.invites.fetch()
                .then((invites) => {
                    const serverInvite = invites.find((invite) => invite.inviter.id === client.user.id);
                    if (serverInvite) {
                        message.channel.send(`Aqui está o convite para o servidor: ${serverInvite.url}`);
                    } else {
                        message.channel.send('Não foi possível encontrar um convite válido para o servidor.');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar convites:', error);
                    message.channel.send('Ocorreu um erro ao buscar o convite do servidor.');
                });
        }
        else if (command === 'math') {
            const num1 = parseInt(args[0]);
            const num2 = parseInt(args[1]);
            const operator = args[2];

            let result;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                default:
                    message.channel.send('Operador inválido. Use +, -, * ou /.');
                    return;
            }

            message.channel.send(`O resultado da operação é: ${result}`);
        }
        else if (command === 'quote') {
            const messageId = args[0];

            if (!messageId) {
                message.channel.send('Você deve fornecer o ID da mensagem a ser citada.');
                return;
            }

            message.channel.messages.fetch(messageId)
                .then(quotedMessage => {
                    message.channel.send(`${message.author.username} citou a mensagem: ${quotedMessage.content}`);
                })
                .catch(error => {
                    console.error('Erro ao buscar mensagem:', error);
                    message.channel.send('Ocorreu um erro ao buscar a mensagem.');
                });
        }
        else if (command === 'remind') {
            const time = parseInt(args[0]);
            const unit = args[1];

            if (isNaN(time)) {
                message.channel.send('Por favor, forneça um número válido para o tempo.');
                return;
            }

            let milliseconds;
            switch (unit) {
                case 's':
                    milliseconds = time * 1000;
                    break;
                case 'm':
                    milliseconds = time * 60 * 1000;
                    break;
                case 'h':
                    milliseconds = time * 60 * 60 * 1000;
                    break;
                // Adicione mais casos para outras unidades de tempo, se necessário
                default:
                    message.channel.send('Unidade de tempo inválida. Use s (segundos), m (minutos) ou h (horas).');
                    return;
            }

            setTimeout(() => {
                message.channel.send(`${message.author.username}, é hora de lembrar!`);
            }, milliseconds);
        }
        else if (command === 'random') {
            const min = parseInt(args[0]);
            const max = parseInt(args[1]);

            if (isNaN(min) || isNaN(max)) {
                message.channel.send('Por favor, forneça números válidos para o intervalo.');
                return;
            }

            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            message.channel.send(`O número aleatório é: ${randomNum}`);
        }
        else if (command === 'kick') {
            if (message.member.permissions.has('KICK_MEMBERS')) {
                const userToKick = message.mentions.users.first();
                if (userToKick) {
                    const memberToKick = message.guild.members.cache.get(userToKick.id);
                    memberToKick.kick();
                    message.channel.send(`${userToKick.username} foi expulso do servidor.`);
                } else {
                    message.channel.send('Usuário inválido.');
                }
            } else {
                message.channel.send('Você não tem permissão para usar esse comando.');
            }
        }
        else   if(command === 'anime'){
                const query=args.join(' ')
                const fetch = require('node-fetch')
                  fetch(`https://animechan.xyz/api/random/anime?title=${query}`)
                  .then(response => response.json())
                  .then(data =>{
                    const {anime,character,quote} = data
                   
                    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Citação de Anime')
        .setDescription(`"${quote}"`)
        .addFields(
          { name: 'Anime', value: anime },
          { name: 'Personagem', value: character }
        );

            message.reply({ embeds: [embed] })
            .catch(error => {
                console.error('Erro ao obter quote', error);
                message.channel.send('Erro ao obter quote',error);
            });

                   
                  })
                
            
               
            
               
 
            }
        else if (command === 'cat') {
            const fetch = require('node-fetch');
            fetch('https://api.thecatapi.com/v1/images/search')
                .then(response => response.json())
                .then(data => {
                    const imageUrl = data[0]?.url;
                    if (imageUrl) {
                        message.channel.send(imageUrl);
                    } else {
                        message.channel.send('Não foi possível obter a imagem do gato.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter imagem do gato:', error);
                    message.channel.send('Ocorreu um erro ao obter a imagem do gato.');
                });
        }

        else if (command === 'dog') {
            // Comando para mostrar uma imagem de um cachorro
            const fetch = require('node-fetch');
            fetch('https://api.thedogapi.com/v1/images/search')
                .then(response => response.json())
                .then(data => {
                    const imageUrl = data[0]?.url;
                    if (imageUrl) {
                        message.channel.send(imageUrl);
                    } else {
                        message.channel.send('Não foi possível obter a imagem do cão.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao obter imagem do cão:', error);
                    message.channel.send('Ocorreu um erro ao obter a imagem do cão.');
                });
        } else if(command === 'waifu'){
            const fetch = require('node-fetch')
            fetch('https://api.waifu.im/search?included_tags=waifu&height=%3E=100')
            .then(response => response.json())
  .then(data => {
    const images = data.images;
    if (images.length > 0) {
      const imageUrl = images[0].url;
     message.channel.send(imageUrl)
      // Faça o que desejar com a URL da imagem aqui
    }
  })
        }
         else if (command === 'flipcoin') {
            // Comando para jogar uma moeda
            const result = Math.random() < 0.5 ? 'Cara' : 'Coroa';
            message.channel.send(`A moeda caiu em: ${result}!`);
        } else if (command === 'roll') {
            // Comando para rolar um dado
            const sides = parseInt(args[0]);
            if (isNaN(sides) || sides <= 0) {
                message.channel.send('Por favor, forneça um número válido de lados para o dado.');
                return;
            }
            const result = Math.floor(Math.random() * sides) + 1;
            message.channel.send(`O dado rolou e o resultado foi: ${result}!`);
        }



    }
});

client.on('guildMemberAdd', (member) => {
    const welcomeMessage = `Bem-vindo ao servidor, ${member.user.username}! Seja ativo e respeite as regras. 
    Para ver os comandos disponíveis, digite 'dalto comandos'.`;
    member.send(welcomeMessage);
});

client.login(TOKEN);