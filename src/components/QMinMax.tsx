import { Card, CardTitle, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Question } from '../utils/interfaces';
import { useState } from 'react';

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
    setParticularQuestionSubmission,
}: {
    options: String[];
    setParticularQuestionSubmission: any
}) => {


    const [chosen, setChosen] = useState<any>();



    return <Container className='d-flex justify-content-around flex-wrap align-content-around'>
      {
        options.map((o:String, index:number) => {
          return (
              <Card key={index} className='mt-5' style={{ width: '18rem' }}>
                <CardTitle className='p-3 m-0 d-flex justify-content-center align-items-center'>
                  {o}
                </CardTitle>
              </Card>
          );
        })
      }
      </Container>;
};

export default QMinMax