import { useEffect } from 'react';
import { QuizType } from '../utils/interfaces';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ activeQuiz }: { activeQuiz: QuizType  | null}) => {
    const navigate = useNavigate();

    //@ts-ignore
    const { user } = useAuth();
  
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        
        if(!activeQuiz){
          navigate('/dashboard')
        }

    }, []);

    return (
      <>
        {!user? <></>:
          <div>
              Quiz
              <br />
              {activeQuiz?.name}
          </div>
      }
      </>
      )
};

export default Quiz;
