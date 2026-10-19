const HIDDEN_TOOLS = ["opencode_session_rename", "opencode_session_move", "opencode_models"]

const OPENCODE_NAMESPACE = {
  name: "opencode",
  description: "Tools for managing OpenCode itself.",
}

const stripSessionMoveHint = (event) => {
  for (let index = event.system.length - 1; index >= 0; index--) {
    if (event.system[index].text.includes("tools.opencode.session_move")) event.system.splice(index, 1)
  }
}

export default {
  id: "hide-opencode-session-tools",
  setup: async (ctx) => {
    await ctx.tool.transform((editor) => {
      editor.namespace(OPENCODE_NAMESPACE)
      for (const id of HIDDEN_TOOLS) editor.remove(id)
    })
    await ctx.session.hook("context", stripSessionMoveHint)
    await ctx.session.hook("compaction", stripSessionMoveHint)
    await ctx.session.hook("generate", stripSessionMoveHint)
  },
}
