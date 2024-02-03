import { Card, CardTitle, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

// const QMinMax = (props: { setCurrentChosen:any, question: Question }) => {
//   const q_text = props.question.question_text
//   const options = props.question.options
//     return <Container className='mt-5'>
//       <h2>{q_text}</h2>
//       {
//         options.map(o => {
//           return <Card> {o} </Card>
//         })
//       }
//     </Container>;
// };

const QMinMax = ({
    options,
    particularQuestionSubmission,
    setParticularQuestionSubmission,
}: {
    options: String[];
    particularQuestionSubmission: string[],
    setParticularQuestionSubmission: any;
}) => {
    const [chosen, setChosen] = useState<number>(0);

    useEffect(() => {
        for (let i = 0; i < options.length; i++) {
            if (options[i] === particularQuestionSubmission[0]) {
                setChosen(i+1);
            }
        }
    }, []);
    useEffect(() => {
        if (chosen === 0) {
            setParticularQuestionSubmission(['Not Done']);
        } else {
          setParticularQuestionSubmission([options[chosen - 1]]);
        }
    }, [chosen]);

    return (
        <Container className="d-flex justify-content-around flex-wrap align-content-around">
            {options.map((o: String, index: number) => {
                return (
                    <Card
                        key={index}
                        role="button"
                        className={
                            chosen === index + 1
                                ? 'mt-5 bg-primary text-white'
                                : 'mt-5'
                        }
                        style={{ width: '18rem' }}
                        onClick={() => setChosen(index + 1)}
                    >
                        <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                            {o}
                        </CardTitle>
                    </Card>
                );
            })}
        </Container>
    );
};

export default QMinMax