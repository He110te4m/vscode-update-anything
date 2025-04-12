[English](./README.md) | 中文

# vscode-update-anything

一个 VS Code 扩展，用于自动更新文件中的特定内容。支持在文件保存时自动替换预定义的内容，特别适用于更新日期、时间等动态内容。

## 功能特点

- 支持正则表达式匹配和替换
- 支持动态变量替换（如当前日期、时间等）
- 可配置需要监听的文件类型
- 自动在文件保存时执行替换

## 配置项

在 VS Code 设置中配置以下选项：

### enabledFiles
需要监听更新的文件匹配规则，支持正则表达式数组。

示例：
```json
{
  "vscode-update-anything.enabledFiles": [
    ".*\\.md$",
    ".*\\.txt$"
  ]
}
```

### replacements
需要替换的内容配置，包含 `find` 和 `replace` 两个字段。

示例：
```json
{
  "vscode-update-anything.replacements": [
    {
      "find": "Last updated: \\d{4}-\\d{2}-\\d{2}",
      "replace": "Last updated: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE"
    }
  ]
}
```

## 支持的动态变量

- `$CURRENT_YEAR`: 当前年份（4位）
- `$CURRENT_YEAR_SHORT`: 当前年份（2位）
- `$CURRENT_MONTH`: 当前月份（2位，补零）
- `$CURRENT_DATE`: 当前日期（2位，补零）
- `$CURRENT_HOUR`: 当前小时（2位，补零）
- `$CURRENT_MINUTE`: 当前分钟（2位，补零）
- `$CURRENT_SECOND`: 当前秒数（2位，补零）
- `$CURRENT_SECONDS_UNIX`: 当前 Unix 时间戳
- `$CURRENT_TIMEZONE_OFFSET`: 当前时区偏移量

## 使用示例

1. 在 VS Code 设置中配置需要监听的文件和替换规则
2. 打开需要更新的文件
3. 保存文件时，扩展会自动执行替换操作

## 注意事项

- 替换操作仅在文件保存时触发
- 请谨慎使用正则表达式，确保不会意外替换不需要的内容
- 建议先在测试文件上验证配置的正确性

## 许可证

MIT
