/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import client from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query'
import type {
  PostClassificationSendtoclassifymultiplyMutationRequest,
  PostClassificationSendtoclassifymultiplyMutationResponse,
} from "../../types/'ClassificationController/PostClassificationSendtoclassifymultiply.ts"
import { useMutation } from '@tanstack/react-query'

export const postClassificationSendtoclassifymultiplyMutationKey = () => [{ url: '/Classification/SendToClassifyMultiply' }] as const

export type PostClassificationSendtoclassifymultiplyMutationKey = ReturnType<typeof postClassificationSendtoclassifymultiplyMutationKey>

/**
 * {@link /Classification/SendToClassifyMultiply}
 */
export async function postClassificationSendtoclassifymultiply(
  data?: PostClassificationSendtoclassifymultiplyMutationRequest,
  config: Partial<RequestConfig<PostClassificationSendtoclassifymultiplyMutationRequest>> & { client?: typeof client } = {},
) {
  const { client: request = client, ...requestConfig } = config

  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || (value as Blob) instanceof Blob)) {
        formData.append(key, value as unknown as string)
      }
    })
  }
  const res = await request<
    PostClassificationSendtoclassifymultiplyMutationResponse,
    ResponseErrorConfig<Error>,
    PostClassificationSendtoclassifymultiplyMutationRequest
  >({
    method: 'POST',
    url: `/Classification/SendToClassifyMultiply`,
    baseURL: 'http://localhost:5269/',
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  })
  return res
}

/**
 * {@link /Classification/SendToClassifyMultiply}
 */
export function usePostClassificationSendtoclassifymultiply<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<PostClassificationSendtoclassifymultiplyMutationResponse>,
      ResponseErrorConfig<Error>,
      { data?: PostClassificationSendtoclassifymultiplyMutationRequest },
      TContext
    > & { client?: QueryClient }
    client?: Partial<RequestConfig<PostClassificationSendtoclassifymultiplyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation = {}, client: config = {} } = options ?? {}
  const { client: queryClient, ...mutationOptions } = mutation
  const mutationKey = mutationOptions.mutationKey ?? postClassificationSendtoclassifymultiplyMutationKey()

  return useMutation<
    ResponseConfig<PostClassificationSendtoclassifymultiplyMutationResponse>,
    ResponseErrorConfig<Error>,
    { data?: PostClassificationSendtoclassifymultiplyMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return postClassificationSendtoclassifymultiply(data, config)
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient,
  )
}