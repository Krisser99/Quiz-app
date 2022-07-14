import { useState } from 'react';
import { Difficult, fetchQuizData, QuestionsState } from './api';
import { GlobalStyle, Wrapper } from './App.styles';
import { QuestionCard } from './components';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(true);

    const startQuiz = async () => {
        try {
            setLoading(true);
            setGameOver(false);
            const newQuestions = await fetchQuizData(
                TOTAL_QUESTIONS,
                Difficult.EASY
            );

            setQuestions(newQuestions);
            setScore(0);
            setUserAnswers([]);
            setNumber(0);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(questions);

    const checkAnswer = (e: any) => {
        if (!gameOver) {
            // User's answer
            const answer = e.currentTarget.value;
            // Check answer against correct answer
            const correct = questions[number].correct_answer === answer;
            // Add score if answer is correct
            if (correct) setScore((prev) => prev + 1);
            // Save the answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const nextQuestion = () => {
        // Move on to the next question if not the last question
        const nextQ = number + 1;

        if (nextQ === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQ);
        }
    };

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <div>
                    <h1>React Quiz</h1>
                    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                        <button className="start" onClick={startQuiz}>
                            Start
                        </button>
                    ) : null}
                    {!gameOver && <p>Score: {score}</p>}
                    {loading && <p>Loading Questions ...</p>}
                    {!loading && !gameOver && (
                        <QuestionCard
                            questionNr={number + 1}
                            totalQuestions={TOTAL_QUESTIONS}
                            questions={questions[number].question}
                            answers={questions[number].answers}
                            userAnswer={
                                userAnswers ? userAnswers[number] : undefined
                            }
                            callback={checkAnswer}
                        />
                    )}
                    {!gameOver &&
                    !loading &&
                    userAnswers.length === number + 1 &&
                    number !== TOTAL_QUESTIONS - 1 ? (
                        <button className="next" onClick={nextQuestion}>
                            Next Question
                        </button>
                    ) : null}
                </div>
            </Wrapper>
        </>
    );
};

export default App;
