export class employerDataModel{
    constructor(
        public _id:String,
        public EmployerID:String,
        public Name:String,
        public PhNumber:String,
        public Email:String,
        public Password:String,
        public Password2:String,
        public photo:String | ArrayBuffer,
        public department:String
    ){}
}