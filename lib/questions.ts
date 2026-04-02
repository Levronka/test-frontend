import { Question } from "./types";

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: "q2",
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Laravel", "React", "Flask"],
    correctAnswer: "React",
  },
  {
    id: "q3",
    question: "What is the purpose of CSS?",
    options: [
      "To add programming logic to web pages",
      "To style and layout web pages",
      "To create databases",
      "To manage server operations",
    ],
    correctAnswer: "To style and layout web pages",
  },
  {
    id: "q4",
    question: "Which HTTP method is used to retrieve data?",
    options: ["POST", "PUT", "GET", "DELETE"],
    correctAnswer: "GET",
  },
  {
    id: "q5",
    question: "What is TypeScript?",
    options: [
      "A runtime environment for JavaScript",
      "A superset of JavaScript with static typing",
      "A CSS framework",
      "A backend framework",
    ],
    correctAnswer: "A superset of JavaScript with static typing",
  },
];
