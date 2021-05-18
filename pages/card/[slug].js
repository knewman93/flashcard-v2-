import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { Profiler, useContext,useEffect,useState } from 'react';

export async function getServerSideProps({query}) {
   const res = await firestore.collection("keith.a.newman565@gmail.com").doc("1");
   const {username} = query;
   const data=await res.get();
   let paths = (await data).docs.map(postToJSON)
   return{
      props:{paths}
   }
}


export default function Card(paths){
    console.log(paths)
    return(
        <div>
            <p>Hello</p>
        </div>
    )
}