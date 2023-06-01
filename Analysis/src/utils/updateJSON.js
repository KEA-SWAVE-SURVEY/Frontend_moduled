export function updateSurveyContent(json, newContent, indexToUpdate) {
    return {
        id : json.id,
        title : json.title,
        description : json.description,
        type : json.type,
        design : json.design,
        questionRequest : [
            ...json.questionRequest.slice(0, indexToUpdate),
            newContent,
            ...json.questionRequest.slice(indexToUpdate + 1)
        ]
    };
};

export function updateAnswerContent(json, newContent, indexToUpdate) {
    return {
        id: json.id,
        title: json.title,
        type: json.type,
        description: json.description,
        responseId : json.responseId,
        questionResponse : [
            ...json.questionResponse.slice(0, indexToUpdate),
            newContent,
            ...json.questionResponse.slice(indexToUpdate + 1)
        ]
    };
};