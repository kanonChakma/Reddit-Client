import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () =>{
   const [{data}] = usePostsQuery();
   return (
      <Box>
      <NavBar/>
      <h2>Welcome to reddit clone</h2>
      <br></br>
      {!data?null:data.posts.map((data) => <h1 key={data.id}>{data.title}</h1>)}
   </Box>
   )
}

export default withUrqlClient(createUrqlClient)(Index)
