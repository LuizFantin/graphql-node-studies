const { GraphQLScalarType} = require('graphql')

const userResolvers = {
    customMessage: {
        __resolveType(obj, context, info) {
          return false
        },
    },
    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },
    DateTime: new GraphQLScalarType({ //criando tipo DateTime no GraphQL
        name: 'DateTime',
        description: 'string de data no formato iso',
        serialize: (value) => value.toISOString(), //dando parse pra toISOString quando ler do banco
        parseValue: (value) => new Date(value), //transforma em data quando recebe via input
        parseLiteral: (ast) => new Date(ast.value) //transforma em data quando recebe via input de objeto
    }),
    Query: {
        users: (root, args, {dataSources}) => dataSources.usersAPI.getUsers(),
        user: (root, {id}, {dataSources}) => dataSources.usersAPI.getUserById(id)
    },
    Mutation: {
        adicionaUser: (root, {user}, {dataSources}) => dataSources.usersAPI.adicionaUser(user),
        editaUser: (root, data, {dataSources}) => dataSources.usersAPI.editaUser(data),
        deletaUser: (root, {id}, {dataSources}) => dataSources.usersAPI.deletaUser(id),
        
    }
}

module.exports = userResolvers