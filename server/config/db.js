const mongoose = require("mongoose");
const uri = "mongodb+srv://iec2020085:Isha@2142@cluster0.8by7d1h.mongodb.net/test?retryWrites=true&w=majority"
try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
