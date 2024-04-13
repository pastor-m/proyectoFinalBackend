import bcrypt from "bcrypt"

//a) createhash: aplicar el hash al password
//b) isValidPassword: comparar el password proporcionado por la base de datos.

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//hashSync: toma el password que le pasamos y aplica el proceso de hasheo a partir de un salt.

//Un salt es un string random que hace que el proceso se realice de forma impredecible

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

//Compara los password, retorna true o false segun corresponda

export {createHash, isValidPassword}