export class ExpressionDTO {
    constructor(
        public id: number,
        public expressionList: string,
        public result: string,
        public date: string,
        public firstValue: string,
        public secondValue: string,
        public operation: string
      ) {}
}