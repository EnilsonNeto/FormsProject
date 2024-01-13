import { AlternativeQuestionnarieDto } from "./alternatives-questionnarie-dto";


export interface IPagedResultDtoOfAlternativeQuestionnarieDto {
    totalCount: number | undefined;
    items: AlternativeQuestionnarieDto[] | undefined;
}

export class PagedResultDtoOfAlternativeQuestionnarieDto implements IPagedResultDtoOfAlternativeQuestionnarieDto {

    static fromJS(data: any): PagedResultDtoOfAlternativeQuestionnarieDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfAlternativeQuestionnarieDto();
        result.init(data);
        return result;
    }
    totalCount: number | undefined;
    items: AlternativeQuestionnarieDto[] | undefined;

    constructor(data?: IPagedResultDtoOfAlternativeQuestionnarieDto) {
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
                    this.items.push(AlternativeQuestionnarieDto.fromJS(item));
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

    clone(): PagedResultDtoOfAlternativeQuestionnarieDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfAlternativeQuestionnarieDto();
        result.init(json);
        return result;
    }
}
