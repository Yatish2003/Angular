const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dataPath = path.join(__dirname, '../user.json');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());




function readData() {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        return { users: [] };  
    }
}

app.get('/api/users', (req, res) => {
    try {
        const data = readData();  
        res.json(data.users);
        
    } catch (error) {
        console.log(error);
        
    }
    
});
app.get('/api/users/:id', (req, res) => {
    let userID=req.params.id;
    const usersData=readData();
    let userByID=usersData.users.filter(users =>users.id == userID);
    return res.status(200).send(userByID[0]);
});

app.post('/api/users', (req, res) => {
    const User = req.body;
    if (!User.userName || !User.lastName || !User.email || !User.pass) {
        return res.status(400).json({ "mess": "All fields are required" });
    }

    const data = readData(); 
    let userWithId = { ...User, id: data.users.length + 1 };
    
    data.users.push(userWithId);
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).json({ "mess": err });
        }
        res.status(200).json({ "user": userWithId });
    });
});



app.put('/api/users/:id', (req, res) => {
    const updID = req.params.id;
    let data = readData();  

    console.log(updID);
    const updUser = req.body;
    
    if (!updUser.userName || !updUser.lastName || !updUser.email || !updUser.pass) {
        return res.status(400).json({ "mess": "All fields are required" });
    }

  
    const userIndex = data.users.findIndex(user => user.id == updID);
    console.log(userIndex);
    if (userIndex === -1) {
        return res.status(404).json({ "mess": "User not found" });
    }

  
    const updatedUser = {
        ...data.users[userIndex],  
        ...updUser,  
    };
    data.users[userIndex] = updatedUser;

   
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ "err": "Failed to update data" });
        }
        res.status(200).json({ "mess": "Data successfully updated" });
    });
});


app.delete('/api/users/:id', (req, res) => {
    const deleteId = parseInt(req.params.id, 10);
    const data = readData();  

    const updatedUsers = data.users.filter(user => user.id !== deleteId);
    const newData = { "users": updatedUsers };
    
    fs.writeFile(dataPath, JSON.stringify(newData), (err) => {
        if (err) {
            return res.status(500).json({ "mess": err });
        }
        res.status(200).json({ "delete": `User ${deleteId} deleted` });
    });
});


app.listen(5000, () => {
    console.log(`App is listening on port http://localhost:5000/api/users`);
});
