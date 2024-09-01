function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData() {
    const groupsData = {};

    const numberOfGroups = 6; 
    const numberOfStudents = 4; 

    for (let i = 1; i <= numberOfGroups; i++) {
        const groupName = `Group ${i}`;
        groupsData[groupName] = {
            students: []
        };

        for (let j = 1; j <= numberOfStudents; j++) {
            const studentId = `Student ${j}`;
            
            const academicScore = getRandomInt(50, 100);
            const socialScore = 100 - academicScore;

            const progressData = {
                Academic: academicScore,
                Social: socialScore
            };
            
            // Generate Positive and Negative sentiment data that sum to 100
            const positiveSentiment = getRandomInt(50, 100);
            const negativeSentiment = 100 - positiveSentiment;

            const sentimentData = {
                Positive: positiveSentiment,
                Negative: negativeSentiment
            };

            groupsData[groupName].students.push({
                studentId,
                progressData,
                sentimentData
            });
        }
    }

    return groupsData;
}

export function getGroupData() {
    const groupsData = generateRandomData()

    // Calculating averages
    return Object.entries(groupsData).map(([groupName, groupInfo]) => {
        let academicTotal = 0, socialTotal = 0, positiveTotal = 0, negativeTotal = 0;

        groupInfo.students.forEach(student => {
            academicTotal += student.progressData.Academic;
            socialTotal += student.progressData.Social;
            positiveTotal += student.sentimentData.Positive;
            negativeTotal += student.sentimentData.Negative;
        });

        const numStudents = groupInfo.students.length;
        return {
            groupName,
            students: groupInfo.students,
            averages: {
                Academic: academicTotal / numStudents,
                Social: socialTotal / numStudents,
                Positive: positiveTotal / numStudents,
                Negative: negativeTotal / numStudents
            },
            progressData : [
                { category: 'Academic', percentage: academicTotal / numStudents },
                { category: 'Social', percentage: socialTotal / numStudents }
            ],
            sentimentData : [
                { category: 'Positive', percentage: positiveTotal / numStudents },
                { category: 'Negative', percentage: negativeTotal / numStudents }
            ]
        };
    });
}

