import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { LayOut } from "../components/LayOut";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () =>{
   // const [showChild, setShowChild] = useState(false);
   // useEffect(() => setShowChild(true), []);
   // if(!showChild){
   //    return null;
   // }
   const [{data}] = usePostsQuery({
      variables:{
         limit: 10
      }
   });
   console.log(data);
   return (
      <LayOut variant="small">
      <span>
         <Link href="/create-post">
            Create a Post
         </Link>
      </span>
        <header>Home Page</header>
        <div>
          {!data?(
            <div>Loading.....</div>
            ):(data.posts.map((p) => <h5 key={p.id}>{p.title}</h5>)
          )}
        </div>
      </LayOut>
   );
};

export default withUrqlClient(createUrqlClient, {ssr: false})(Index)
