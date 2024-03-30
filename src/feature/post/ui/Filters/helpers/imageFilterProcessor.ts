const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export async function getFilteredImage(
  imageSrc: string,
  filter: string = 'none'
): Promise<unknown> {
  const image = await createImage(String(imageSrc))
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  canvas.width = image.width
  canvas.height = image.height

  ctx.filter = filter || 'none'
  ctx.drawImage(image, 0, 0)

  return canvas.toDataURL('image/jpeg')
}
