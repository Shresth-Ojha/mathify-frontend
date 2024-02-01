export interface User {
    name: String;
    email: String;
    password: String;
    // phone?: String
}

export interface UserProfile {
    name: String;
    email: String;
}

interface Question {
    question_no: Number;
    question_type: 'min/max' | 'match' | 'input';
    question_text: String;
    options: String[];
}

export interface Quiz {
    name: String,
    questions: Question,
    answers: Object
}
