from langchain_groq import ChatGroq # type: ignore
from langchain.chains.summarize import load_summarize_chain# type: ignore
from langchain.chains import RetrievalQA # type: ignore
from langchain_text_splitters.character import RecursiveCharacterTextSplitter# type: ignore
from langchain.docstore.document import Document# type: ignore
from langchain.prompts import PromptTemplate# type: ignore
from langchain_huggingface import HuggingFaceEmbeddings# type: ignore
from langchain_community.vectorstores import FAISS# type: ignore
from huggingface_hub import login# type: ignore
import re
import os
from fastapi import FastAPI# type: ignore
import uvicorn# type: ignore
app = FastAPI()

@app.get("/")
def index():
    return {"message": "Flash Card Generation Project"}


# Hugging face login
hf_key='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'
login(hf_key)

# Text Splitting before passing to LLM
def text_splitting(USER_TEXT):
    ''' Returns lists of 'Document' object for separate Question and Answer generation respectively'''
    
    recursive_splitter = RecursiveCharacterTextSplitter(   # Defining the text splitter (Recursive Character text splitter splits text on basis of newline characters, spaces, etc) 
        chunk_size=500,             # Maximum no. of tokens in a chunk
        chunk_overlap=50            # No. of overlapping tokens between consecutive chunks to maintain context continuity
    )
    
    chunks_ques_gen = recursive_splitter.split_text(USER_TEXT)    # Dividing user's reference material into chunks to fit the data within context window and not sacrifice performance with too much context
    document_ques_gen = [Document(page_content=t) for t in chunks_ques_gen]   # Converts individual chunks into a Document object for easier processing
    
    document_ans_gen = recursive_splitter.split_documents(document_ques_gen)  # Refining the question chunks for better precision while answering, to make sure LLM focuses only on relevant parts while generating answers
    
    return document_ques_gen, document_ans_gen  

# Setting up the prompt and refine templates
prompt_template = """
You are a helpful, respectful and honest teaching assistant who is responsible for aiding teachers with their daily work and helping students secure more marks.
Your task is to generate questions from a given piece of text and the make sure that the questions are relevant to the topic covered in the text
The following text was given by the user:

--------------
{text}
--------------

Your task is to generate atleast 5 questions from the above given USER_TEXT, make sure the questions are from the USER_TEXT itself and no outside resource.
Make sure the questions are meaningful and relevant to the general topic of the context.
Also, don't explicitly mention the context in your output like - "The context states-", etc.

QUESTIONS:
"""

refine_template = ("""
You are an expert at creating practice questions based on reference material given to you.
Your goal is to help a student prepare for a test based on the material given to them.
We have received some practice questions to a certain extent: {existing_answer}.
We have the option to refine the existing questions or add new ones (Minimum 5 questions are compulsory).
Make sure the questions are meaningful and relevant to the general topic of the context.
Also, don't explicitly mention the context in your output like - "The context states-", etc.
Make sure that the questions aren't repetitive.
(only if necessary) with some more context below.
------------
{text}
------------

Given the new context, refine the original questions in English.
If the context is not helpful, please provide the original questions.

Please provide output in this STRICT JSON format:
  [
      {{
          "question": "Specific question text",
      }},
      ...
  ]
"""
)

hf_st_embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-mpnet-base-v2')

# Using PromptTemplate to give prompts to the LLM in a structured form
question_gen_prompt = PromptTemplate( 
    template=prompt_template,
    input_variables=["text"]
)

refined_question_gen_prompt = PromptTemplate(
    template=refine_template,
    input_variables=["existing_answer","text"]
)

def load_llm():
    """Initializes the Question and the Answer generation models respectively"""
    
    groq_key = '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'
    os.environ["GROQ_API_KEY"] = groq_key
    
    llm_question_gen = ChatGroq(    
        model='gemma2-9b-it',   # Using gemma2-9b model for question generation
        temperature=0.3         # Setting a low temperature to ensure model sticks to the provided context and doesn't get too creative
    )
    
    llm_answer_gen = ChatGroq(
        model='gemma2-9b-it',
        #model='mixtral-8x7b-32768',  # Using mixtral-8x7b model for answer generation
        temperature=0.1              # Setting an even lower temperature 
    )
    
    return llm_question_gen, llm_answer_gen


@app.post("/api/generate-questions")
def generate_questions(user_input: dict):
    global FINAL_QUESTIONS
    global document_ans_gen
    
    USER_TEXT = user_input["text"]
    document_ques_gen, document_ans_gen = text_splitting(USER_TEXT)
    question_gen_llm, _ =load_llm()
    
    question_gen_chain = load_summarize_chain(
        llm=question_gen_llm,
        verbose=True,
        chain_type='refine',
        question_prompt=question_gen_prompt,
        refine_prompt=refined_question_gen_prompt
    )
    
    questions = question_gen_chain.run(document_ques_gen)
    pattern = r'"question":\s*"(.*?)"'
    matches = re.findall(pattern, questions)
    i=1
    filtered_questions_list = []
    for question in matches:
        filtered_questions_list.append(f"{i}. "+question)
        i += 1
        
    FINAL_QUESTIONS=filtered_questions_list
    return filtered_questions_list
        
        
@app.get("/api/generate-answers")
def generate_answers():
    faiss_vector_store = FAISS.from_documents(document_ans_gen, hf_st_embeddings)
    
    _, ans_gen_llm = load_llm()
    
    answer_template = """
                Context: {context}
                Question: {question}

                Generate a detailed answer that:
                1. Only give the answer as the output and nothing else.
                2. Directly addresses the question and answer from the context itself.
                3. Uses specific information from the context.
                4. Is structured in clear paragraphs.
                5. Includes relevant examples if present in the context.
                6. Don't explicitly mention the context in your output like - "The context states-", etc.

                Answer:
                """
    answer_prompt= PromptTemplate(
        template=answer_template,
        input_variables=["context", "question"]
    )
    
    ans_gen_chain = RetrievalQA.from_chain_type(
        llm=ans_gen_llm,
        retriever=faiss_vector_store.as_retriever(),
        chain_type_kwargs={"prompt": answer_prompt}
    )
    
    qa_pairs = {}
    for question in FINAL_QUESTIONS:
        answer=ans_gen_chain(question)
        qa_pairs[question]=answer['result']
        
    return qa_pairs

     








    
