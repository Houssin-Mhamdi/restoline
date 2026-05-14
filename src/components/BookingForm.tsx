"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import TableBookingModal from "@/components/TableBookingModal"

export default function BookingForm() {
  const [guests, setGuests] = useState("2")
  const [date, setDate] = useState(() => {
    const d = new Date()
    return d.toISOString().split("T")[0]
  })
  const [time, setTime] = useState("20:00")
  const [showGuests, setShowGuests] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  return (
    <>
      <section className="max-w-[1280px] mx-auto px-margin-desktop -mt-24 relative z-20 mb-section-gap">
        <div className="glass-panel p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter items-end">
            {/* Guests */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-label-lg text-label-lg text-primary">GUESTS</label>
              <div
                className="relative border-b border-outline-variant py-3 flex items-center justify-between cursor-pointer"
                onClick={() => setShowGuests(!showGuests)}
              >
                <span className="font-body-md text-body-md">{guests} {guests === "1" ? "Guest" : "Guests"}</span>
                <span className="material-symbols-outlined text-primary text-xl">
                  keyboard_arrow_down
                </span>
              </div>
              {showGuests && (
                <div className="absolute top-full mt-1 left-0 right-0 z-10 bg-surface-container-low border border-outline-variant/20 shadow-xl">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button
                      key={n}
                      onClick={() => { setGuests(String(n)); setShowGuests(false) }}
                      className={`w-full text-left px-4 py-2 font-body-md text-body-md hover:bg-surface-container transition-colors ${
                        guests === String(n) ? "text-primary" : "text-on-background"
                      }`}
                    >
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="font-label-lg text-label-lg text-primary">DATE</label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
            {/* Time */}
            <div className="flex flex-col gap-2">
              <label className="font-label-lg text-label-lg text-primary">TIME</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent border-b border-outline-variant py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
            {/* CTA */}
            <Button
              className="py-4 w-full tracking-widest uppercase"
              size="lg"
              onClick={() => setModalOpen(true)}
            >
              FIND A TABLE
            </Button>
          </div>
        </div>
      </section>
      <TableBookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        guests={parseInt(guests)}
        date={date}
        time={time}
      />
    </>
  )
}
