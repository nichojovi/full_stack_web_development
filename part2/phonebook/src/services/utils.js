const findNameById = (id, persons) => ( persons.find((person) => id === person.id).name )

const findNameByNumber = (number, persons) => ( persons.find((person) => number === person.number).name )

const findIdByName = (name, persons) => ( persons.find((person) => name.toLowerCase() === person.name.toLowerCase()).id )

const compareName = (persons, name) => ( persons.find((person) => name.toLowerCase() === person.name.toLowerCase()) )

const compareNumber = (persons, number) => ( persons.find((person) => number === person.number) )

const utilService = {
    findNameById,
    findNameByNumber,
    findIdByName,
    compareNumber,
    compareName
}

export default utilService