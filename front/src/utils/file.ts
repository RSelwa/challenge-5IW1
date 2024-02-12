import type { ChangeEvent } from "react"

export const getImageUrlFromBlob = async (
  blob: Blob
): Promise<string | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      if (!reader.result) return
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(blob)
  })
}

export const handleSelectImages = async (
  event: ChangeEvent<HTMLInputElement>
): Promise<void> => {
  try {
    const file = Array.from(event.target.files || [])[0]

    await getImageUrlFromBlob(file)
  } catch (error) {
    console.error(error)
  }
}
