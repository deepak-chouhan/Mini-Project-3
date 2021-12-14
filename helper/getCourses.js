const courses = require("../data/course_data.json")
const getCourses = () => {
    let random_course = []
    let total = 20;
    let total_courses = 900;
    for (let i = 0; i < total; i++) {
        let randNum = Math.floor(Math.random() * total_courses)
        random_course.push(courses[randNum]);

    }

    return random_course

}

module.exports = getCourses