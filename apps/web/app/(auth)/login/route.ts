
import { NextResponse } from 'next/server'
import { login } from './action'

export async function POST(request: Request) {
    const formData = await request.formData()
    // Run server action
    await login(formData)

    return NextResponse.redirect('/dashboard')
}
