export function updateSurveyContent(json, newContent, indexToUpdate) {
    return {
        id : json.id,
        title : json.title,
        description : json.description,
        type : json.type,
        reliability:json.reliability, 
        backColor:json.backColor,
        startDate:json.startDate,
        endDate: json.endDate,
        enable: json.enable,
        font:json.font,
        fontSize:json.fontSize, 
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