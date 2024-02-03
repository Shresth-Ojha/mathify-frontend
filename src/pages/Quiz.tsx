import { useEffect, useState } from 'react';
import { Question } from '../utils/interfaces';
import { useAuth } from '../store/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import QMinMax from '../components/QMinMax';
import QMatch from '../components/QMatch';
import QInput from '../components/QInput';

// const QuizOld = ({ activeQuiz }: { activeQuiz: QuizType | null }) => {
//     const navigate = useNavigate();
//     const [currentQuestion, setCurrentQuestion] = useState<number>(0);
//     const [currentChosen, setCurrentChosen] = useState<string[]>([]);
//     const [submission, setSubmission] = useState<Object>({});

//     const questions: any = activeQuiz?.questions;
//     const answers: any = activeQuiz?.answers;

//     //@ts-ignore
//     const { user } = useAuth();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }

//         if (!activeQuiz) {
//             navigate('/dashboard');
//         }
//     }, []);

//     const questionDone = () => {
//         setCurrentQuestion(currentQuestion + 1);
//         setSubmission({ ...submission, currentQuestion: currentChosen });
//     };

//     return (
//         <>
//             {!user ? (
//                 <></>
//             ) : (
//                 <Container className="mt-5 d-flex flex-column">
//                     <h1>{activeQuiz?.name}</h1>

//                     <Container className="d-flex flex-column flex-grow-1">
//                         {questions[currentQuestion].question_type ===
//                         'min/max' ? (
//                             <QMinMax
//                                 setCurrentChosen={setCurrentChosen}
//                                 question={questions[currentQuestion]}
//                             />
//                         ) : questions[currentQuestion].question_type ===
//                           'match' ? (
//                             <QMatch
//                                 setCurrentChosen={setCurrentChosen}
//                                 question={questions[currentQuestion]}
//                                 answers={answers[currentQuestion + 1]}
//                             />
//                         ) : (
//                             <QInput
//                                 setCurrentChosen={setCurrentChosen}
//                                 question={questions[currentQuestion]}
//                             />
//                         )}
//                     </Container>

//                     <Container className="d-flex justify-content-between">
//                         {currentQuestion === 0 ? (
//                             <>
//                                 <Button
//                                     variant="primary"
//                                     size="lg"
//                                     onClick={() =>
//                                         setCurrentQuestion(currentQuestion - 1)
//                                     }
//                                     disabled
//                                 >
//                                     Back
//                                 </Button>
//                             </>
//                         ) : (
//                             <Button
//                                 variant="primary"
//                                 size="lg"
//                                 onClick={() =>
//                                     setCurrentQuestion(currentQuestion - 1)
//                                 }
//                             >
//                                 Back
//                             </Button>
//                         )}
//                         {currentQuestion === questions.length - 1 ? (
//                             <Button variant="success" size="lg">
//                                 Submit
//                             </Button>
//                         ) : (
//                             <Button
//                                 variant="primary"
//                                 size="lg"
//                                 onClick={questionDone}
//                             >
//                                 Next
//                             </Button>
//                         )}
//                     </Container>
//                 </Container>
//             )}
//         </>
//     );
// };

const Quiz = () => {
    //@ts-ignore
    const { user, currentExam, startExam, submitExam } = useAuth();
    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    const navigate = useNavigate();

    const questions: Question[] = currentExam?.questions;
    const answers: {
        [key: number]: string[];
    } = currentExam?.answers; // {1:[], 2:[]}

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [areyousure, setAreyousure] = useState<boolean>(false);
    const [submission, setSubmission] = useState<{ [key: number]: string[] }>({});
    const [particularQuestionSubmission, setParticularQuestionSubmission] =
        useState<string[]>([]);


    const [leftColorForMatchQ, setLeftColorForMatchQ] = useState<{
        [key: number]: { [key: number]: string };
    }>({}); //index of matching qn -> leftColor mapping
    const [mapForMatchQ, setMapForMatchQ] = useState<any> ({}); //index of matching qn -> map mapping (reverse map we can generate)
    const [mapReverseForMatchQ, setMapReverseForMatchQ] = useState<any> ({}); //index of matching qn -> map mapping (reverse map we can generate)


    const [quizLoading, setQuizLoading] = useState<boolean>(true);

    const { quizId } = useParams();

    useEffect(() => {
        startExam(quizId).then(() => {
            setQuizLoading(false);
        });
    }, []);

    const nextHandler = () => {
        // console.log("submisision -> " , submission);
        // console.log('particulare -> ', particularQuestionSubmission);
        setSubmission({
            ...submission,
            [currentQuestion + 1]: particularQuestionSubmission,
        });
        if (currentQuestion >= questions.length - 1) {
            if (!areyousure) {
                // setParticularQuestionSubmission([]);
                setAreyousure(true);
            } else {
                handleExamSubmit();
            }
        } else {
            if (submission[currentQuestion+1+1]) {
                setParticularQuestionSubmission(submission[currentQuestion+1+1]);
            } else {
                setParticularQuestionSubmission(['Not Done']);
            }
        }
        setCurrentQuestion(currentQuestion + 1);
    };

    const backHandler = () => {
        setCurrentQuestion(currentQuestion - 1);
        setParticularQuestionSubmission(submission[currentQuestion]);
        setAreyousure(false);
    };

    const handleExamSubmit = async () => {
        submitExam(currentExam._id, submission)
            .then((reportId: string) => {
                alert('Submitted');
                navigate('/report/' + reportId);
                return;
            })
            .catch((error: any) => console.log('ERROER  ', error));
    };

    return (
        <div className="w-100 d-flex flex-grow-1 flex-column m-0 p-0 booo">
            {quizLoading ? (
                <div className="d-flex mx-auto my-auto">
                    <div>
                        <div className="text-center">Loading Quiz...</div>
                        <img src="/images/loading.gif" alt="" />
                    </div>
                </div>
            ) : (
                <Container className="mt-5 d-flex flex-column flex-grow-1 justify-content-between mb-5">
                    <Container>
                        <div>
                            <h1>{currentExam.name} </h1>
                        </div>
                        <div className="mt-4">
                            {currentQuestion >= questions.length ? (
                                ''
                            ) : (
                                <h2>
                                    {questions[currentQuestion].question_text}
                                </h2>
                            )}
                        </div>
                    </Container>

                    <Container>
                        {currentQuestion >= questions.length ? (
                            <h3 className="text-center">
                                DO YOU WANT TO SUBMIT?
                            </h3>
                        ) : questions[currentQuestion].question_type ==
                          'min/max' ? (
                            <QMinMax
                                options={questions[currentQuestion].options}
                                particularQuestionSubmission={
                                    particularQuestionSubmission
                                }
                                setParticularQuestionSubmission={
                                    setParticularQuestionSubmission
                                }
                            />
                        ) : questions[currentQuestion].question_type ==
                          'match' ? (
                            <QMatch
                                options={questions[currentQuestion].options}
                                answers={answers[currentQuestion + 1]}
                                particularQuestionSubmission={
                                    particularQuestionSubmission
                                }
                                setParticularQuestionSubmission={
                                    setParticularQuestionSubmission
                                }
                                question_index={currentQuestion + 1}
                                leftColorForMatchQ={leftColorForMatchQ}
                                setLeftColorForMatchQ={setLeftColorForMatchQ}
                                mapForMatchQ={mapForMatchQ}
                                setMapForMatchQ={setMapForMatchQ}
                                mapReverseForMatchQ={mapReverseForMatchQ}
                                setMapReverseForMatchQ={setMapReverseForMatchQ}
                            />
                        ) : (
                            <QInput
                                options={questions[currentQuestion].options}
                                particularQuestionSubmission={
                                    particularQuestionSubmission
                                }
                                setParticularQuestionSubmission={
                                    setParticularQuestionSubmission
                                }
                            />
                        )}
                    </Container>

                    <Container className=" mt-4 d-flex justify-content-between align-items-end">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => {
                                backHandler();
                            }}
                            disabled={currentQuestion == 0}
                        >
                            Back
                        </Button>
                        <h4>
                            {currentQuestion <= questions.length - 1
                                ? `${currentQuestion + 1} / ${questions.length}`
                                : 'You are a CHAMP!'}
                            {/* {currentQuestion + 1} / {questions.length} */}
                        </h4>
                        <Button
                            variant={
                                currentQuestion < questions.length - 1
                                    ? 'primary'
                                    : areyousure
                                    ? 'warning'
                                    : 'success'
                            }
                            size="lg"
                            onClick={() => {
                                nextHandler();
                            }}
                        >
                            {currentQuestion < questions.length - 1
                                ? 'Next'
                                : areyousure
                                ? 'Really?'
                                : 'Submit'}
                        </Button>
                    </Container>
                </Container>
            )}
        </div>
    );
};

export default Quiz;
