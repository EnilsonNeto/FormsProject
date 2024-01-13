import { SectionDto } from '../section/section-dto';
import { JourneyDto } from './../journey/journey-dto';

export interface IHeaderQuestionnarieDto {
    id: string;
    title: string;
    description: string;
    journeyId: string;
    journey: JourneyDto;
    sections: SectionDto;
    formula?: string;
    isRequired: boolean;
}

export class HeaderQuestionnarieDto implements IHeaderQuestionnarieDto {

    static fromJS(data: any): HeaderQuestionnarieDto {
        data = typeof data === 'object' ? data : {};
        const result = new HeaderQuestionnarieDto();
        result.init(data);
        return result;
    }

    id: string;
    title: string;
    description: string;
    journeyId: string;
    journey: JourneyDto;
    sections: SectionDto;
    formula?: string;
    isRequired: boolean;

    constructor(data?: IHeaderQuestionnarieDto) {
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
            this.journeyId = data.journeyId;
            this.journey = data.journey;
            this.sections = data.sections;
            this.formula = data.formula;
            this.isRequired = data.isRequired;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.title = this.title;
        data.description = this.description;
        data.journeyId = this.journeyId;
        data.journey = this.journey;
        data.sections = this.sections;
        data.formula = this.formula;
        data.isRequired = this.isRequired;
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new HeaderQuestionnarieDto();
        result.init(json);
        return result;
    }
}
