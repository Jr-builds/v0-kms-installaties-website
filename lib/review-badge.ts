export function getReviewPlatformBadgeClass(platform: string): string {
  return platform === 'Google'
    ? 'bg-blue-50 text-kms-navy'
    : 'bg-green-50 text-green-800'
}
