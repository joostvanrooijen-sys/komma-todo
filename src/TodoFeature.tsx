import React from 'react'
import { tasks } from 'komma-contracts'
import { Button } from 'komma-ui'

export function TodoFeature() {
  const [list, setList] = React.useState<any[]>([])
  const [title, setTitle] = React.useState('')

  React.useEffect(() => {
    tasks.listTasks().then(setList).catch(console.error)
  }, [])

  async function add() {
    if (!title.trim()) return
    const t = await tasks.createTask({ title })
    setList(prev => [t, ...prev])
    setTitle('')
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>To-Do</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nieuwe taak..." />
        <Button onClick={add}>Toevoegen</Button>
      </div>
      <ul>
        {list.map(t => (
          <li key={t.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={!!t.completed} onChange={e => tasks.toggleTask(t.id, e.target.checked).then(nt => setList(prev => prev.map(p => p.id === nt.id ? nt : p)))} />
            <span>{t.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
