import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import ErrorBoundary from './ErrorBoundary';

function App() {
  const SampleText="Lobotomy is a surgical procedure performed on the brain. The brain has several lobes, each with different functions. The frontal lobe was the part of the brain targeted in the standard lobotomy operations practiced in the 1940s and 1950s. This surgery consisted of making holes in the skull, removing some brain tissue, and severing the connections between the frontal lobe and the thalamus. The procedure was pioneered by the Portuguese scientist Egas Moniz. Tens of thousands of lobotomies were carried out in some countries to treat schizophrenia, affective disturbance, and obsessive-compulsive disorders (OCD). Moniz was awarded the Nobel Prize in 1949. What Is a Lobotomy? A lobotomy is a surgical procedure to provide relief to people with mental illnesses unresponsive to standard treatment. This method was pioneered during the 1940s and 1950s, when treatments for psychiatric disorders were few, chiefly insulin coma and electroconvulsive therapy (ECT). Psychiatric wards and mental asylums were full of suffering men and women. A lobotomy was used to treat these patients. The operation aimed to sever the nerve fibers between the frontal lobe of the brain and the thalamus, the thalamo-frontal radiation. Many methods were used, including brain cannulae, leukotomes, chemical injection, electrocoagulation, and destructive ultrasonic waves. By todays standards, these surgeries were primitive and dangerous. But a large study in the U.S. found that 44% of patients were released from hospitals after the surgery. Similar good results were reported by studies in Canada (45%) and England and Wales (46%). What Does a Lobotomy Do? During the 1940s and 1950s, lobotomies were performed to treat patients suffering from mental disorders for many years. Some conditions treated by lobotomy included: Obsessive-compulsive disorder (OCD) Severe depressive illness Psychosis Schizophrenia Manic depressive psychosis Chronic neurosis Psychopathic personality A lobotomy disrupts the connections between the frontal cortex and the rest of the brain, particularly the thalamus. Doctors believed that doing so would reduce abnormal stimuli reaching the frontal area. Such stimuli were thought to cause impulsive and violent behavior. A lobotomy would make the patient calm and docile so that they could be sent home to live with their family. Related: Early-Onset Dementia: A Caregivers Guide Lobotomy History Lobotomies were pioneered in the 1930s, a time when mental asylums were packed with men and women. Effective treatments were few, and many patients spent years locked up in crowded asylums. Though a lobotomy seems repulsive today, it was seen as a ray of hope then. It restored normal functioning to a portion of people who underwent it. Many of them were able to rejoin their families. The surgery involved removing a part of the frontal lobe of the patients brain through a hole or holes made in the skull. Many people with depression and schizophrenia benefited. One of the pioneers was Dr. Walter Freeman, who started the procedure in the U.S. in partnership with a qualified neurosurgeon. Later, he started doing the procedure himself and performed thousands of lobotomies, including 19 on children. He used and taught a transorbital approach, carried out through the eye socket using an instrument he designed himself. Freedman himself reported that over a quarter of patients undergoing lobotomy developed epilepsy. Many people had other severe adverse effects, becoming apathetic or displaying inappropriate social behavior. Lobotomy was also used to reverse aggressive tendencies in some people. Many doctors opposed such surgery, believing it was unethical to attempt to change a humans personality. There was also public resentment over the severe side effects and reckless use of lobotomy. With the introduction of medications like chlorpromazine and haloperidol in the 1950s, classical lobotomy was almost abandoned by the 1960s. Lobotomy Side Effects Operations on the brain are always risky. It is an exceedingly delicate organ and is easily damaged, often irreversibly. Several immediate and long-term side effects are known after lobotomy: Bleeding after the operation Brain infection and abscess Dementia Intellectual impairment Disinhibition and inappropriate social behavior Epilepsy Apathy Incontinence Obesity Death (2%)"
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);
  const [loadingA, setLoadingA] = useState(true);
  const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   axios.get('/api/generate-questions')
  //   .then(res => {
  //     setQuestions(res.data)
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // })
  function GenerateQuestions() {
    setVisible(true);
    setLoadingQ(true);
    setLoadingA(true);
    axios.post('/api/generate-questions',{
      "text":SampleText
    })
    .then(res => {
      setQuestions(res.data)
      setLoadingQ(false)
    })
    .catch((err) => {
      throw new Error("Data fetch failed: " + err.message);
      console.log(err)
    })
    axios.get('/api/generate-answers')
    .then(res => {
      setAnswers(res.data)
      setLoadingA(false)
    })
    .catch((err) => {
      throw new Error("Data fetch failed: " + err.message);
      console.log(err)
    })
  }
  return (
    <>
    <h1>Flash Card Generator</h1>
    <button onClick={GenerateQuestions}>Generate Questions</button>
    {visible?(<div>
      <div className="container" style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap',backgroundColor:'black',color:'white'}}>
      <ErrorBoundary>
      {loadingQ?<h2>Loading questions...</h2>:(
          questions.map((question, index) => (
            <div key={index} className="card">
              <strong>Question:</strong> {question}
            </div>
          ))
        )}
      </ErrorBoundary>
    </div>
    <div className="container" style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap',backgroundColor:'black',color:'white'}}>
      {loadingA?<h2>Loading answers...</h2>:JSON.stringify(answers)}
    </div>
    </div>
  ):null}
    </>
  )
}

export default App
