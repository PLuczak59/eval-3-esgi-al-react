const User = require('./user.model.js');
const Post = require('./post.model.js');
const Emoticon = require('./emoticon.model.js');
const bcrypt = require('bcrypt');

const dataset = async () => {
    try {
        // Définir les associations avant de créer les données
        User.hasMany(Post, { foreignKey: 'authorId' });
        Post.belongsTo(User, { foreignKey: 'authorId' });
        
        Post.hasMany(Emoticon, { foreignKey: 'postId' });
        Emoticon.belongsTo(Post, { foreignKey: 'postId' });
        
        User.hasMany(Emoticon, { foreignKey: 'userId' });
        Emoticon.belongsTo(User, { foreignKey: 'userId' });

        // Synchroniser les modèles avec la base de données
        await User.sync();
        await Post.sync();
        await Emoticon.sync();
        
        const users = await User.bulkCreate([
            {
                email: "t.dusseaux@gmail.com",
                password: bcrypt.hashSync('12345', 10),
                nickname: "Thomas"
            },
                        {
                email: "pluczak@myges.fr",
                password: bcrypt.hashSync('Password123!', 10),
                nickname: "PierreH"
            },
            {
                email: "marie.dupont@email.com",
                password: bcrypt.hashSync('password123', 10),
                nickname: "Marie"
            },
            {
                email: "jean.martin@email.com",
                password: bcrypt.hashSync('mypass456', 10),
                nickname: "Jean"
            },
            {
                email: "sophie.bernard@email.com",
                password: bcrypt.hashSync('sophie789', 10),
                nickname: "Sophie"
            },
            {
                email: "alex.petit@email.com",
                password: bcrypt.hashSync('alex2024', 10),
                nickname: "Alex"
            }
        ]);

        console.log('5 utilisateurs créés');

        const posts = await Post.bulkCreate([
            {
                message: "Bonjour tout le monde ! Premier post sur cette plateforme 🎉",
                authorId: users[0].id
            },
            {
                message: "Belle journée pour coder ! Qui travaille sur React aujourd'hui ?",
                authorId: users[1].id
            },
            {
                message: "Juste terminé un super projet. Très satisfait du résultat !",
                authorId: users[2].id
            },
            {
                message: "Quelqu'un aurait des recommandations de livres sur JavaScript ?",
                authorId: users[3].id
            },
            {
                message: "Weekend repos bien mérité après cette semaine intense 😴",
                authorId: users[4].id
            },
            {
                message: "Nouvelle mise à jour de mon portfolio en ligne. N'hésitez pas à jeter un œil !",
                authorId: users[0].id
            },
            {
                message: "Café ☕ + code = productivité maximale. Bon lundi à tous !",
                authorId: users[1].id
            },
            {
                message: "Débugger pendant 3h pour réaliser que j'avais oublié un point-virgule... 🤦‍♂️",
                authorId: users[2].id
            },
            {
                message: "Qui participe à la conférence tech de demain ? J'ai hâte !",
                authorId: users[3].id
            },
            {
                message: "Petit rappel : pensez à faire des pauses régulières quand vous codez 💪",
                authorId: users[4].id
            }
        ]);

        console.log('10 posts créés');

        const emoticonTypes = ['like', 'love', 'laugh', 'wow', 'sad', 'angry'];
        const emoticons = [];

        // Créer les réactions pour chaque post
        for (let post of posts) {
            const numReactions = Math.floor(Math.random() * 4) + 1;
            const usedUsers = new Set(); // Pour éviter qu'un même utilisateur réagisse plusieurs fois au même post
            
            for (let i = 0; i < numReactions; i++) {
                const randomType = emoticonTypes[Math.floor(Math.random() * emoticonTypes.length)];
                
                let randomUserId;
                do {
                    randomUserId = users[Math.floor(Math.random() * users.length)].id;
                } while (randomUserId === post.authorId || usedUsers.has(randomUserId));
                
                usedUsers.add(randomUserId);

                emoticons.push({
                    type: randomType,
                    postId: post.id,
                    userId: randomUserId
                });
            }
        }

        if (emoticons.length > 0) {
            await Emoticon.bulkCreate(emoticons);
            console.log(`${emoticons.length} réactions créées`);
        }

        console.log('Dataset créé avec succès !');

    } catch (error) {
        console.error('Erreur lors de la création du dataset:', error);
    }
}

module.exports = dataset;