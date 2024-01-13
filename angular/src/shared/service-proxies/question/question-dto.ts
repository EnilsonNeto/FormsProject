import { SectionDto } from '../section/section-dto';

export interface IQuestionDto {
    id: string;
    title: string;
    description: string;
    sectionId: string;
    section: SectionDto;
    idByFormula: string;
    formula: string;
    creationTime: Date;
}

export class QuestionDto implements IQuestionDto {

    static fromJS(data: any): QuestionDto {
        data = typeof data === 'object' ? data : {};
        const result = new QuestionDto();
        result.init(data);
        return result;
    }

    id: string;
    title: string;
    description: string;
    sectionId: string;
    section: SectionDto;
    idByFormula: string;
    formula: string;
    creationTime: Date;

    constructor(data?: IQuestionDto) {
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
            this.description = data.description;
            this.sectionId = data.sectionId;
            this.section = data.section;
            this.formula = data.formula;
            this.idByFormula = data.idByFormula;
            this.creationTime = data.creationTime;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.title = this.title;
        data.description = this.description;
        data.sectionId = this.sectionId;
        data.section = this.section;
        data.formula = this.formula;
        data.idByFormula = this.idByFormula;
        data.creationTime = this.creationTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new QuestionDto();
        result.init(json);
        return result;
    }
}
