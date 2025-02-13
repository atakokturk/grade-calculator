document.addEventListener("DOMContentLoaded", () => {
    const gradeFields = document.getElementById("grade-fields");
    const addFieldBtn = document.getElementById("add-field");
    const calculateGradeBtn = document.getElementById("calculate-grade");
    const currentGradeSpan = document.getElementById("current-grade");
    const letterGradeSpan = document.getElementById("letter-grade");

    addFieldBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="assignment" placeholder="Assignment/Exam"></td>
            <td><input type="number" class="grade" placeholder="Grade" min="0" ></td>
            <td><input type="number" class="outOf" placeholder="Out Of" min="1" ></td>
            <td><input type="number" class="weight" placeholder="Weight" min="0" max="100"></td>
            <td><button class="remove-btn">Remove</button></td>
        `;
        gradeFields.appendChild(row);

        row.querySelector(".remove-btn").addEventListener("click", () => {
            row.remove();
        });
    });

    calculateGradeBtn.addEventListener("click", () => {
        let totalWeight = 0;
        let weightedSum = 0;

        document.querySelectorAll("#grade-fields tr").forEach(row => {
            const gradeInput = row.querySelector(".grade");
            const outOfInput = row.querySelector(".outOf");
            const weightInput = row.querySelector(".weight");
            
            const grade = parseFloat(gradeInput.value);
            const outOf = parseFloat(outOfInput.value);
            const weight = parseFloat(weightInput.value);
            if (isNaN(grade) || isNaN(weight)  || isNaN(outOf) || weight <= 0) {
                return;
            }
            weightedSum += (grade * 100 / outOf) * weight / 100;
            totalWeight += weight;
      
        if (outOf > 100){
            alert("Assignment/Exam can be out of 100 at most.")
            return;
        }
        if (totalWeight === 0 || totalWeight > 120) {
            alert("The weight of the course average can be maximum 120");
            return;
        } 
    });

        const finalGrade = weightedSum.toFixed(2);
        currentGradeSpan.textContent = finalGrade;
        letterGradeSpan.textContent = calculateLetterGrade(finalGrade);

        
    });
});

function calculateLetterGrade(score) {
    score = parseFloat(score);
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