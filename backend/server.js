const express = require("express");
const app = express();
const PORT = 5500;
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));


app.use(cors());
app.use(express.json());

function calculateLetterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 85) return "A-";
    if (score >= 80) return "B+";
    if (score >= 75) return "B";
    if (score >= 70) return "B-";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 55) return "C-";
    if (score >= 50) return "D+";
    if (score >= 45) return "D";
    if (score >= 40) return "D-";
    return "F";
}


app.post("/calculate", (req, res) => {
    const grades = req.body;
    let totalWeight = 0;
    let weightedSum = 0;
    
    if (!Array.isArray(grades) || grades.length === 0) {
        return res.status(400).json({ error: "Invalid input data." });
    }



    grades.forEach(({ score, percentage }) => {
        weightedSum += (score * percentage) / 100;
        totalWeight += percentage;
    });

    if (totalWeight > 120) {
        return res.status(400).json({ error: "Total weight can not be higher than 120%." });
    }

    const finalGrade = parseFloat(weightedSum.toFixed(2));
    const letterGrade = calculateLetterGrade(finalGrade);

    res.json({ finalGrade, letterGrade });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});
