import { MailSlurp } from 'mailslurp-client'
const mailslurp = new MailSlurp({ apiKey: '4d066a5ab39edc3f5be220c0b211b29290468611b4af39baa4dd16a48110eddb' })

export const createInbox = async () => {
	const inbox = await mailslurp.createInbox()
	return inbox
}

export const getLatestEmail = async (inbox) => {
	const latestEmail = await mailslurp.waitForLatestEmail(inbox.id)
	return latestEmail
}

export const extractConfirmationCode = async (email) => {
	const body = email.body
	return body.split('confirmation code is ').pop().split('.')[0]
}