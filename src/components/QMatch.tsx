import { Card, CardTitle, Col, Container, Row } from 'react-bootstrap';
import { Question } from '../utils/interfaces';

// const QMatch = (props: { setCurrentChosen: any; question: Question, answers: String[] }) => {
//   const q_text = props.question.question_text;
//   const options = props.question.options
//   const answers = props.answers
//     return (
//         <Container className="mt-5">
//             <h2>{q_text}</h2>

//             {options.map((o: String, index: number) => {
//                 return (
//                     <Row>
//                         <Col>
//                             <Card> {o} </Card>
//                         </Col>
//                         <Col>
//                             <Card> {answers[index]} </Card>
//                         </Col>
//                     </Row>
//                 );
//             })}
//         </Container>
//     );
// };

const QMatch = ({
    options,
    answers,
    setParticularQuestionSubmission,
}: {
    options: String[];
    answers: String[];
    setParticularQuestionSubmission:any
}) => {



    return (
        <Container className="d-flex justify-content-around flex-wrap align-content-around">
            <Row>
                {options.map((o:String, index:number) => {
                    return (
                        <Card
                            key={index}
                            className="mt-5"
                            style={{ width: '18rem' }}
                        >
                            <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                                {o}
                            </CardTitle>
                        </Card>
                    );
                })}
            </Row>
            <Row>
                {answers.map((a:String, index:number) => {
                    return (
                        <Card
                            key={index}
                            className="mt-5"
                            style={{ width: '18rem' }}
                        >
                            <CardTitle className="p-3 m-0 d-flex justify-content-center align-items-center">
                                {a}
                            </CardTitle>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    );
};

export default QMatch;
