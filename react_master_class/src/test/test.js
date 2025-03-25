//g 중복을 제거하고 오름차순으로 정렬된 배열을 반환하는 함수를 작성해보세요.
const a = [5, 3, 3, 7, 5, 1];

const func2 = (arr, idx) => {

    const prevI2 = idx-1;
    const now2   = arr[idx];
    const prev2  = arr[prevI2];

    if (now2 < prev2) {

        arr[idx]    = prev2;
        arr[prevI2]  = now2; 
    }
    
    if (prevI2 === 0) return arr;
    else func2(arr, idx-1);
}

const func = (arr) => {

    let newArr = [];
    let i = 0;
    arr.forEach(el => {

        if (!newArr.includes(el)) {

            newArr.push(el);

            if (i > 0) {
                
                const prevI = i-1;

                const now   = newArr[i];
                const prev  = newArr[prevI];

                if (now < prev) func2(newArr, i); 
            }

            i++;
        }
    });

    console.log(newArr);
}

func(a);