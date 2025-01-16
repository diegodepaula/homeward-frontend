declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

interface Student {
  id: number;
  username: string;
}

interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface Course {
  id: number;
  name: string;
  prereqs: {
    courseId: number;
    courseName: string;
  }[];
}

interface CourseTerm {
  id: number;
  courses: Course[];
  term: number;
}

interface Registration {
  id: number;
  studentId: number;
  courseTermId: number;
  coursesEnrolled: Course[];
  status: string;
}

interface LoginResponse {
  student: Student;
  token: string;
}

interface CurrentTermResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface CoursesResponse {
  courses: Course[];
}

interface RegistrationsResponse {
  registrations: Registration[];
}