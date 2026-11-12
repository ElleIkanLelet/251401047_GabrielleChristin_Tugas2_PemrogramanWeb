import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router'
import DaftarEvent from './components/DaftarEvent'
import Tentang from './components/Tentang'

const contoh = [
  { id: '1', title: 'Seminar AI Kampus', date: '2026-11-12', location: 'Fasilkom-TI' },
  { id: '2', title: 'Workshop React', date: '2026-11-20', location: 'Lab Komputer' },
]

function DetailEvent({ events }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = events.find(item => item.id === id)

  if (!event) return <p className="empty-state">Acara tidak ditemukan. <Link to="/">Kembali ke daftar</Link></p>

  return (
    <section className="detail-card">
      <h2>{event.title}</h2>
      <p><strong>Tanggal:</strong> {event.date}</p>
      <p><strong>Lokasi:</strong> {event.location}</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Kembali ke daftar</button>
    </section>
  )
}

function NotFound() {
  return <p className="empty-state">404 - Halaman tidak ditemukan. <Link to="/">Kembali ke Beranda</Link></p>
}

export default function App() {
  const [events, setEvents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('event-kampus-v1'))
      return Array.isArray(saved) ? saved : contoh
    } catch {
      return contoh
    }
  })

  useEffect(() => {
    localStorage.setItem('event-kampus-v1', JSON.stringify(events))
  }, [events])

  function addEvent(event) {
    setEvents(prev => [...prev, event])
  }

  function updateEvent(updatedEvent) {
    setEvents(prev => prev.map(item => item.id === updatedEvent.id ? updatedEvent : item))
  }

  function deleteEvent(id) {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <main className="app">
      <header>
        <h1>Event Kampus</h1>
        <nav>
          <Link to="/">Daftar Event</Link>
          <Link to="/tentang">Tentang</Link>
        </nav>
      </header>

      <Routes>
        <Route 
          path="/" 
          element={
            <DaftarEvent 
              events={events} 
              onAdd={addEvent} 
              onDelete={deleteEvent} 
              onUpdate={updateEvent} 
            />
          } 
        />
        <Route path="/event/:id" element={<DetailEvent events={events} />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}