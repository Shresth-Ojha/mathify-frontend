import { Card, CardTitle, Container, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

// const QInput = (props: { setCurrentChosen: any; question: Question }) => {
//   const q_text = props.question.question_text;
//   const options = props.question.options
//     return (
//         <Container className="mt-5">
//             <h2>{q_text}</h2>

//             {options.map((o: String) => {
//                 return <Card> {o} </Card>;
//             })}
//         </Container>
//     );
// };

const QInput = ({
    options,
    particularQuestionSubmission,
    setParticularQuestionSubmission,
}: {
    options: String[];
    particularQuestionSubmission: String[];
    setParticularQuestionSubmission: any;
}) => {
    const [chosen, setChosen] = useState<{ [key: number]: string }>({});

    // useEffect(() => {
    //     for (let i = 0; i < options.length; i++) {
    //         if (options[i] === particularQuestionSubmission[0]) {
    //             setChosen(i + 1);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        let temp: { [key: number]: string } = {};

        for (let i = 0; i < options.length ; i++) {
            if (particularQuestionSubmission[i]) {
                temp[i+1] = particularQuestionSubmission[i].toString()
            } else {
                temp[i+1] = 'Not Done'
            }
        }

        setChosen(temp);


        // for (let i = 0; i < options.length - 2; i++) {
        //     if (particularQuestionSubmission[i]) {
        //         setChosen({
        //             ...chosen,
        //             [i + 1]: particularQuestionSubmission[i].toString(),
        //         });
        //     } else {
        //         setChosen({
        //             ...chosen,
        //             [i + 1]: 'Not Doene',
        //         });
        //     }
        //     console.log('chosen', chosen);
        // }
    }, []);

    useEffect(() => {
        // for (let i = 0; i < options.length; i++) {
        //     setParticularQuestionSubmission(particularQuestionSubmission[i] = chosen[i+1]);
        //     console.log("particular", particularQuestionSubmission)
        // }
        // if (chosen === 0) {
        //     setParticularQuestionSubmission(['Not Done']);
        // } else {
        //     setParticularQuestionSubmission([options[chosen - 1]]);
        // }
        let temp: string[] = [];
        const keys = Object.keys(chosen)

        for(var i = 0; i < keys.length; i++){
            temp.push(chosen[i+1])
        }
        setParticularQuestionSubmission(temp)
        console.log(particularQuestionSubmission)
    }, [chosen]);

    //chosen to list then to particularsubmission
    return (
        <Container className="d-flex justify-content-around flex-wrap align-content-around">
            {options.map((o: String, index: number) => {
                return (
                    <Card
                        key={index}
                        className="mt-5"
                        style={{ width: '18rem' }}
                    >
                        <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                            <InputGroup size="lg" className="m-0">
                                <InputGroup.Text
                                    className="m-0 pe-2"
                                    id="inputGroup-sizing-lg"
                                >
                                    {o} =
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-lg"
                                    placeholder="Enter Answer"
                                    type="number"
                                    value={chosen[index + 1]}
                                    onChange={(e) => {
                                        setChosen({
                                            ...chosen,
                                            [index + 1]: e.target.value,
                                        });
                                    }}
                                />
                            </InputGroup>
                        </CardTitle>
                    </Card>
                );
            })}
        </Container>
    );
};

export default QInput;
