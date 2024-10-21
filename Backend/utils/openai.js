const OpenAI = require("openai");
const axios = require("axios")

/**
 * Fetches a structured lesson plan response from the OpenAI GPT-4 model based on the provided resource data.
 *
 * @param {Object} deitaObject - The data object containing the lesson plan resource and desired sections.
 * @param {Object} deitaObject.resource - The lesson plan resource details.
 * @param {string} deitaObject.resource.title - The title of the lesson plan.
 * @param {string} deitaObject.resource.lessonMaterials - The materials required for the lesson.
 * @param {string} deitaObject.resource.lessonExercise - The exercise included in the lesson.
 * @param {string} deitaObject.resource.learningGoals - The learning goals of the lesson.
 * @param {string} deitaObject.resource.lessonStructureOverview - An overview of the lesson structure.
 * @param {string} deitaObject.resource.socialCollaborationGoal - The social collaboration goal of the lesson.
 * @param {Array<string>} deitaObject.WhatIwant - The sections to be generated in the response.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the structured lesson plan.
 * @throws {Error} - Throws an error if the API call fails.
 */

async function getLessonSummaryGPT(deitaObject) {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    try {
        const response = await axios.post(
            apiUrl,
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an assistant that helps generate structured lesson plans based on resource data."
                    },
                    {
                        role: "user",
                        content: `Generate the following sections based on the provided lesson plan resource: 
                                  - ${deitaObject.WhatIwant[0]}
                                  - ${deitaObject.WhatIwant[1]}
                                  - ${deitaObject.WhatIwant[2]}
                                  - ${deitaObject.WhatIwant[3]}

                                    Return the response in an object with the keys:
                                  "My Introduction and Reference Framework", 
                                  "Proposed Progress: Academic Learning", 
                                  "Proposed Progress: Social Learning", 
                                  "Key Concepts to Teach".

                                  Lesson Plan Resource: 
                                  Title: ${deitaObject.resource.title}
                                  Lesson Materials: ${deitaObject.resource.lessonMaterials}
                                  Lesson Exercise: ${deitaObject.resource.lessonExercise}
                                  Learning Goals: ${deitaObject.resource.learningGoals}
                                  Lesson Structure Overview: ${deitaObject.resource.lessonStructureOverview}
                                  Social Collaboration Goal: ${deitaObject.resource.socialCollaborationGoal}`
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        // console.log(response)
        const parsedObject = JSON.parse(response.data.choices[0].message.content);
        return parsedObject;
    } catch (error) {
        console.error('Error making API call:', error);
    }
}

async function generateLessonGPT(deitaObject) {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    try {
        const response = await axios.post(
            apiUrl,
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an assistant that helps generate structured lesson plans based on resource data."
                    },
                    {
                        role: "user",
                        content: `Generate the following sections based on the provided lesson plan resource: 
                                  - ${deitaObject.WhatIwant[0]}
                                  - ${deitaObject.WhatIwant[1]}
                                  - ${deitaObject.WhatIwant[2]}
                                  - ${deitaObject.WhatIwant[3]}
                                  - ${deitaObject.WhatIwant[4]}
                                  - ${deitaObject.WhatIwant[5]}
                                  - ${deitaObject.WhatIwant[6]}

                                    Generate a lesson plan based on the provided resource. Return the response in strict JSON format with the following keys: 
                                        - "title, type: string",
                                        - "lessonMaterials, type: string",
                                        - "lessonExercise, type: string",
                                        - "learningGoals, type: string",
                                        - "lessonStructureOverview, type: string",
                                        - "socialCollaborationGoal, type: string",
                                        - "lessonSummary, type: string".
                                        Do not include any explanations or additional commentary.
                                  Lesson Plan Resource: ${deitaObject.resource}`
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("response of ChatGPT: ", response.data.choices[0].message.content);
        const parsedObject = JSON.parse(response.data.choices[0].message.content);
        // console.log("parsedObject: ",parsedObject);
        return parsedObject;
    } catch (error) {
        console.error('Error making API call:', error);
    }
}

const fetchPreviewLesson = async (data) => {
    const result = await getLessonSummaryGPT(data);
    return result;
};
const fetchNewLesson = async (data) => {
    const result = await generateLessonGPT(data);
    // console.log("result: ",result);
    return result;
};

module.exports = { fetchPreviewLesson, fetchNewLesson };