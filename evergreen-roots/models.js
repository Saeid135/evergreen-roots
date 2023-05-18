import mongoose from 'mongoose'

let models = {}


main()
async function main() {
    await mongoose.connect('mongodb+srv://saeid135:KPS08RRVQ4BYz7n6@cluster0.cqarkqf.mongodb.net/?retryWrites=true&w=majority')
    console.log("successfully connected to mongodb!")
    const companySchema = new mongoose.Schema({
        type: String,
        name: String,
        address: String,
        number: Number,
        email: String,
        about: String
    })

    models.Company = mongoose.model("Company", companySchema)

    const employeeSchema = new mongoose.Schema({
        type: String,
        group: String,
        position: String,
        name: String,
        email: String
    })

    models.Employee = mongoose.model("Employee", employeeSchema)

    console.log("successfully created database model")
}

export default models;