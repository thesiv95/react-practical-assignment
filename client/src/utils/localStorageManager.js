export const write = (login) => {
    console.log('Saved login: ' + login)
    localStorage.setItem('app_login', login)
}

export const read = () => {
    const login = localStorage.getItem('app_login')
    console.log('Login from storage: ' + login)
    return login
}

export const clear = () => {
    console.log('Login removed from storage')
    localStorage.removeItem('app_login')
}
