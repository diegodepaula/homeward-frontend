import {useAuth} from "../../../../hooks/useAuth.ts";
import {CourseRegistration} from "../../../../services/CourseRegistration.ts";
import {toast} from "react-toastify";
import {FormEvent, useCallback, useState} from "react";
import './styles.css'
import {hasPrereqsCourse} from "../../../../helpers/hasPrereqsCourse.ts";
import useSWRImmutable from "swr/immutable";
import useSWR, {mutate} from "swr";


export const RegisterAction = ({course}: {
  course: Course,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {fetcher, student} = useAuth()
  const {data: currentTermData} = useSWRImmutable<CurrentTermResponse>('current_term', fetcher);
  const {
    data: registrationData,
  } = useSWR<RegistrationsResponse>(student && `/students/${student.id}/registrations`, fetcher);

  const handleCourseRegistration = useCallback(async (courseId: number, courseName: string) => {
    if (student && registrationData) {
      setIsLoading(true)
      try {
        const response = await CourseRegistration.register(student?.id, registrationData?.registrations[0]?.id, courseId)
        if (response.status === 200) {
          toast(`Successfully registered in ${courseName} course for ${currentTermData?.name}`, {
            type: 'success'
          })
          mutate(`/students/${student.id}/registrations`, {
            ...registrationData,
            registrations: [{
              ...registrationData.registrations[0],
              coursesEnrolled: [...registrationData.registrations[0].coursesEnrolled, {id: courseId}]
            }],
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        toast(`Something went wrong while registering ${courseName}.`, {type: 'error'})
      } finally {
        setIsLoading(false)
      }
    } else toast('Failed to get student or registration info.', {type: 'warning'})
  }, [registrationData, student])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCourseRegistration(course.id, course.name)
  }

  if (!hasPrereqsCourse(registrationData, course))
    return <span>Prerequisites Incomplete!</span>


  return <>
    {
      registrationData?.registrations[0]?.coursesEnrolled.find(({id}) => id === course.id) ?
        <span>Registered!</span> :
        <form action="#" onSubmit={handleSubmit}>
          <button type={"submit"} disabled={isLoading}>
            Register
          </button>
        </form>
    }
  </>;
}