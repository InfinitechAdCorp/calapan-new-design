// app/api/cedula/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    // Get token from cookie using async cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    console.log('GET /api/cedula - Token exists:', !!token)

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized - No token provided" 
      }, { status: 401 })
    }

    const url = id
      ? `${API_URL}/cedula/${id}`
      : `${API_URL}/cedula`

    console.log('GET /api/cedula - Fetching from:', url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    console.log('GET /api/cedula - Response status:', response.status)

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch data" },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Cedula GET API Error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get token from cookie using async cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    console.log('POST /api/cedula - Token exists:', !!token)
    console.log('POST /api/cedula - Request body:', body)

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized - No token provided" 
      }, { status: 401 })
    }

    // First, get the current user to obtain user_id
    const userResponse = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to authenticate user" 
      }, { status: 401 })
    }

    const userData = await userResponse.json()
    const userId = userData?.data?.user?.id

    console.log('POST /api/cedula - User ID:', userId)

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: "User ID not found" 
      }, { status: 401 })
    }

    // Convert camelCase to snake_case for Laravel
    const payload = {
      user_id: userId,
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      birth_date: body.birthDate,
      civil_status: body.civilStatus,
      citizenship: body.citizenship,
      occupation: body.occupation,
      tin_number: body.tinNumber || null,
      height: body.height,
      weight: body.weight,
    }

    console.log('POST /api/cedula - Payload to Laravel:', payload)
    console.log('POST /api/cedula - API URL:', `${API_URL}/cedula`)

    const response = await fetch(`${API_URL}/cedula`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    console.log('POST /api/cedula - Laravel response status:', response.status)

    const data = await response.json()
    console.log('POST /api/cedula - Laravel response data:', data)

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to submit application" },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Cedula POST API Error:", error)
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...formData } = body
    
    // Get token from cookie using async cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    console.log('PUT /api/cedula - Token exists:', !!token)

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized - No token provided" 
      }, { status: 401 })
    }

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      birth_date: formData.birthDate,
      civil_status: formData.civilStatus,
      citizenship: formData.citizenship,
      occupation: formData.occupation,
      tin_number: formData.tinNumber || null,
      height: formData.height,
      weight: formData.weight,
    }

    const response = await fetch(`${API_URL}/cedula/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    console.log('PUT /api/cedula - Response status:', response.status)

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to update application" },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Cedula PUT API Error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    // Get token from cookie using async cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    console.log('DELETE /api/cedula - Token exists:', !!token)

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        message: "Unauthorized - No token provided" 
      }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: "ID is required" 
      }, { status: 400 })
    }

    const response = await fetch(`${API_URL}/cedula/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    console.log('DELETE /api/cedula - Response status:', response.status)

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to delete application" },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Cedula DELETE API Error:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}