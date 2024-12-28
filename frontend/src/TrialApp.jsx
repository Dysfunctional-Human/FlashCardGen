import { FlashcardArray } from "react-quizlet-flashcard";
import { Alert } from "./components/ui/Alert";
import React, { useState } from "react";
import { TextShimmer } from "./components/ui/text-shimmer";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
function TrialApp() {
  const LoadingCard=[{
    id:0,
    frontHTML:<TextShimmer>Generating your questions...</TextShimmer>,
    backHTML:<TextShimmer>Please wait...</TextShimmer>
  }];
  const [inputText,setInputText]=useState("");
  const cards = [];
  const [showAlert, setShowAlert] = useState(false);
  const [qa_pair,setQA_pair]=useState([]);
  const [loading,setLoading]=useState(true);
  const [visible,setVisible]=useState(false);
  async function GenerateFlash(){
    setLoading(true);
    setVisible(true);
    const questions=await axios.post('/api/generate-questions', { text: inputText });
    for(let i=0;i<questions.data.length;i++){
      cards.push({
        id:i,
        frontHTML:(questions.data[i]).substr(2),
        backHTML:<TextShimmer>Answers are loading...</TextShimmer>
      });
      console.log(questions.data[i]);
    };
    setLoading(false);
    setQA_pair(cards);
    const answers=await axios.get('/api/generate-answers');
    for(let i=0;i<cards.length;i++){
      cards[i].backHTML=answers.data[i];
      console.log(answers.data[i]);
    }
    setQA_pair(cards);

  }
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen pt-16" style={{ pointerEvents: 'auto' }}>
      <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.3 }}>
        {visible?
            <>
            {loading?
            <FlashcardArray cards={LoadingCard} 
              frontContentStyle={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem"}}
              frontCardStyle={{backgroundColor:"#f7f7f72f"}}  
              backContentStyle={{display:"flex",alignItems:"center",justifyContent:"center" ,fontSize:"1.5rem"}}
              backCardStyle={{backgroundColor:"#f7f7f72f"}} 
              />:
            <FlashcardArray cards={qa_pair} 
              frontContentStyle={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",padding:"1rem"}}
              frontCardStyle={{backgroundColor:"#f7f7f72f"}} 
              backContentStyle={{display:"flex",alignItems:"center",justifyContent:"center" ,fontSize:"1rem",padding:"1rem",paddingTop:"2rem"}}
              backCardStyle={{backgroundColor:"#f7f7f72f",overflow:"auto"}} 
            />}
            </>
          :null}
      </motion.div>
      {(loading && !visible)?
        <>
          <textarea placeholder="Enter text to generate.." required onChange={(e) => setInputText(e.target.value)} value={inputText} className="text-black w-1/2"></textarea>
          <button type="submit" onClick={() => {
              if (!inputText.trim()) {
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                },1500);
              } else {
                setShowAlert(false);
                GenerateFlash();
              }
            }} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 m-4">
                Generate Flashcards
          </button>
          <AnimatePresence>
            {showAlert ? 
                <motion.div
                  initial={{ opacity: 0.0, y: 250 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  exit={{ opacity: 0.0, y: 0 }}
                  className="fixed bottom-20 mb-4"
                >
                  <Alert /> 
                </motion.div>
              : null}
          </AnimatePresence>
        </>:null
      }
    </div>
    </>
  );
}
export default TrialApp;