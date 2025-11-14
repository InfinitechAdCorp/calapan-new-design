// app/api/business-permit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
  try {
    // Get token from HTTP-only cookie instead of Authorization header
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated. Please log in again.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()

    console.log('Proxying business permit request to Laravel:', {
      url: `${LARAVEL_API_URL}/business-permit`,
      hasAuth: !!token,
      bodyKeys: Object.keys(body),
    })

    // Forward request to Laravel backend with Bearer token
    const response = await fetch(`${LARAVEL_API_URL}/business-permit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    console.log('Laravel response:', {
      status: response.status,
      success: data.success,
      message: data.message,
    })

    // Return Laravel response
    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get token from HTTP-only cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated. Please log in again.' },
        { status: 401 }
      )
    }

    const response = await fetch(`${LARAVEL_API_URL}/business-permits`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }};