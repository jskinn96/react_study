//g 객체 value 값에 따라 type 확인
const typeTranslateObj = (data : any): {} => {

    Object.entries(data).forEach(([key, value]) => {
        
        const typeValue = typeof value;
        if (typeValue !== "object") data[key] = `${typeValue};`;
        else if (Array.isArray(value)) {

            data[key] = "[];";
            
        } else data[key] = typeTranslateObj(data[key]);
    });

    return data;
}

//g 변환된 객체값값을 콘솔로 찍어준다.
const typeTranslateObjConsole = (data : any): void => {

    const objTypeConsole = typeTranslateObj(data);
    console.log(objTypeConsole);
}

export default typeTranslateObjConsole;