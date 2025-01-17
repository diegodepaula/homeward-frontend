import {hasPrereqsCourse} from '../hasPrereqsCourse';
import type {Course, RegistrationsResponse} from '../../types.ts';

describe('hasPrereqsCourse', () => {
  it('returns false if registrationData is undefined', () => {
    const result = hasPrereqsCourse(undefined, {} as unknown as Course);
    expect(result).toBe(false);
  });

  it('returns true if all prerequisites are met', () => {
    const registrationData: RegistrationsResponse = {
      registrations: [
        {
          id: 1,
          studentId: 1,
          courseTermId: 1,
          coursesEnrolled: [{id: 1, name: 'Course 1', prereqs: []}, {id: 2, name: 'Course 2', prereqs: []}],
          status: 'active'
        }
      ]
    };
    const course: Course = {
      id: 3,
      name: 'Course 3',
      prereqs: [{courseId: 1, courseName: 'Course 1'}, {courseId: 2, courseName: 'Course 2'}]
    };
    const result = hasPrereqsCourse(registrationData, course);
    expect(result).toBe(true);
  });

  it('returns false if not all prerequisites are met', () => {
    const registrationData: RegistrationsResponse = {
      registrations: [
        {
          id: 1,
          studentId: 1,
          courseTermId: 1,
          coursesEnrolled: [{id: 1, name: 'Course 1', prereqs: []}],
          status: 'active'
        }
      ]
    };
    const course: Course = {
      id: 3,
      name: 'Course 3',
      prereqs: [{courseId: 1, courseName: 'Course 1'}, {courseId: 2, courseName: 'Course 2'}]
    };
    const result = hasPrereqsCourse(registrationData, course);
    expect(result).toBe(false);
  });

  it('returns false if there are no courses enrolled', () => {
    const registrationData: RegistrationsResponse = {
      registrations: [
        {
          id: 1,
          studentId: 1,
          courseTermId: 1,
          coursesEnrolled: [],
          status: 'active'
        }
      ]
    };
    const course: Course = {
      id: 3,
      name: 'Course 3',
      prereqs: [{courseId: 1, courseName: 'Course 1'}]
    };
    const result = hasPrereqsCourse(registrationData, course);
    expect(result).toBe(false);
  });

  it('returns true if there are no prerequisites', () => {
    const registrationData: RegistrationsResponse = {
      registrations: [
        {
          id: 1,
          studentId: 1,
          courseTermId: 1,
          coursesEnrolled: [{id: 1, name: 'Course 1', prereqs: []}],
          status: 'active'
        }
      ]
    };
    const course: Course = {
      id: 3,
      name: 'Course 3',
      prereqs: []
    };
    const result = hasPrereqsCourse(registrationData, course);
    expect(result).toBe(true);
  });
});