import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head'
import React from 'react'
import {getPokemon, getPokemonList} from "../components/graphql"

const singlepok = ({pokemon}) => {

    console.log(pokemon);
  return (
    <div>
         <Head>
        <title>Pokemon details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <Flex p={10} justifyContent="space-between" >

        <Box border="1px solid black">
              
        </Box>

        <Box border="1px solid black">

        </Box>

       </Flex>


    </div>
  )
}


export async function getStaticPaths() {

    let res= await getPokemonList(120);
    let data=res;
   
    return {
      paths: data.map((el)=>({params:{id:el.id.toString()}})),
      fallback: false, 
    }
  }
  
 
  export async function getStaticProps(context) {

    const {params:{id}}=context;
     
   
    const pokemon = await getPokemon(id);


    return {
     
      props: { pokemon:pokemon},
    }
  }

export default singlepok