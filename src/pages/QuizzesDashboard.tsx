import './dashboard.css'


const QuizzesDashboard = () => {
    const quizzes = [
        {
            name: 'basic math1',
        },
        { name: 'basic math2' },
    ];

    return (
        <section className="quizzes-dashboard">
            {
              quizzes.map(q => {
                return <div className='card'>{q.name}</div>
              }
              )
            }
        </section>
    );
};

export default QuizzesDashboard;
