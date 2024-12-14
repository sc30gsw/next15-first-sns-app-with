import { z } from 'zod'

// エラー文言を一括で設定・管理
// https://zenn.dev/s_takashi/articles/71c04d68e0c9c0
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_big) {
    if (issue.type === 'string') {
      return {
        message: `at most ${issue.maximum} characters`,
      }
    }
  }

  return { message: ctx.defaultError }
}
z.setErrorMap(customErrorMap)
