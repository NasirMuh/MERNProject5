import express from 'express'
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const { Schema } = mongoose;
mongoose.connect('mongodb+srv://Xtalish:Oyextalish9@cluster0.fmz0rzv.mongodb.net/WorkDB?retryWrites=true&w=majority').then(() => console.log("connection succesfully running...."))
    .catch((err) => console.log("wrong connection" + err));;

const app = express()
const port = process.env.PORT || 2301

app.use(express.json())

const workSchema = new Schema({
    Name: String,
    CreateAt: { type: Date, default: Date.now },
});
const Work = mongoose.model('Works', workSchema);

// work api working for post
app.post("/workpage", async (req, res) => {
    const user = await Work.create({
        Name: req.body.Name,
    });

    return res.status(200).json(user);
});
app.get('/workspage', (req, res) => {
    Work.find((err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({
                message: "All Work list here:",
                data: data
            })
            console.log("First Data : ", data);
        }
    });
    // response back to server OR this message only see in server OR
    // this is for server side message

})

app.get('/', (req, res) => {
    res.send({ message: "default Page" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})