import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function apireq(
  method: string,
  path: string,
  body?: any
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  const url = `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`

  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  }

  if (body && method !== "GET") {
    options.body = JSON.stringify(body)
  }

  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}