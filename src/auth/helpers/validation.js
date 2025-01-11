export const validation = (value, regex) => {   

    if(!regex.test(value.trim())){
        return false
    }

    return true;

}