//수정 업데이트 json수정필요
export function updateSurveyContent(json, newContent, indexToUpdate) {
    return {
        id : json.id,
        title : json.title,
        description : json.description,
        type : json.type,
        reliability:json.reliability,
        startDate:json.startDate,
        endDate: json.endDate,
        enable: json.enable,
        design:{
            font:json.design.font,
            fontSize:json.design.fontSize,
            backColor:json.design.backColor,
        },
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