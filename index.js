
	const { ApolloServer, gql } = require('apollo-server');
    const {domains} = require('./db')

	const typeDefs = gql`

  	type Domain {
   	 name: String
  	}

  	type Query {
    	domains: [Domain]
  	}
    
    type Mutation {
        addDomain(name:String): Domain
    }


	`;


	const resolvers = {
  	Query: {
   	    domains: () => domains,
  	    },
    Mutation: {
        addDomain: (parent, {name}, ctx) =>{
            let newDomain = {name}

           domains.push(newDomain)
           return newDomain
        }
    }


	};


    const server = new ApolloServer({ typeDefs, resolvers });


    server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    });