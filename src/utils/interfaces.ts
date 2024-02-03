export interface User {
    name: String;
    email: String;
    password: String;
}

export interface UserProfile {
    name: String;
    email: String;
}

export interface Question {
    question_no: number;
    question_type: 'min/max' | 'match' | 'input';
    question_text: String;
    options: String[];
}

export interface QuizType {
    _id: String,
    name: String,
    questions: Question[],
    answers: Object,
    author: String,
    is_published: Boolean
}

export interface ReportType {
    quizName: String,
    score: number,
    total: number,
    attemptedDate: String
}
