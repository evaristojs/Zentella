export const useWebShare = () => {
  const isSupported = typeof navigator !== 'undefined' && 'share' in navigator

  const share = async (data: {
    title?: string
    text?: string
    url?: string
    files?: File[]
  }) => {
    if (!isSupported) {
      return false
    }

    try {
      await navigator.share(data)
      return true
    } catch (err) {
      console.error('Error al compartir:', err)
      return false
    }
  }

  return {
    isSupported,
    share
  }
}