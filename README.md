English | [中文](./README_CN.md)

# vscode-update-anything

A VS Code extension for automatically updating specific content in files. Supports automatic replacement of predefined content when files are saved, particularly useful for updating dynamic content like dates and times.

## Features

- Supports regex pattern matching and replacement
- Supports dynamic variable substitution (e.g., current date, time, etc.)
- Configurable file types to monitor
- Automatic replacement execution on file save

## Configuration

Configure the following options in VS Code settings:

### enabledFiles
File matching rules to monitor for updates, supporting regex array.

Example:
```json
{
  "vscode-update-anything.enabledFiles": [
    ".*\\.md$",
    ".*\\.txt$"
  ]
}
```

### replacements
Content replacement configuration, containing `find` and `replace` fields.

Example:
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

## Supported Dynamic Variables

- `$CURRENT_YEAR`: Current year (4 digits)
- `$CURRENT_YEAR_SHORT`: Current year (2 digits)
- `$CURRENT_MONTH`: Current month (2 digits, zero-padded)
- `$CURRENT_DATE`: Current date (2 digits, zero-padded)
- `$CURRENT_HOUR`: Current hour (2 digits, zero-padded)
- `$CURRENT_MINUTE`: Current minute (2 digits, zero-padded)
- `$CURRENT_SECOND`: Current second (2 digits, zero-padded)
- `$CURRENT_SECONDS_UNIX`: Current Unix timestamp
- `$CURRENT_TIMEZONE_OFFSET`: Current timezone offset

## Usage Example

1. Configure the files to monitor and replacement rules in VS Code settings
2. Open the file that needs updating
3. The extension will automatically perform replacements when the file is saved

## Notes

- Replacements are only triggered when files are saved
- Use regex patterns with caution to avoid unintended replacements
- It's recommended to verify configurations on test files first

## License

MIT
