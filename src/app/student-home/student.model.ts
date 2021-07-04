export class StudentdataModel{
    constructor(
        public _id:String,
        public studentID:String,
        public Name:String,
        public PhNumber:String,
        public Email:String,
        public Password:String,
        public Password2:String,
        public add1:String,
        public add2:String,
        public city:String,
        public state:String,
        public country:String,
        public pin:Number,
        public qlfn:String,
        public passyear:Number,
        public SkillSet:String,
        public status:String,
        public traincourse:String,
        public year:Number,
        public photo:String | ArrayBuffer,
        public fees:String,
        public approvalStatus:String,
        public paymentStatus:String,
        public techtraining:String,
        public percentage:Number
    ){}
}