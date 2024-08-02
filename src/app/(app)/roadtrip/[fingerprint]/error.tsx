"use client"

import { SadFaceIcon } from "@/app/components/icons/SadFaceIcon"
import { Text } from "@/app/components/ui/text"
import { useParams } from "next/navigation"

export default function errorPage({ error }: { error: Error }) {
  const { fingerprint } = useParams()
  console.error(error)

  return (
    <section className="grid place-content-center h-full">
      <div className="border border-border bg-neutral-900 flex flex-col items-center gap-4 p-6 rounded-lg">
        <Text intent={"title"}>
          There was an error
        </Text>
        <Text intent={"detail"}>
          Roadtrip with fingerprint <kbd>{fingerprint}</kbd> not found
        </Text>
        <SadFaceIcon />
      </div>
    </section>
  )

}