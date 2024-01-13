import { AnswersEvaluationDto } from "./answers-to-evaluation-dto";


export interface IPagedResultDtoOfAnswersEvaluationDto {
    totalCount: number | undefined;
    items: AnswersEvaluationDto[] | undefined;
}

export class PagedResultDtoOfAnswersEvaluationDto implements IPagedResultDtoOfAnswersEvaluationDto {

    static fromJS(data: any): PagedResultDtoOfAnswersEvaluationDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfAnswersEvaluationDto();
        result.init(data);
        return result;
    }
    totalCount: number | undefined;
    items: AnswersEvaluationDto[] | undefined;

    constructor(data?: IPagedResultDtoOfAnswersEvaluationDto) {
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
                    this.items.push(AnswersEvaluationDto.fromJS(item));
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

    clone(): PagedResultDtoOfAnswersEvaluationDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfAnswersEvaluationDto();
        result.init(json);
        return result;
    }
}
