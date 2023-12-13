export async function getUser() {
    var logged = localStorage.getItem('loggedin')
    return {
        loggedIn: logged,
        uid: 'xycvvvgd'
    }
}

export async function getUserDetails() {

    return {
        id: 'xycvvvgd',
        first_name: 'John',
        last_name: 'Doe',
        phone: '+357 99191234',
        email: 'johndoe@xyz.com',
        seller: false
    }
}