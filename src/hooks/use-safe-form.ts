import type { FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'
import { useForm } from 'react-hook-form'

/**
 * useFormのラッパー
 * * https://zenn.dev/yuitosato/articles/292f13816993ef#1.-useform%E3%82%92%E3%83%A9%E3%83%83%E3%83%97%E3%81%97%E3%81%A6%E3%82%BF%E3%82%A4%E3%83%97%E3%82%BB%E3%83%BC%E3%83%95%E3%81%AB%E3%81%99%E3%82%8B
 */
export const useSafeForm = <T extends FieldValues>(
  props: UseFormProps<T> & {
    defaultValues: T
  },
): UseFormReturn<T> => useForm(props)
