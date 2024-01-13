import { SectionDto } from "./section-dto";


export interface IPagedResultDtoOfSectionDto {
    totalCount: number | undefined;
    items: SectionDto[] | undefined;
}

export class PagedResultDtoOfSectionDto implements IPagedResultDtoOfSectionDto {

    static fromJS(data: any): PagedResultDtoOfSectionDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfSectionDto();
        result.init(data);
        return result;
    }
    totalCount: number | undefined;
    items: SectionDto[] | undefined;

    constructor(data?: IPagedResultDtoOfSectionDto) {
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
                    this.items.push(SectionDto.fromJS(item));
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

    clone(): PagedResultDtoOfSectionDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfSectionDto();
        result.init(json);
        return result;
    }
}
