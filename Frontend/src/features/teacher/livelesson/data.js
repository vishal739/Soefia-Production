export function getGroupData() {
    const groupsData = {
        "Group 1": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        },
        "Group 2": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        },
        "Group 3": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        },
        "Group 4": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        },
        "Group 5": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        },
        "Group 6": {
            students: [
                { studentId: "Student 1", progressData: { Academic: 70, Social: 65 }, sentimentData: { Positive: 60, Negative: 40 } },
                { studentId: "Student 2", progressData: { Academic: 80, Social: 75 }, sentimentData: { Positive: 70, Negative: 30 } },
                { studentId: "Student 3", progressData: { Academic: 65, Social: 60 }, sentimentData: { Positive: 55, Negative: 45 } },
                { studentId: "Student 4", progressData: { Academic: 90, Social: 85 }, sentimentData: { Positive: 80, Negative: 20 } },
            ]
        }
    };

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

