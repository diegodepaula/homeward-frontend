import api from "./api.ts";
import {AxiosResponse} from "axios";

export class CourseRegistration {
  static register(studentId: number, registrationId: number, courseId: number): Promise<AxiosResponse<RegistrationsResponse>> {
    return api.post(`/students/${studentId}/registrations/${registrationId}/courses`, {
      courseId
    })
  }
}