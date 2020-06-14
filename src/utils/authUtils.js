export const isLogin = () => {
    return !!localStorage.getItem('tokens')
}