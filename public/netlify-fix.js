// This script handles redirects from /client/index.html to the root path
(function() {
  const path = window.location.pathname;
  if (path.startsWith('/client/')) {
    const newPath = path.replace('/client/', '/');
    window.history.replaceState(null, document.title, newPath + window.location.search + window.location.hash);
    console.log('URL path corrected from', path, 'to', newPath);
  }
})(); 