import {User} from "./pages/auth";

/**
 * Validate the email address
 * @param email
 * @param credentials
 * @returns error message if email is invalid, otherwise empty string
 */
export function validateEmail(email: string, credentials?: User[]) {
	if (email.length === 0) return 'Email address is required'
	// check if email is valid
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	if (!emailRegex.test(email)) return 'Invalid email address'
	// check if email is already taken
	if (credentials?.some(user => user.email === email)) return 'Email address is already taken'

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
 * @param username
 * @param credentials
 * @returns error message if username is invalid, otherwise empty string
 */
export function validateUsername(username: string, credentials?: User[]) {
	if (username.length === 0) return 'Username is required'
	if (username.length < 3) return 'Username must be at least 3 characters long'
	if (username.length > 20) return 'Username must be less than 20 characters long'
	// check if username contains only alphanumeric characters, hyphens, and underscores
	const usernameRegex = /^[a-zA-Z0-9_-]*$/
	if (!usernameRegex.test(username)) return 'Username can only contain alphanumeric characters, hyphens, and underscores'
	// check if username is already taken
	if (credentials?.some(user => user.username === username)) return 'Username is already taken'
	return ''
}