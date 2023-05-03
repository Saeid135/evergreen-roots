import mongoose from 'mongoose'

let models = {}


main()
async function main() {
    await mongoose.connect('mongodb+srv://saeid135:KPS08RRVQ4BYz7n6@cluster0.cqarkqf.mongodb.net/?retryWrites=true&w=majority')
    console.log("successfully connected to mongodb!")
    const registerSchema = new mongoose.Schema({
        type: String,
        name: String,
        address: String,
        number: Number,
        email: String,
        about: String
    })

    models.Register = mongoose.model("Register", registerSchema)

    console.log("successfully created database model")
}

export default models;