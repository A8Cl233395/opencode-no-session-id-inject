# opencode-no-session-id-inject

English | [中文](README.zh-CN.md)

Two small OpenCode server plugins that keep session bookkeeping out of the
model's context. They are meant to be used together.

| File | What it hides |
|---|---|
| `hide-session-id.js` | Removes the injected `Current conversation session ID: ...` line from the system prompt and from system-role messages. |
| `hide-opencode-session-tools.js` | Removes the `opencode_session_rename`, `opencode_session_move` and `opencode_models` tools from the tool catalog, and strips the `tools.opencode.session_move` hint lines from the system prompt. The `opencode` namespace metadata is kept so the remaining namespace stays valid. |

Together they stop the model from seeing (and therefore trying to use) the
session ID and the session-management tools it does not need.

## Install

Copy both files into the OpenCode plugin directory:

```
~/.config/opencode/plugin/
  hide-session-id.js
  hide-opencode-session-tools.js
```

Restart OpenCode. No configuration is required, and removing the files restores
the default behavior immediately.

## How it works

Both plugins hook `context`, `compaction` and `generate`, so the scrubbing runs
before every LLM request and also survives compaction:

- `hide-session-id` filters the session-ID line out of `system` parts and
  system-role messages, rewriting only the parts that actually changed.
- `hide-opencode-session-tools` rewrites the tool catalog before the request is
  built and removes the `session_move` hint from system text.

## License

MIT
