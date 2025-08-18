import requests

base_url = "https://dougbr.github.io"

urls_to_cache = [
    "/alte/",
    "/alte/index.html",
    "/alte/manifest.json",
    "/alte/asset-manifest.json",
    "/alte/favicon.ico",
    "/alte/favicon.png",
    "/alte/favicon-96x96.png",
    "/alte/web-app-manifest-192x192.png",
    "/alte/web-app-manifest-512x512.png",
    "/alte/apple-touch-icon.png",
]

for path in urls_to_cache:
    url = f"{base_url}{path}"
    try:
        response = requests.get(url, timeout=10)
        print(f"{url} -> {response.status_code}")
    except requests.RequestException as e:
        print(f"{url} -> ERROR: {e}")
