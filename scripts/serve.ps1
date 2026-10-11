param([string]$Root, [int]$Port = 8765)
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript'; '.mjs'='application/javascript'; '.svg'='image/svg+xml'; '.png'='image/png'; '.json'='application/json'; '.pdf'='application/pdf'; '.webp'='image/webp'; '.jpg'='image/jpeg'; '.ico'='image/x-icon'; '.woff2'='font/woff2'; '.txt'='text/plain; charset=utf-8' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
while ($l.IsListening) {
  $c = $l.GetContext()
  $p = $c.Request.Url.LocalPath; if ($p -eq '/') { $p = '/index.html' }
  $f = Join-Path $Root ($p.TrimStart('/') -replace '/', '\')
  if (Test-Path $f -PathType Leaf) {
    $b = [IO.File]::ReadAllBytes($f)
    $ct = $types[[IO.Path]::GetExtension($f)]; if (-not $ct) { $ct = 'application/octet-stream' }; $c.Response.ContentType = $ct
    $c.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $c.Response.StatusCode = 404 }
  $c.Response.Close()
}

