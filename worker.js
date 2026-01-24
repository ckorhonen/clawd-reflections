// Cloudflare Worker for Zora's Reflections
// Serves static files from the bucket

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Default to index.html
    if (path === '/' || path === '') {
      path = '/index.html';
    }
    
    // Try to get the asset
    try {
      const asset = await env.__STATIC_CONTENT.get(path.slice(1));
      
      if (asset) {
        const contentType = getContentType(path);
        return new Response(asset, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    } catch (e) {
      // Asset not found
    }
    
    // 404 fallback
    return new Response('Not Found', { status: 404 });
  },
};

function getContentType(path) {
  const ext = path.split('.').pop().toLowerCase();
  const types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'glb': 'model/gltf-binary',
    'gltf': 'model/gltf+json',
  };
  return types[ext] || 'application/octet-stream';
}
