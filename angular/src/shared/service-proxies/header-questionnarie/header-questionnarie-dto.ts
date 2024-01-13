import { SectionDto } from '../section/section-dto';

export interface IHeaderQuestionnarieDto {
    id: string;
    title: string;
    description: string;
    sections: SectionDto;
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
    sections: SectionDto;
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
            this.sections = data.sections;
            this.isRequired = data.isRequired;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.title = this.title;
        data.description = this.description;
        data.sections = this.sections;
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
