/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { IFormFile } from '../IFormFile.ts'

/**
 * @description OK
 */
export type PostClassificationSendtoclassify200 = string

export type PostClassificationSendtoclassifyMutationRequest = {
  /**
   * @type string | undefined, binary
   */
  formFile?: IFormFile | undefined
}

export type PostClassificationSendtoclassifyMutationResponse = PostClassificationSendtoclassify200

export type PostClassificationSendtoclassifyMutation = {
  Response: PostClassificationSendtoclassify200
  Request: PostClassificationSendtoclassifyMutationRequest
  Errors: any
}