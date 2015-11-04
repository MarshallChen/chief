
export class ServerError extends Error {
  constructor(res, type) {
    super(res, type);
    this.code = res.status;
    this.type = type || 'error';
    this.msg = res.body ? res.body.message : '服务器错误';
    this.field = res.body ? res.body.field : '';
  }
}