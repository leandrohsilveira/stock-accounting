export interface LoadingController {
  isLoading: boolean
}

export function createLoading(initial = false): LoadingController {
  let loading = $state(initial)

  return {
    get isLoading() {
      return loading
    },
    set isLoading(isLoading) {
      loading = isLoading
    },
  }
}
