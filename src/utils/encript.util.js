import bcrypt from 'bcrypt';


export const encriptPassword = (password) => {
return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const comparePassword = (user, pass) => {
    return bcrypt.compareSync(pass, user.password)
}


