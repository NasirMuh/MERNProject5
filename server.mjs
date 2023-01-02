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

// post request using api
app.post("/workpage", (req, res) => {
    const body = req.body;
    if (!body.Name) {
        res.status(400).send("required missing")
        return;
    }
    else {
        Work.create({ Name: body.Name },
            (err, data) => {
                if (!err) {
                    res.send({ message: "Data is safed Successfully", data })
                }
                else {
                    return res.status(500).send({ message: "Server Error" });
                }
            });
    }
});

// get request for all workpages using api
app.get('/workspage', (req, res) => {

    // this DATA will be return in array
    Work.find({}, (err, data) => {
        if (err) {
            res.status(500).send({ message: "server error", })
        }
        else {
            res.send({
                message: "All Work list here:",
                data: data
            })
        }
    });
    // response //res back to server OR this message only see in server OR
    // this is for server side message

})

// get request only one workpage using api
app.get('/workspage/:id', (req, res) => {
    const id = req.params.id;
    // this DATA will be return in object cos we are using findOne
    Work.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: "All Work list here:",
                    data: data
                })
            }
            else {
                res.status(404).send({ message: "Data not found", })
            }
        }
        else {
            res.status(500).send({ message: "server error", })
        }
    });
    // response back to server OR this message only see in server OR
    // this is for server side message

})


// update request only one workpage using api
app.put('/workpage/:id', async (req, res) => {

    const id = req.params.id;
    const body = req.body;
    // this DATA will be return in object cos we are using findOne
    try {
        let updatedData = await Work.findByIdAndUpdate({ _id: id }, {
            Name: body.Name
        }, { new: true }
        ).exec();
        res.send({
            message: "data is update",
            data: updatedData
        })
    } catch (error) {
        res.status(500).send({
            message: "server error",
        })
    }
});



// delete request only one workpage using api
app.delete('/workpage/:id', (req, res) => {

    const id = req.params.id;
    // this DATA will be return in object cos we are using findOne
    Work.deleteOne({ _id: id }, (err, deleteddata) => {
        if (!err) {
            if (deleteddata.deletedCount !== 0) {
                res.send({
                    message: "data is deleted",
                })
            }
            else {
                res.status(404).send({
                    message: "Data not found",
                })
            }
        }
        else {
            res.status(500).send({
                message: "server error",
            })
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