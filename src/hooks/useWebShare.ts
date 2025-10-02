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
      // Share cancelled or failed
      return false
    }
  }

  return {
    isSupported,
    share
  }
}