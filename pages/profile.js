import { auth,firestore } from '../lib/firebase';
import FlashCard from '../components/flashcard'
import { UserContext } from '../lib/context'
import { Profiler, useContext,useEffect,useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';





export default function Profilee(){

    const [flashcards, getFlashcards]=useState([])
    const [question, updateQuestion]=useState([])
    const [answer, updateAnswer]=useState([])
    const [ids,updateIDs]=useState([])
    let collectionHolder =[];
    let idHolder=[];
    let thingy = ""
    let years = [1950, 1960, 1970, 1980, 1990, 2000, 2010]

    const deleteCard = async(i) => {
        i = parseInt(i,10)
        i = String(++i)
        await firestore.collection("keith.a.newman565@gmail.com").doc(i).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }


    const fetchFlashcards = async()=>{
        const response= firestore.collection("users").doc("keith.a.newman565@gmail.com").collection("flashcards");
        const data=await response.get();
        data.docs.forEach(item=>{
         
         collectionHolder.push(item.data())
         idHolder.push(item.id)
        })
        getFlashcards([collectionHolder])
        updateIDs([idHolder])
      }
      useEffect(() => {
        fetchFlashcards();
      }, [])

      const showEditForm = (i) =>{
        const element = document.getElementById("card"+i)
        if(element.classList.contains("hidden")){ //removes the class hidden from the card to show the update form 
            element.classList.remove('hidden')
            element.classList.add('flex')
           
        }
        else{
            element.classList.remove('flex')
            element.classList.add('hidden')
        }
        
      }

      const updateCard = async(i)=>{
        firestore.collection("users").doc("keith.a.newman565@gmail.com").collection("flashcards").doc(ids[0][i]).update({
            "question":document.getElementById("question"+i).value,
            "answer":document.getElementById("answer"+i).value
        }).then(() => {
            //location.reload()
            fetchFlashcards();
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }
    return(
        <div>
            <div className="card-container">
            {
                flashcards.map(flashcard=>
                    flashcard.map((card,i)=>{
                        return(
                            <div>

                                <div className="card">
                                    <h2>{card.question}</h2>
                                    <p>{card.answer}</p>
                                    <div className="delete-button" onClick={()=>deleteCard(i)}>X</div>
                                        <div className="edit-button" onClick={()=>showEditForm(i)}>
                                                        <Image
                                                        src="/1.png"
                                                        alt="Picture of the author"
                                                        width={40}
                                                        height={40}
                                                        />
                                        </div>
                                        <form className="update-form hidden" id={"card"+i}>
                                            <input placeholder={card.question} id={"question"+i}></input>
                                            <input placeholder={card.answer} id={"answer"+i}></input>
                                            <div onClick={()=>updateCard(i)}>Update</div>
                                        </form>
                                </div>
                            </div>
                        )
                    })
                )
            }
           </div>
        </div>
    )
}