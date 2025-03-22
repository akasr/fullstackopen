const Header = ({name}) => <h2>{name}</h2>

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(({id, name, exercises}) => {
        return <Part key={id} name={name} exercises={exercises} />
      })}
    </div>
  )
}


const Total = ({total}) => <b>total of {total} exercises</b>

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
    </div>
  )
}

export default Course;