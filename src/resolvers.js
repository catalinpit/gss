const { PubSub } = require("graphql-subscriptions");
const notes = require("./data");

const pubsub = new PubSub();

const resolvers = {
    Query: {
        notes() {
            return notes;
        },
        note: (_, args) => {
            const note = notes.find((note) => note.id === args.id);
            return note;
        }
    },
    Mutation: {
        addNote: (_, args) => {
            const newNote = {
                id: args.id,
                title: args.title,
                content: args.content,
                username: args.username
            }

            notes.push(newNote);
            pubsub.publish("NOTE_CREATED", { noteCreated: args })

            return newNote;
        }
    },
    Subscription: {
        noteCreated: {
            subscribe: () => pubsub.asyncIterator(["NOTE_CREATED"])
        },
    }
}

module.exports = resolvers;