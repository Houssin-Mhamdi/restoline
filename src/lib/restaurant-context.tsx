"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { RestaurantData } from "./get-restaurant"

export const RestaurantContext = createContext<RestaurantData | null>(null)

export function RestaurantProvider({
  restaurant,
  children,
}: {
  restaurant: RestaurantData
  children: ReactNode
}) {
  return (
    <RestaurantContext.Provider value={restaurant}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) throw new Error("useRestaurant must be used within a [slug] route")
  return ctx
}
