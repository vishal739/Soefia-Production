const OpenAI = require("openai");

const axios = require("axios")
// const generateResponse = async (data) => {
//     const completion = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//             { role: "system", content: "You are a teaching assistant." },
//             {
//                 role: "user",
//                 content: data,
//             },
//         ],
//     });
//     return completion;
// };

async function getChatGPTResponse(deitaObject) {
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
        console.log(response)
        const parsedObject = JSON.parse(response.data.choices[0].message.content);
        return parsedObject;
    } catch (error) {
        console.error('Error making API call:', error);
    }
}

const fetchResponse = async (data) => {
    const result = await getChatGPTResponse(data);
    return result; 
};


module.exports = { fetchResponse };