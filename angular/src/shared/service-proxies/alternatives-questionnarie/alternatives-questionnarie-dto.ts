import { QuestionDto } from './../question/question-dto';

export interface IAlternativeQuestionnarieDto {
    id: string;
    title: string;
    value: string;
    type: string;
    questionId: string;
    question: QuestionDto;
    creationTime: Date;
}

export class AlternativeQuestionnarieDto implements IAlternativeQuestionnarieDto {

    static fromJS(data: any): AlternativeQuestionnarieDto {
        data = typeof data === 'object' ? data : {};
        const result = new AlternativeQuestionnarieDto();
        result.init(data);
        return result;
    }

    id: string;
    title: string;
    value: string;
    type: string;
    questionId: string;
    question: QuestionDto;
    creationTime: Date;

    constructor(data?: IAlternativeQuestionnarieDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.value = data.value;
            this.type = data.type;
            this.questionId = data.questionId;
            this.question = data.question;
            this.creationTime = data.creationTime;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.title = this.title;
        data.value = this.value;
        data.type = this.type;
        data.questionId = this.questionId;
        data.question = this.question;
        data.creationTime = this.creationTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new AlternativeQuestionnarieDto();
        result.init(json);
        return result;
    }
}
