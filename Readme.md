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

Todos:

- [ ]  Complete About Contact and Login section
- [ ]  Add auth and store flashcards in database
- [ ]  Add schemas for various users
- [ ]  Add pdf to FlashCard support