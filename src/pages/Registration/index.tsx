import {Navbar} from "../../components/Navbar";
import useSWR from "swr";

import {useAuth} from "../../hooks/useAuth.ts";
import React, {useMemo} from "react";
import './styles.css'
import {RegisterAction} from "./components/RegisterAction";
import {hasPrereqsCourse} from "../../helpers/hasPrereqsCourse.ts";
import useSWRImmutable from "swr/immutable";
import {CoursesResponse, CurrentTermResponse, RegistrationsResponse} from "../../types.ts";


export const Registration = React.memo(() => {
  const {fetcher, student} = useAuth()
  const {data: currentTermData} = useSWRImmutable<CurrentTermResponse>('current_term', fetcher);
  const {data: coursesData} = useSWRImmutable<CoursesResponse>(currentTermData && `/terms/${currentTermData.id}/courses`, fetcher);
  const {
    data: registrationData
  } = useSWR<RegistrationsResponse>(student && `/students/${student.id}/registrations`, fetcher);

  const memoizedCourses = useMemo(() => coursesData?.courses, [coursesData?.courses])

  return (<>
    <Navbar/>
    <section id="registration">
      {memoizedCourses?.map(course => <div key={course.name} className="course">
        <div>
          <div className={'course-name'}>{course.name}</div>
          <div
            className={'prereq'}>Prerequisites: {course.prereqs.length ? course.prereqs.map(({
                                                                                               courseName
                                                                                             }, index) => (
              <span key={courseName} className={hasPrereqsCourse(registrationData, course) ? 'available' : 'unavailable'}>
                {courseName}{index < course.prereqs.length - 1 && ', '}
              </span>
            )
          ) : 'None'}
          </div>
        </div>
        <RegisterAction course={course}/>
      </div>)}
    </section>
  </>);
});
