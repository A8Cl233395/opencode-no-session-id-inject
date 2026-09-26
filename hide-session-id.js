const SESSION_ID_LINE = /^\s*Current conversation session ID:.*$/

const scrub = (text) =>
  text
    .split("\n")
    .filter((line) => !SESSION_ID_LINE.test(line))
    .join("\n")

const hideSessionID = (event) => {
  for (let index = 0; index < event.system.length; index++) {
    const part = event.system[index]
    const text = scrub(part.text)
    if (text !== part.text) event.system[index] = { ...part, text }
  }
  for (const message of event.messages) {
    if (message.role !== "system") continue
    for (let index = 0; index < message.content.length; index++) {
      const part = message.content[index]
      if (part.type !== "text") continue
      const text = scrub(part.text)
      if (text !== part.text) message.content[index] = { ...part, text }
    }
  }
}

export default {
  id: "hide-session-id",
  setup: async (ctx) => {
    await ctx.session.hook("context", hideSessionID)
    await ctx.session.hook("compaction", hideSessionID)
    await ctx.session.hook("generate", hideSessionID)
  },
}
