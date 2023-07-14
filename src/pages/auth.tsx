export type User = {
    username: string,
    email: string,
}

type Credential = User & {
    password: string
}


/**
 * Authenticates the user
 * @returns whether the user is authenticated or not
 */
export function logIn(email: string, password: string, setUser: (user: User) => void) {
    const credentialsInJSON = localStorage.getItem('credentials')

    if (credentialsInJSON == null)
        return false

    const credentials: Credential[] = JSON.parse(credentialsInJSON)

    for (let i = 0; i < credentials.length; i++)
        if (credentials[i].email === email && credentials[i].password === password) {
            const user: User = {
                username: credentials[i].username,
                email: email,
            }
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
            return true
        }

    return false
}

export function signOut() {
    localStorage.removeItem('user')
}

export function signUp(username: string, email: string, password: string, setUser: (user: User) => void) {
    const credentialsInJSON = localStorage.getItem('credentials')
    const credentials: Credential[] = credentialsInJSON == null ? [] : JSON.parse(credentialsInJSON)
    const newCredential: Credential = {
        username: username,
        email: email,
        password: password
    }
    credentials.push(newCredential)
    localStorage.setItem('credentials', JSON.stringify(credentials))

    const user: User = {
        username: username,
        email: email
    }
    localStorage.setItem('user', JSON.stringify(user))

}
