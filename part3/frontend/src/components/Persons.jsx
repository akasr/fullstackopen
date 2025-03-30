const Person = ({personsToShow, deletePerson}) => (
  <div>
    {
      personsToShow.map(({name, number, id}) =>
        <div key={id}>
          <p>{name} {number}</p>
          <button onClick={() => deletePerson(id)}>delete</button>
        </div>
      )
    }
  </div>
)

export default Person;