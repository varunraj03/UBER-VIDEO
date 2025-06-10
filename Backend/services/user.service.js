const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname = '', email, password }) => {
    // Validate only required fields
    if (!firstname || !email || !password) {
        throw new Error('All required fields (firstname, email, password) must be provided');
    }

    // Create the user object
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname  // This will be empty string if not provided
        },
        email,
        password
    });

    console.log({ fullname: { firstname, lastname }, email, password });

    return user;
};