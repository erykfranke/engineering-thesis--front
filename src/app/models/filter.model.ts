export interface FilterModel {
    dateRange: {
        start: Date;
        end: Date;
    };
    hourRange: {
        start: number;
        end: number;
    };
    disabilities: {
        id: number;
        name: string;
        slug: string;
    } [];
}
