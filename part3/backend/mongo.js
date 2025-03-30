const mongoose = require('mongoose')

const argCount = process.argv.length - 2
if(argCount === 0){
  console.log('Give password as third argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://akasr:${password}@cluster0.umy794t.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if(argCount === 3){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
if(argCount === 1){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}