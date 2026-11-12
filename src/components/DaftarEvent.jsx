import { useState } from 'react'
import { Link } from 'react-router'

export default function DaftarEvent({ events, onAdd, onDelete, onUpdate }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  const [editingEvent, setEditingEvent] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editError, setEditError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !date || !location.trim()) {
      setError('Semua kolom wajib diisi.')
      return
    }
    onAdd({ id: crypto.randomUUID(), title: title.trim(), date, location: location.trim() })
    setTitle(''); setDate(''); setLocation(''); setError('')
  }

  function handleStartEdit(event) {
    setEditingEvent(event)
    setEditTitle(event.title)
    setEditDate(event.date)
    setEditLocation(event.location)
    setEditError('')
  }

  function handleSaveEdit(e) {
    e.preventDefault()
    if (!editTitle.trim() || !editDate || !editLocation.trim()) {
      setEditError('Semua kolom wajib diisi.')
      return
    }
    onUpdate({
      ...editingEvent,
      title: editTitle.trim(),
      date: editDate,
      location: editLocation.trim()
    })
    setEditingEvent(null)
  }

  return (
    <section>
      <h2>Daftar Acara Kampus ({events.length})</h2>
      
      <form className="form-card" onSubmit={handleSubmit}>
        <h3>Tambah Acara Baru</h3>
        <div className="form-group">
          <input 
            aria-label="Nama acara" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Nama acara" 
          />
          <input 
            aria-label="Tanggal acara" 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
          <input 
            aria-label="Lokasi acara" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            placeholder="Lokasi" 
          />
        </div>
        <button type="submit" className="btn btn-primary">Tambah Acara</button>
        {error && <p className="alert-error" role="alert">{error}</p>}
      </form>

      {events.length === 0 ? (
        <p className="empty-state">Belum ada acara kampus yang terdaftar.</p>
      ) : (
        <div className="table-container">
          <table className="event-table">
            <thead>
              <tr>
                <th>Nama Acara</th>
                <th>Tanggal</th>
                <th>Lokasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="event-title">
                    <Link to={`/event/${event.id}`}>{event.title}</Link>
                  </td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td className="action-buttons">
                    <button className="btn btn-edit" onClick={() => handleStartEdit(event)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => onDelete(event.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingEvent && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Edit Event Kampus</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-form-group">
                <label>Nama Acara</label>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                
                <label>Tanggal</label>
                <input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} />
                
                <label>Lokasi</label>
                <input value={editLocation} onChange={e => setEditLocation(e.target.value)} />
              </div>
              {editError && <p className="alert-error" role="alert">{editError}</p>}
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingEvent(null)}>Batal</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}