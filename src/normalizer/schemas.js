import { normalize, denormalize, schema } from 'normalizr'

/**
 *
 */
const usersSchema = new schema.Object(
	'users',
	{},
	{ idAttribute: 'userId' }
)

/**
 *
 */
const imageSchema = new schema.Entity(
	'images',
	{},
	{
		idAttribute: (value) => {
			try { return value.url.split('?')[0] }
			catch (err) { return value }
		},
	}
)

/**
 *
 */
const postSchema = new schema.Entity(
	'posts',
	{},
	{ idAttribute: 'postId' }
)

/**
 *
 */
const chatSchema = new schema.Entity(
	'chats',
	{},
	{
		idAttribute: 'chatId'
	}
)

/**
 *
 */
const commentsSchema = new schema.Entity(
	'comments',
	{},
	{
		idAttribute: 'commentId',
	}
)

/**
 *
 */
const albumSchema = new schema.Entity(
	'albums',
	{},
	{
		idAttribute: 'albumId',
	}
)

/**
 *
 */
const messageSchema = new schema.Entity(
	'messages',
	{},
	{
		idAttribute: 'messageId'
	}
)

commentsSchema.define({
	commentedBy: usersSchema,
	textTaggedUsers: [{
		user: usersSchema,
	}],
})

albumSchema.define({
	art: imageSchema,
	ownedBy: usersSchema,
	posts: {
		items: [postSchema],
	},
})

messageSchema.define({
	textTaggedUsers: [{
		user: usersSchema,
	}],
	author: usersSchema,
})

chatSchema.define({
	users: {
		items: [usersSchema],
	},
	messages: {
		items: [messageSchema],
	},
})

postSchema.define({
	image: imageSchema,
	album: albumSchema,
	postedBy: usersSchema,
	textTaggedUsers: [{
		user: usersSchema,
	}],
	comments: {
		items: [commentsSchema],
	},
})

usersSchema.define({
	photo: imageSchema,
	stories: {
		items: [postSchema],
	},
})


/**
 *
 */
export function normalizePostsGet(payload) {
	return normalize(payload, [postSchema])
}

export function denormalizePostsGet(payload, entities) {
	return denormalize(payload, [postSchema], entities)
}

export function normalizePostGet(payload) {
	return normalize(payload, postSchema)
}

export function denormalizePostGet(payload, entities) {
	return denormalize(payload, postSchema, entities)
}

/**
 *
 */
export function normalizeCommentsGet(payload) {
	return normalize(payload, [commentsSchema])
}

export function denormalizeCommentsGet(payload, entities) {
	return denormalize(payload, [commentsSchema], entities)
}

export function normalizeCommentGet(payload) {
	return normalize(payload, commentsSchema)
}

export function denormalizeCommentGet(payload, entities) {
	return denormalize(payload, commentsSchema, entities)
}

/**
 *
 */
export function normalizeUsersGet(payload) {
	return normalize(payload, [usersSchema])
}

export function denormalizeUsersGet(payload, entities) {
	return denormalize(payload, [usersSchema], entities)
}

export function normalizeUserGet(payload) {
	return normalize(payload, usersSchema)
}

export function denormalizeUserGet(payload, entities) {
	return denormalize(payload, usersSchema, entities)
}

/**
 *
 */
export function normalizeAlbumsGet(payload) {
	return normalize(payload, [albumSchema])
}

export function denormalizeAlbumsGet(payload, entities) {
	return denormalize(payload, [albumSchema], entities)
}

export function normalizeAlbumGet(payload) {
	return normalize(payload, albumSchema)
}

export function denormalizeAlbumGet(payload, entities) {
	return denormalize(payload, albumSchema, entities)
}

/**
 *
 */
export function normalizeChatsGet(payload) {
	return normalize(payload, [chatSchema])
}

export function denormalizeChatsGet(payload, entities) {
	return denormalize(payload, [chatSchema], entities)
}

export function normalizeChatGet(payload) {
	return normalize(payload, chatSchema)
}

export function denormalizeChatGet(payload, entities) {
	return denormalize(payload, chatSchema, entities)
}

