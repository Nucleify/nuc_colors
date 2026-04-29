import { readBody } from 'h3'

import type {
  ApiContext,
  ApiHandlerResult,
  Json,
} from '../../../../nuxt/server/api/_types'

export async function handleColorsApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const { segments, method, supabase } = ctx
  if (segments[0] !== 'user-colors') return { handled: false }

  if (method === 'GET') {
    const { data, error } = await supabase.from('user_colors').select('*')
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    return { handled: true, body: { data: data || [] } }
  }

  if (method === 'PUT' || method === 'PATCH') {
    const body = (await readBody(ctx.event)) as Json
    if (Array.isArray(body.colors)) {
      const { error } = await supabase
        .from('user_colors')
        .upsert(body.colors as Json[], { onConflict: 'user_id,name' })
      if (error)
        return { handled: true, status: 500, body: { error: error.message } }
      return {
        handled: true,
        body: {
          success: true,
          updated_count: (body.colors as Json[]).length,
          created_count: 0,
          message: 'User colors synced.',
        },
      }
    }
  }

  return { handled: true, status: 405, body: { error: 'Method not allowed' } }
}
