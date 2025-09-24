export default async function Home() {
  let status = 'unknown'
  try {
    const res = await fetch('http://localhost:3000/pyapi/health', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      status = (data as any).status ?? 'ok'
    }
  } catch (e) {
    status = 'offline'
  }

  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', margin: '2rem' }}>
      <h1>Anushka Career Navigator (Next.js + Python)</h1>
      <p>Backend health: {status}</p>
      <nav style={{ marginTop: '1rem' }}>
        <a href="/pyapi/" style={{ marginRight: '1rem' }}>Open Python root</a>
        <a href="/pyapi/health">Health JSON</a>
      </nav>
    </main>
  )
}
