

export const isDarkTheme = () => {
    const objString = localStorage.getItem('darkTheme');

    if(objString && objString === "true"){
        return true;
    }

    return false;
}

export const switchTheme = () => {
    const objString = localStorage.getItem('darkTheme');

    if(objString && objString === "true"){
        localStorage.setItem('darkTheme', "false");
    }else{
        localStorage.setItem('darkTheme', "true");
    }
}