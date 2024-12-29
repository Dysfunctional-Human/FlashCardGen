# FlashCard gen

To run the project locally run the following commands in the root directory

```bash
#run the pythonBackend after installing dependencies
cd pythonBackend
uvicorn main:app --host localhost --port 8000
```

```bash
#run the frontend
cd frontend
npm install
npm run dev
```

# Todos

Alen:

- [ ]  Revamp/ Redo Flashcard component
- [ ]  express backend
- [ ]  Connect to DB (Store Flashcard)
- [ ]  rate limit at backend (4 req per min)
- [ ]  word limit (2500 words per min ~ 10000 chars)
- [ ]  Add schemas for various users
- [ ]  Add auth and store flashcards in database
- [ ]  dashboard

Aarav:

- [ ]  revamp the “main.py” file
- [ ]  image and pdf support
- [ ]  comparison of user input with flashcards and giving them a rating score
- [ ]  voice input ( speech to text)