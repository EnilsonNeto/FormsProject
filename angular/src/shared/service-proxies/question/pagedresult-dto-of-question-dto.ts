import { QuestionDto } from "./question-dto";

export interface IPagedResultDtoOfQuestionDto {
    totalCount: number | undefined;
    items: QuestionDto[] | undefined;
}

export class PagedResultDtoOfQuestionDto implements IPagedResultDtoOfQuestionDto {

    static fromJS(data: any): PagedResultDtoOfQuestionDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfQuestionDto();
        result.init(data);
        return result;
    }
    totalCount: number | undefined;
    items: QuestionDto[] | undefined;

    constructor(data?: IPagedResultDtoOfQuestionDto) {
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
            this.totalCount = data['totalCount'];
            if (data['items'] && data['items'].constructor === Array) {
                this.items = [];
                for (const item of data['items']) {
                    this.items.push(QuestionDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['totalCount'] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data['items'] = [];
            for (const item of this.items) {
                data['items'].push(item.toJSON());
            }
        }
        return data;
    }

    clone(): PagedResultDtoOfQuestionDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfQuestionDto();
        result.init(json);
        return result;
    }
}
