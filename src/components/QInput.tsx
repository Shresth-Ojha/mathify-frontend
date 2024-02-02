import { Card, Container } from 'react-bootstrap';
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
    return <div>inputti {options[0]}</div>;
};

export default QInput;
