import { readBody } from 'h3'

import type {
  ApiContext,
  ApiHandlerResult,
  Json,
} from '../../../../nuxt/server/api/_types'
import { gatewayUserFromJwt } from '../../../../nuxt/server/api/gateway_auth'

export async function handleColorsApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const { segments, method, supabase } = ctx
  if (segments[0] !== 'user-colors') return { handled: false }

  if (method === 'GET') {
    const auth = await gatewayUserFromJwt(supabase, ctx.event)
    if ('error' in auth)
      return {
        handled: true,
        status: auth.status,
        body: { error: auth.error },
      }

    const { data, error } = await supabase
      .from('user_colors')
      .select('*')
      .eq('user_id', auth.user.id)
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    return { handled: true, body: { data: data || [] } }
  }

  if (method === 'PUT' || method === 'PATCH') {
    const auth = await gatewayUserFromJwt(supabase, ctx.event)
    if ('error' in auth)
      return {
        handled: true,
        status: auth.status,
        body: { error: auth.error },
      }

    const body = (await readBody(ctx.event)) as Json
    if (!Array.isArray(body.colors))
      return {
        handled: true,
        status: 400,
        body: { error: 'colors array required' },
      }

    if (body.colors.length === 0) {
      return {
        handled: true,
        body: {
          success: true,
          updated_count: 0,
          created_count: 0,
          message: 'No colors to sync.',
        },
      }
    }

    const userId = auth.user.id
    const now = new Date().toISOString()
    const rows = (body.colors as Record<string, unknown>[]).map((c) => {
      const isNew = Boolean(c.new)
      return {
        user_id: userId,
        name: c.name,
        value: c.value,
        new: isNew,
        is_new: isNew,
        updated_at: now,
      }
    })

    const { error } = await supabase
      .from('user_colors')
      .upsert(rows, { onConflict: 'user_id,name' })
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    return {
      handled: true,
      body: {
        success: true,
        updated_count: rows.length,
        created_count: 0,
        message: 'User colors synced.',
      },
    }
  }

  return { handled: true, status: 405, body: { error: 'Method not allowed' } }
}
