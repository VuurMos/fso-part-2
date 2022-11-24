const Header = ({ course }) => {
    return (
        <div>
        <h1>{course}</h1>
        </div>
    )
}
  
const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => {
        return acc + part.exercises
    }, 0)

    return (
        <div>
        <h3>Number of exercises {total}</h3>
        </div>
    )
}
  
const Part = ({ part }) => {
    return (
        <div>
        <p>
            {part.name} {part.exercises}
        </p>
        </div>
    )
}
  
const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}
  
const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course

