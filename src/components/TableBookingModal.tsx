"use client"

import { useEffect, useState, useCallback, useContext } from "react"
import { RestaurantContext } from "@/lib/restaurant-context"
import { Button } from "@/components/ui/button"

interface RestaurantTable {
  id: string
  number: number
  capacity: number
  status: string
  customerName: string
}

type Step = "select" | "form" | "success"

interface TableBookingModalProps {
  open: boolean
  onClose: () => void
  guests: number
  date: string
  time: string
}

export default function TableBookingModal({ open, onClose, guests, date, time }: TableBookingModalProps) {
  const restaurantCtx = useContext(RestaurantContext)
  const [tables, setTables] = useState<RestaurantTable[]>([])
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null)
  const [step, setStep] = useState<Step>("select")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchTables = useCallback(async () => {
    if (!restaurantCtx) return
    try {
      const res = await fetch(`/api/tables?restaurant_id=${restaurantCtx.id}`)
      const data = await res.json()
      if (data.tables) setTables(data.tables)
    } catch {
    }
  }, [restaurantCtx?.id])

  useEffect(() => {
    if (open) {
      fetchTables()
      setStep("select")
      setSelectedTable(null)
      setName("")
      setPhone("")
      setEmail("")
      setError("")
    }
  }, [open, fetchTables])

  const handleSubmit = async () => {
    if (!restaurantCtx) {
      setError("No restaurant selected")
      return
    }
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill in all fields")
      return
    }
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableId: selectedTable!.id,
          tableNumber: selectedTable!.number,
          guestName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          date,
          time,
          guests,
          restaurantId: restaurantCtx.id,
          restaurantName: restaurantCtx.name,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStep("success")
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch {
      setError("Failed to submit reservation")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurry backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-surface-container-low border border-outline-variant/20 max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface-container-low border-b border-outline-variant/10 flex items-center justify-between px-6 py-4 z-10">
          <span className="font-label-lg text-label-lg text-primary tracking-widest uppercase">
            {step === "select" && "SELECT YOUR TABLE"}
            {step === "form" && "YOUR INFORMATION"}
            {step === "success" && "RESERVATION CONFIRMED"}
          </span>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors material-symbols-outlined"
          >
            close
          </button>
        </div>

        <div className="p-6">
          {step === "select" && (
            <>
              {tables.length === 0 ? (
                <p className="text-on-surface-variant text-center py-12 font-body-md text-body-md">
                  {restaurantCtx ? "No tables available at the moment." : "Please visit a restaurant page to book a table."}
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {tables.map((table) => {
                    const isFree = table.status === "free"
                    const isSelected = selectedTable?.id === table.id
                    return (
                      <button
                        key={table.id}
                        disabled={!isFree}
                        onClick={() => setSelectedTable(table)}
                        className={`relative flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary/10"
                            : isFree
                              ? "border-outline-variant/30 hover:border-primary/50 bg-surface-container"
                              : "border-outline-variant/10 bg-surface-container/50 opacity-40 cursor-not-allowed"
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl mb-2 text-primary">
                          {isFree ? "table_restaurant" : "block"}
                        </span>
                        <span className="font-headline-md text-headline-md text-on-background">
                          {table.number}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          {table.capacity} guests
                        </span>
                        <span
                          className={`font-label-sm text-label-sm mt-2 uppercase tracking-wider ${
                            isFree ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
                          {isFree ? "Free" : table.status}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t border-outline-variant/10">
                <Button variant="outline" onClick={onClose}>
                  CANCEL
                </Button>
                <Button
                  disabled={!selectedTable}
                  onClick={() => setStep("form")}
                >
                  NEXT
                </Button>
              </div>
            </>
          )}

          {step === "form" && (
            <>
              {selectedTable && (
                <div className="mb-6 p-4 bg-surface-container border border-outline-variant/10 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    table_restaurant
                  </span>
                  <div>
                    <p className="font-headline-md text-headline-md text-on-background">
                      Table {selectedTable.number}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Capacity: {selectedTable.capacity} guests
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-5 mb-6">
                <div>
                  <label className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b border-outline-variant/50 py-3 font-body-md text-body-md text-on-background placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="w-full bg-transparent border-b border-outline-variant/50 py-3 font-body-md text-body-md text-on-background placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent border-b border-outline-variant/50 py-3 font-body-md text-body-md text-on-background placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {error && (
                <p className="font-body-md text-body-md text-error mb-4">{error}</p>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t border-outline-variant/10">
                <Button variant="outline" onClick={() => setStep("select")}>
                  BACK
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "SENDING..." : "SEND"}
                </Button>
              </div>
            </>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-primary">check</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-background mb-3">
                Reservation Submitted!
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-2">
                Table {selectedTable?.number} has been reserved in your name.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                We will contact you shortly to confirm your booking.
              </p>
              <Button onClick={onClose}>DONE</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
