export function navigateTo(pathname: string) {
  return {
    type: 'NAVIGATE_TO',
    pathname: pathname
  };
}
