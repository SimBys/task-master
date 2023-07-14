/**
 * Validate the email address
 * @param email
 * @returns error message if email is invalid, otherwise empty string
 */
export function validateEmail(email: string) {
	if (email.length === 0) return 'Email address is required'

	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	if (!emailRegex.test(email)) return 'Invalid email address'

	return ''
}

/**
 * Validate the password
 * @param password
 * @returns error message if password is invalid, otherwise empty string
 */
export function validatePassword(password: string) {
	if (password.length === 0) return 'Password is required'
	if (password.length < 6) return 'Password must be at least 6 characters'
	return ''
}

/**
 * Validate the username
 * @param name
 * @returns error message if username is invalid, otherwise empty string
 */
export function validateUsername(name: string) {
	if (name.length === 0) return 'Username is required'
	if (name.length < 3) return 'Username must be at least 3 characters long'
	return ''
}