# opencode-no-session-id-inject

[English](README.md) | 中文

两个很小的 OpenCode 服务端插件，把会话管理的噪音挡在模型上下文之外。
建议两个一起使用。

| 文件 | 隐藏的内容 |
|---|---|
| `hide-session-id.js` | 从系统提示词和 system 角色消息中移除注入的 `Current conversation session ID: ...` 行。 |
| `hide-opencode-session-tools.js` | 从工具目录中移除 `opencode_session_rename`、`opencode_session_move`、`opencode_models`，并删除系统提示词里的 `tools.opencode.session_move` 提示行。保留 `opencode` 命名空间元数据，使剩余的命名空间仍然有效。 |

两者配合后，模型既看不到会话 ID，也看不到那些它并不需要的会话管理工具，
自然也不会去调用它们。

## 安装

把两个文件复制到 OpenCode 插件目录：

```
~/.config/opencode/plugin/
  hide-session-id.js
  hide-opencode-session-tools.js
```

重启 OpenCode。无需配置；删除文件即可立即恢复默认行为。

## 工作原理

两个插件都挂载了 `context`、`compaction` 和 `generate` 三个钩子，因此每次
LLM 请求前都会执行清理，压缩（compaction）之后也不会失效：

- `hide-session-id` 从 `system` 片段和 system 角色的消息中过滤掉会话 ID 行，
  只重写真正发生变化的片段。
- `hide-opencode-session-tools` 在请求构建前重写工具目录，并从系统文本中
  删除 `session_move` 提示。

## License

MIT
