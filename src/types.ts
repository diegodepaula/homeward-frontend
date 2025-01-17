export interface Student {
  id: number;
  username: string;
}

export interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Course {
  id: number;
  name: string;
  prereqs: {
    courseId: number;
    courseName: string;
  }[];
}

export interface CourseTerm {
  id: number;
  courses: Course[];
  term: number;
}

export interface Registration {
  id: number;
  studentId: number;
  courseTermId: number;
  coursesEnrolled: Course[];
  status: string;
}

export interface LoginResponse {
  student: Student;
  token: string;
}

export interface CurrentTermResponse {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CoursesResponse {
  courses: Course[];
}

export interface RegistrationsResponse {
  registrations: Registration[];
}