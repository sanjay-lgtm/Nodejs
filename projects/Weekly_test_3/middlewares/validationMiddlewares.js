//NAME VALIDATION
export const validateName = (req, res, next) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and last name are required!' })
    }

    const isFirstNameCapitalized = firstName[0] === firstName[0].toUpperCase();
    const isLastNameCapitalized = lastName[0] === lastName[0].toUpperCase();

    if (!isFirstNameCapitalized || !isLastNameCapitalized) {
        return res.status(400).json({ message: 'First name and last name must start with a capital letter' })
    }
    next()
}

//PASSWORD VALIDATION
export const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required!' });

    }

    const passwordCriteria = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordCriteria.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters long, contain one special character, one uppercase letter, and one numeric character'
        })
    }
    next();
}

//VALIDATE EMAIL
export const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email address is required!' })
    }

    const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailCriteria.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' })
    }
    next();
}

//VALIDATE PHONE NUMBER
export const validatePhoneNumber = (req, res, next) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required!' })
    }
    if (phoneNumber.lenght < 10) {
        return res.status(400).json({ message: 'Phone number must be 10 digits long!' })
    }
    next();
}