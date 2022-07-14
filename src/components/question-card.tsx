import { AnswerObject } from '../App';
import { ButtonWrapper, Wrapper } from './question-card.styles';

interface Props {
    questions: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    questions,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
    return (
        <Wrapper>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: questions}} />
            <div>
                {answers.map((answer) => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button
                            disabled={userAnswer ? true : false}
                            value={answer}
                            onClick={callback}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    );
};

export { QuestionCard };
