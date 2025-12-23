export function formatRelativeTime(dateString: string | Date): string {
  const now = new Date();
  const updatedDate = typeof dateString === "string" ? new Date(dateString) : dateString;
  
  const diffInMs = now.getTime() - updatedDate.getTime();
  
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds`;
  }
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes`;
  }
  
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'}`;
}