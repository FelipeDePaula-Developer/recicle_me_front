"use client"

export function isAuthenticated(): boolean {
  const token = localStorage.getItem("jwt")
  return !!token
}