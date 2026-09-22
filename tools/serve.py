#!/usr/bin/env python3
"""Local preview with the MIME types Vercel sends: python3 tools/serve.py [port]"""
import http.server, mimetypes, os, sys
for ext, t in {'.avif': 'image/avif', '.webp': 'image/webp', '.woff2': 'font/woff2',
               '.vcf': 'text/vcard; charset=utf-8', '.webmanifest': 'application/manifest+json',
               '.js': 'text/javascript'}.items():
    mimetypes.add_type(t, ext)
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
class H(http.server.SimpleHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    def end_headers(self):
        # mirror vercel.json: fonts are immutable, everything else revalidates
        if '/assets/fonts/' in self.path:
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        else:
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()
    def log_message(self, *a): pass
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8787
http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
