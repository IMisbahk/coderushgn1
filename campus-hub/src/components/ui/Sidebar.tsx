"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Plus, Settings, LogOut, User, Cog } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Channel {
  name: string
  href: string
}

export function Sidebar({ channels }: { channels: Channel[] }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-60 bg-[#1e1f22] text-neutral-300 h-screen">
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neutral-700 font-bold">
          C
        </div>
        <div className="font-medium text-sm">CampusHub</div>
        <div className="ml-auto text-neutral-500 text-xs">⌄</div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-[11px] text-neutral-500 font-semibold tracking-wide">
            CHANNELS
          </div>
          <button className="text-neutral-400 hover:text-neutral-200">
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1">
          {channels.map((ch) => {
            const active = pathname === ch.href
            return (
              <Link
                key={ch.href}
                href={ch.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-md text-sm transition",
                  active
                    ? "bg-[#35373c] text-white font-medium"
                    : "text-neutral-300 hover:bg-[#2b2d31]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">#</span>
                  <span className="truncate">{ch.name}</span>
                </div>
                {active && (
                  <Settings className="w-4 h-4 text-neutral-400 group-hover:text-neutral-200" />
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between bg-[#2b2d31] rounded-md px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-neutral-600 flex items-center justify-center font-bold text-xs">
              U
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-white">{profile.name}</span>
              <span className="text-[11px] text-neutral-400">{profile.role}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-neutral-400 hover:text-neutral-200">
                <Cog className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="end"
              className="bg-[#2b2d31] text-neutral-200 border-neutral-700"
            >
              <DropdownMenuItem className="gap-2">
                <User className="w-4 h-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Cog className="w-4 h-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-red-400"
                onClick={() => {
                  localStorage.removeItem("token")
                  window.location.href = "/"
                }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}