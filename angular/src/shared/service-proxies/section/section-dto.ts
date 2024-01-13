import { HeaderQuestionnarieDto } from "../header-questionnarie/header-questionnarie-dto";

export interface ISectionDto {
    id: string;
    title: string;
    description: string;
    subTitle: string;
    headerQuestionnarieId: string;
    headerQuestionnarie: HeaderQuestionnarieDto;
    creationTime: Date;
}

export class SectionDto implements ISectionDto {

    static fromJS(data: any): SectionDto {
        data = typeof data === 'object' ? data : {};
        const result = new SectionDto();
        result.init(data);
        return result;
    }

    id: string;
    title: string;
    description: string;
    subTitle: string;
    headerQuestionnarieId: string;
    headerQuestionnarie: HeaderQuestionnarieDto;
    creationTime: Date;

    constructor(data?: ISectionDto) {
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
            this.subTitle = data.subTitle;
            this.description = data.description;
            this.headerQuestionnarieId = data.headerQuestionnarieId;
            this.headerQuestionnarie = data.headerQuestionnarie;
            this.creationTime = data.creationTime;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data.id = this.id;
        data.title = this.title;
        data.subTitle = this.subTitle;
        data.description = this.description;
        data.headerQuestionnarieId = this.headerQuestionnarieId;
        data.headerQuestionnarie = this.headerQuestionnarie;
        data.creationTime = this.creationTime
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new SectionDto();
        result.init(json);
        return result;
    }
}
