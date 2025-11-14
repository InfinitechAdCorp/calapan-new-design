// app/api/barangay-clearance/route.ts
import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

function getAuthToken(request: NextRequest): string | null {
  // Try cookie first
  const cookieToken = request.cookies.get("auth_token")?.value
  if (cookieToken) return cookieToken

  // Try Authorization header
  const authHeader = request.headers.get("Authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Get token from cookie or header
    const token = getAuthToken(request)

    console.log("Token found:", token ? "Yes" : "No")

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authentication token found. Please log in again.",
        },
        { status: 401 }
      )
    }

    console.log("Submitting barangay clearance application...")

    const response = await fetch(`${API_URL}/barangay-clearance`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    })

    const data = await response.json()

    console.log("Laravel response:", { status: response.status, data })

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Barangay Clearance API Error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}