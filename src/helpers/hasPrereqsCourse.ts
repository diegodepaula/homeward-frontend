import {Course, RegistrationsResponse} from "../types.ts";

export const hasPrereqsCourse = (registrationData: RegistrationsResponse | undefined, course: Course) => {
  if (!registrationData) return false;
  return course.prereqs.every(prereq =>
    registrationData.registrations[0]?.coursesEnrolled?.some(enrolled => enrolled.id === prereq.courseId)
  );
};