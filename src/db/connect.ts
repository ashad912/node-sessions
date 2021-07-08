export const connectDB = (connectFactory: Function) => {
    return connectFactory({
        port: 6379,
        host: 'localhost'
    })
}