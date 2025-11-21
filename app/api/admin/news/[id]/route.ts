import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required - no auth token found',
        },
        { status: 401 }
      )
    }

    console.log('Fetching news detail with token:', authToken.value.substring(0, 20) + '...')

    const response = await fetch(`${API_URL}/admin/news/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to fetch news',
          error: errorData.error,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching news detail:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required - no auth token found',
        },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    console.log('Updating news (POST) with token:', authToken.value.substring(0, 20) + '...')

    const response = await fetch(`${API_URL}/admin/news/${params.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: formData,
    })

    const contentType = response.headers.get('content-type')
    let data

    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error('Non-JSON response from Laravel:', text)
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid response from server',
        },
        { status: 500 }
      )
    }

    console.log('Laravel response:', {
      status: response.status,
      success: data.success,
      message: data.message,
      error: data.error,
    })

    if (!response.ok) {
      console.error('Laravel error details:', data)
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Failed to update news',
          errors: data.errors,
          error: data.error,
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating news (POST):', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required - no auth token found',
        },
        { status: 401 }
      )
    }

    const body = await request.json()

    console.log('Updating news (PUT) with token:', authToken.value.substring(0, 20) + '...')

    const response = await fetch(`${API_URL}/admin/news/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to update news',
          errors: errorData.errors,
          error: errorData.error,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating news (PUT):', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required - no auth token found',
        },
        { status: 401 }
      )
    }

    console.log('Deleting news with token:', authToken.value.substring(0, 20) + '...')

    const response = await fetch(`${API_URL}/admin/news/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken.value}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to delete news',
          error: errorData.error,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}