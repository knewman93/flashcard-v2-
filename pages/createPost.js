import { useContext,useState } from 'react';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';


export default function CreatePost(){
    const { user, username } = useContext(UserContext);
    let userfile = user.email;
    const [question, updateQuestion] =useState("");
    const [answer, updateAnswer]= useState("");

    function changeQuestion (e){
        updateQuestion(e.target.value)
    }
    function changeAnswer(e){
        updateAnswer(e.target.value)
    }
    
 
    function submitCard(e){
        e.preventDefault();
        console.log(size)
        firestore.collection("users").doc(userfile).collection("flashcards").doc().set({
            question: question,
            answer: answer
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    return(
        <div>
                <form onSubmit={submitCard}>
                    <input id="question" onChange={changeQuestion}></input>
                    <input id="answer" onChange={changeAnswer}></input>
                    <button>Submit</button>
                </form>
        </div>
    )
}