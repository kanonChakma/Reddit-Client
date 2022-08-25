import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () =>{
   // const [showChild, setShowChild] = useState(false);
   // useEffect(() => setShowChild(true), []);
   // if(!showChild){
   //    return null;
   // }
   const [{data}] = usePostsQuery();
   return (
      <div>
       <NavBar/>
        <header>Home Page</header>
       <br />

       {!data?(
         null
         ):(data.posts.map((p) => <h5 key={p.id}>{p.title}</h5>)
       )}
    </div>
   );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
