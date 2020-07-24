import { normalize, denormalize, schema } from 'normalizr'

/**
 *
 */
const userSchema = new schema.Entity(
	'users',
	{},
	{
		idAttribute: 'userId',
	}
)
const usersSchema = [usersSchema]

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
const postsSchema = [postSchema]

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
	commentedBy: userSchema,
	textTaggedUsers: [{
		user: userSchema,
	}],
})

albumSchema.define({
	art: imageSchema,
	ownedBy: userSchema,
	posts: {
		items: postsSchema,
	},
})

messageSchema.define({
	textTaggedUsers: [{
		user: userSchema,
	}],
	author: userSchema,
})

chatSchema.define({
	users: {
		items: usersSchema,
	},
	messages: {
		items: [messageSchema],
	},
})

postSchema.define({
	image: imageSchema,
	album: albumSchema,
	postedBy: userSchema,
	textTaggedUsers: [{
		user: userSchema,
	}],
	comments: {
		items: [commentsSchema],
	},
})

userSchema.define({
	photo: imageSchema,
	stories: {
		items: postsSchema,
	},
})


/**
 *
 */
export function normalizePostsGet(payload) {
	return normalize(payload, postsSchema)
}

export function denormalizePostsGet(payload, entities) {
	return denormalize(payload, postsSchema, entities)
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
	return normalize(payload, usersSchema)
}

export function denormalizeUsersGet(payload, entities) {
	return denormalize(payload, usersSchema, entities)
}

export function normalizeUserGet(payload) {
	return normalize(payload, userSchema)
}

export function denormalizeUserGet(payload, entities) {
	return denormalize(payload, userSchema, entities)
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

