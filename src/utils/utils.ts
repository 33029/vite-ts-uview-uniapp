

export const toast = (context,message,type = 'success',param:object = {}) => {
    context.show({
        type,
        message,
        ...param
    })
}