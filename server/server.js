const { ApolloServer } = require('apollo-server');
console.log(2);
const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        items(type: String): [Item]
    }

    input ItemInput {
         type: String
         description: String
     }

    type Mutation {
        saveItem(item: ItemInput) : Item
        deleteItem(id: Int) : Boolean
      }
`;

const items = [
  { id: 1, type: 'prefix', description: 'Air' },
  { id: 2, type: 'prefix', description: 'Water' },
  { id: 3, type: 'prefix', description: 'Storm' },
  { id: 4, type: 'sufix', description: 'Ice' },
  { id: 5, type: 'sufix', description: 'Fire' },
  { id: 6, type: 'sufix', description: 'Grass' },
];

const resolvers = {
  Query: {
    items(_, args) {
      console.log(args);
      return items.filter((item) => item.type === args.type);
    },
  },
  Mutation: {
    saveItem(_, args) {
      const item = args.item;
      item.id = Math.floor(Math.random() * 1000);
      items.push(item);
      return item;
    },
    deleteItem(_, args) {
      const id = args.id;
      const item = items.find(item => item.id === id);
      if (!item){
        return false;
      }
      items.splice(items.indexOf(item), 1);
      return true
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
