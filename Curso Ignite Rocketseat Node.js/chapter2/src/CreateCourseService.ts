//nome - string
//duration - number
//instructor - string

interface Course {
    name: string,
    duration: number,
    educator: string
}


class CreateCourseService {
    execute({ name, duration, educator }: Course) {
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService;
