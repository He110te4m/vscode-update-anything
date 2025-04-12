import type { ExtensionContext } from 'vscode'
import dayjs from 'dayjs'
import { Range, TextEdit, workspace } from 'vscode'
import { filesValidator, replacementsValidator } from './validators'

const extensionName = 'vscode-update-anything'

export function activate(context: ExtensionContext) {
  // 获取需要监听更新的文件
  let enabledFiles = resolveEnabledFiles()

  // 获取需要替换的内容
  let replacements = resolveReplacements()

  // 监听配置变化
  workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(extensionName)) {
      enabledFiles = resolveEnabledFiles()
      replacements = resolveReplacements()

      globalThis.console.log(
        `update ${extensionName} with args:`,
        enabledFiles,
        replacements,
      )
    }
  })

  globalThis.console.log(
    `activate ${extensionName} with args:`,
    enabledFiles,
    replacements,
  )

  const disposable = workspace.onWillSaveTextDocument((event) => {
    // 如果文件不匹配，则不进行更新
    if (!enabledFiles?.length || !replacements?.length || !enabledFiles.some(rule => rule.test(event.document.uri.fsPath))) {
      return
    }

    const codeReplacements = getReplacements()

    event.waitUntil(
      new Promise<TextEdit[]>((resolve) => {
        const edits: TextEdit[] = []
        // 逐行遍历文件
        for (let i = 0; i < event.document.lineCount; i++) {
          const line = event.document.lineAt(i)
          const text = line.text
          for (const { find, replace } of replacements) {
            if (find && replace) {
              const matched = text.match(find)
              if (matched) {
                const start = matched.index!
                const end = start + matched[0].length
                edits.push(
                  TextEdit.replace(
                    new Range(line.lineNumber, start, line.lineNumber, end),
                    formatReplacements(replace, codeReplacements),
                  ),
                )
              }
            }
          }
        }

        return resolve(edits)
      })
        .then(
          async (res) => {
            await event.document.save()
            return res
          },
        ),
    )
  })
  context.subscriptions.push(disposable)
}

export function deactivate() { }

/**
 * 解析需要监听更新的文件
 * @returns 匹配监听文件的正则表达式
 */
function resolveEnabledFiles() {
  const enabledFilesConfig = workspace
    .getConfiguration(extensionName)
    .get<string[]>('enabledFiles', [])
  const enabledFiles = filesValidator.parse(enabledFilesConfig)

  return enabledFiles.map(rule => new RegExp(rule))
}

/**
 * 解析需要替换的内容
 * @returns 需要替换的内容
 */
function resolveReplacements() {
  const replacementsConfig = workspace
    .getConfiguration(extensionName)
    .get<string[]>('replacements', [])
  const replacements = replacementsValidator.parse(replacementsConfig)

  return replacements.map(replacement => ({
    find: new RegExp(replacement.find),
    replace: replacement.replace,
  }))
}

// /**
//  * 转义正则表达式
//  * @param str 需要转义的字符串
//  * @returns 转义后的字符串
//  */
// function escapeRegExp(str: string) {
//   return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
// }

function formatReplacements(text: string, replacements: Record<string, string>) {
  return text.replace(/\$\w+/g, match => replacements[match as keyof typeof replacements])
}

function getReplacements() {
  return {
    $CURRENT_YEAR: dayjs().year().toString(),
    $CURRENT_YEAR_SHORT: dayjs().year().toString().slice(-2),
    $CURRENT_MONTH: dayjs().month().toString().padStart(2, '0'),
    $CURRENT_MONTH_NAME: dayjs().month().toString(),
    $CURRENT_MONTH_NAME_SHORT: dayjs().month().toString(),
    $CURRENT_DATE: dayjs().date().toString().padStart(2, '0'),
    $CURRENT_DAY_NAME: dayjs().day().toString(),
    $CURRENT_DAY_NAME_SHORT: dayjs().day().toString(),
    $CURRENT_HOUR: dayjs().hour().toString().padStart(2, '0'),
    $CURRENT_MINUTE: dayjs().minute().toString().padStart(2, '0'),
    $CURRENT_SECOND: dayjs().second().toString().padStart(2, '0'),
    $CURRENT_SECONDS_UNIX: dayjs().unix().toString(),
    $CURRENT_TIMEZONE_OFFSET: dayjs().utcOffset().toString(),
  }
}
