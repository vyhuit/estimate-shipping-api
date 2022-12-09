class ResponseModel {
  constructor(private parram : any) {
    this.isSuccess = this.parram.isSuccess || false;
    this.data = this.parram.data || {};
    this.errors = this.parram.error || [];
    this.msg = this.parram.msg || "";
  };
  isSuccess : boolean;
  data : any;
  errors : any[];
  msg : string;
  getResponse() {
    return this;
  }
};
