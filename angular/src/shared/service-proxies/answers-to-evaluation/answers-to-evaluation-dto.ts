import { HeaderQuestionnarieDto } from '../header-questionnarie/header-questionnarie-dto';
import { SectionDto } from '../section/section-dto';
import { QuestionDto } from '../question/question-dto';

export interface IAnswersEvaluationDto {
    id: string;
    headerQuestionnarieId: string;
    headerQuestionnarie: HeaderQuestionnarieDto;
    sectionId: string;
    section: SectionDto;
    questionId: string;
    question: QuestionDto;
    textOfAlternatives: string;
    valueOfAlternatives: string;
    valueOfHeader: string;
    valueOfSections: string;
}

export class AnswersEvaluationDto implements IAnswersEvaluationDto {

    static fromJS(data: any): AnswersEvaluationDto {
        data = typeof data === 'object' ? data : {};
        const result = new AnswersEvaluationDto();
        result.init(data);
        return result;
    }

    id: string;
    initialEvaluationId: string;
    headerQuestionnarieId: string;
    headerQuestionnarie: HeaderQuestionnarieDto;
    sectionId: string;
    section: SectionDto;
    questionId: string;
    question: QuestionDto;
    textOfAlternatives: string;
    valueOfAlternatives: string;
    valueOfHeader: string;
    valueOfSections: string;

    constructor(data?: IAnswersEvaluationDto) {
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
            this.initialEvaluationId = data.initialEvaluationId;
            this.headerQuestionnarieId = data.headerQuestionnarieId;
            this.headerQuestionnarie = data.headerQuestionnarie;
            this.sectionId = data.sectionId;
            this.section = data.section;
            this.questionId = data.questionId;
            this.question = data.question;
            this.textOfAlternatives = data.textOfAlternatives;
            this.valueOfAlternatives = data.valueOfAlternatives;
            this.valueOfHeader = data.valueOfHeader;
            this.valueOfSections = data.valueOfSections;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.initialEvaluationId = this.initialEvaluationId;
        data.headerQuestionnarieId = this.headerQuestionnarieId;
        data.headerQuestionnarie = this.headerQuestionnarie;
        data.sectionId = this.sectionId;
        data.section = this.section;
        data.questionId = this.questionId;
        data.question = this.question;
        data.textOfAlternatives = this.textOfAlternatives;
        data.valueOfAlternatives = this.valueOfAlternatives;
        data.valueOfHeader = this.valueOfHeader;
        data.valueOfSections = this.valueOfSections;
        
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new AnswersEvaluationDto();
        result.init(json);
        return result;
    }
}
