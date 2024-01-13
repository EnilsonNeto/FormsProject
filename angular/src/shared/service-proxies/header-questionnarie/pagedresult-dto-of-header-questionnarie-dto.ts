import { HeaderQuestionnarieDto } from "./header-questionnarie-dto";


export interface IPagedResultDtoOfHeaderQuestionnarieDto {
    totalCount: number | undefined;
    items: HeaderQuestionnarieDto[] | undefined;
}

export class PagedResultDtoOfHeaderQuestionnarieDto implements IPagedResultDtoOfHeaderQuestionnarieDto {

    static fromJS(data: any): PagedResultDtoOfHeaderQuestionnarieDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfHeaderQuestionnarieDto();
        result.init(data);
        return result;
    }
    totalCount: number | undefined;
    items: HeaderQuestionnarieDto[] | undefined;

    constructor(data?: IPagedResultDtoOfHeaderQuestionnarieDto) {
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
                    this.items.push(HeaderQuestionnarieDto.fromJS(item));
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

    clone(): PagedResultDtoOfHeaderQuestionnarieDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfHeaderQuestionnarieDto();
        result.init(json);
        return result;
    }
}
