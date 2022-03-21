export class Course{
    constructor(public _id:string, 
        public courseCode: string,
        public subjectCode:string,
        public level:string, 
        public progression:string,
        public name: string,
        public points:string,
        public institutionCode:string,
        public subject:string 
    ){}
}