
import { NextRequest, NextResponse } from 'next/server'

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { referenceNumber: string } }
) {
  try {
    const response = await fetch(
      `${LARAVEL_API_URL}/medical-assistance/reference/${params.referenceNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    )

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error fetching application by reference:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}