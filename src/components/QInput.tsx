import { Card, CardTitle, Container, Form, InputGroup } from 'react-bootstrap';
import { Question } from '../utils/interfaces';

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
    setParticularQuestionSubmission,
}: {
    options: String[];
    setParticularQuestionSubmission:any
}) => {
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
                                <InputGroup.Text className='m-0 pe-2' id="inputGroup-sizing-lg">
                                    {o} =
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-lg"
                                    placeholder='Enter Answer'
                                    type='number'
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
