# Interview SPX

## 1. Introduction
This repository contains the code for the interview assignment. The idea is to be close to a real project
and to evaluate the candidate's skills in software development, problem-solving, and software design.

As you'll see this code is not perfect, and there are some issues that need to be fixed.
Feel free to propose any improvements you think are necessary.

This repository is divided into two parts:

- backend: A NestJS application that provides an API to query OpenAI.
- frontend: A React application that provides a user interface to interact with the backend.

## 2. Installation
To install the backend and frontend applications, follow the instructions in the respective directories.

You will need an OpenAI API key to run the backend application. 
- You can get one [here](https://platform.openai.com/signup).
- Or We can provide a temporary API key for testing purposes during the interview.

- The API key should be stored in an environment variable called `OPENAI_API_KEY`. (or the .env file in the backend directory)

## 3. Running the Applications
To run the backend and frontend applications, follow the instructions in the respective directories.
Rq: by default, the backend runs on port 3000 and the frontend runs on port 3001.

## 4. Assignment

### Task 1 - Before the interview
Make sure you can run the applications locally on your laptop, and understand the code. The idea is to not lose time on setup during the interview.

### Task 2 - Before the interview (optional)
To get familiar with the code before the interview, you can try to allow the user to change the openai model used to generate the completion.
There is already an input form for that value in the frontend in App.tsx, but it is not being used in the backend in app.controller.ts
You can find the available models in the OpenAI API documentation [here](https://platform.openai.com/docs/api-reference/chat/create).

### Task 3 - Propose improvements (optional)
As you discover the code feel free to make notes or changes to improve the existing code before the interview.
This will help for the discussion during the interview.

### Task 4. During the interview

We will communicate this task during the interview