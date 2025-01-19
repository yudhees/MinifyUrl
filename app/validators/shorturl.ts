import vine from '@vinejs/vine'

export const createUrlValidator = vine.compile(
  vine.object({
    longUrl:vine.string(),
    customAlias:vine.string(),
    // title: vine.string().trim().minLength(6),
    // slug: vine.string().trim(),
    // description: vine.string().trim().escape()
  })
)
