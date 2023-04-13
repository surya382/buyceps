import { Box, Button, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head'
import {ChevronRightIcon} from "@chakra-ui/icons"
import React, { useState } from 'react'
import {getPokemon, getPokemonList,evolution} from "../components/graphql"

const Singlepok = ({pokemon}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading,setloading]=useState(false);
  const [evol,setevol]=useState([])

  const showevol=async(id)=>{

    setloading(true);
  try{
    await evolution(id).then((res)=>{
      console.log(res);
      setevol(res)
      setloading(false);
      onOpen();
    });
  }
  catch(err){
    setloading(false);
    console.log(err);
  }
 


  }
   
  return (
    <div>
         <Head>
        <title>Pokemon details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

       <Box textAlign="center">
        <Heading>{pokemon.name} <span style={{color:"grey"}}>#{pokemon.number}</span></Heading>
       <Flex p={10} gap="15%" >

        <Box  width="40%" p={5}>

         <Image width="100%" src={pokemon.image} alt="broken link"/>
              
        </Box>

        <Box>

          <Text fontWeight="bold" fontSize="xl">Height:</Text>

          <Flex gap="20px" p={3}>
            
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" > Minimum height : {pokemon.height.minimum}</Button>
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" > Maximum height : {pokemon.height.maximum}</Button>
            
         </Flex>
         

         <Text fontWeight="bold" fontSize="xl">Weight:</Text>

          <Flex gap="20px" p={3}>
            
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" > Minimum height : {pokemon.weight.minimum}</Button>
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" > Maximum height : {pokemon.weight.maximum}</Button>
            
         </Flex>
         

         <Text fontWeight="bold" fontSize="xl">Type:</Text>
         <Flex gap="20px" p={3} justifyContent="center">
            {
              pokemon.types.map((el,i)=>
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" key={i}>{el}</Button>
              )
            }
         </Flex>

         <Text fontWeight="bold" fontSize="xl">Weakness:</Text>
         <Flex gap="20px" p={3} justifyContent="center">
            {
              pokemon.weaknesses.map((el,i)=>
              <Button backgroundColor="blue.100" pt={1} pb={1} height="-webkit-fit-content" key={i}>{el}</Button>
              )
            }
         </Flex>

         <Text fontWeight="bold" fontSize="xl">Classification:</Text>
         <Button backgroundColor="blue.100" p={1} mt={3} height="-webkit-fit-content">{pokemon.classification}</Button>
         
         <Text mt={3} fontWeight="bold" fontSize="xl">Resistance:</Text>
         <Flex gap="20px"  p={3} justifyContent="center">
            {
              pokemon.resistant.map((el,i)=>
              <Button backgroundColor="blue.100"  pt={1} pb={1} height="-webkit-fit-content" key={i}>{el}</Button>
              )
            }
         </Flex>
        
           <Button isLoading={loading} backgroundColor="goldenrod" mt={1} onClick={()=>showevol(pokemon.id)}>Evolutions</Button>
            
           

        </Box>

           </Flex>

           

       </Box>

           {
            evol && 
             <Box  >
       <Modal size="6xl"   isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent   >
          <ModalHeader>Evolutions</ModalHeader>
          <ModalCloseButton />

          <ModalBody   display="flex"  justifyContent="space-between">

          
            <Box border="1px solid goldenrod" borderRadius="10px" p={4}>
            <Image width="100%" height="200px"  src={pokemon.image} alt="image link broked"/>
            <Text fontSize="xl">{pokemon.name} #{pokemon.number}</Text>
            <Text fontWeight="bold" mt={2}>Type: </Text>
                  <Flex gap="20px" mt={2}>
                   {
                    pokemon.types.map((type,i)=>
                    <Button key={i} p={1} height="-webkit-fit-content">{type}</Button>
                    )
                   }
                  </Flex>
            </Box>

           
             <Flex  flexDirection="column" justifyContent="center"><Heading size="2xl"><ChevronRightIcon/></Heading></Flex>
            
            {  
              evol.map((el,i)=>
              <Flex key={el.id} gap="20px">
              <Box  border="1px solid goldenrod" borderRadius="10px" p={4}>
                  <Image width="100%" height="200px"   src={el.image} alt="image link broked"/>
                   
                  <Text fontSize="xl">{el.name} #{el.number}</Text>

                  <Text fontWeight="bold" mt={2}>Type: </Text>
                  <Flex gap="20px" mt={2}>
                   {
                    el.types.map((type,i)=>
                    <Button key={i} p={1} height="-webkit-fit-content">{type}</Button>
                    )
                   }
                  </Flex>
              </Box>
                  {i<evol.length-1 && <Flex  flexDirection="column" justifyContent="center"><Heading size="2xl"><ChevronRightIcon/></Heading></Flex>}
              
              </Flex>
              )
            }

          </ModalBody>

          
        </ModalContent>
      </Modal>
      </Box>
}
    </div>
  )
}


export async function getStaticPaths() {

    let res= await getPokemonList();
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

export default Singlepok