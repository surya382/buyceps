import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app/",
  cache: new InMemoryCache(),
});

export const getPokemonList = async (limit=151) => {
  const { data } = await client.query({
    query: gql`
    query {
      pokemons(first: ${limit}){
      id
    number
    name
    types
    image
      }
    }
    `,
  });
  
  return data.pokemons;
};





export const getPokemon = async (id) => {

  
  const { data } = await client.query({
    query: gql`
    query pokemon($id: String!) {
      pokemon(id: $id){
      id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
   
    image
      }
    }
    `,
    variables: { id: id },
  });
  
  return data.pokemon;
};



export const evolution=async(id)=>{

  const {data}= await client.query({
    query: gql `
    query pokemon($id: String!) {
      pokemon(id: $id){
      
        evolutions{
          id
          number
          name
          types
          image
        }
      }
    }
    `,
    variables: { id: id },
  });
  return data.pokemon.evolutions;
}

