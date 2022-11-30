declare class ResponseModel {
    private parram;
    constructor(parram: any);
    isSuccess: boolean;
    data: any;
    errors: any[];
    msg: string;
    getResponse(): this;
}
export { ResponseModel };
