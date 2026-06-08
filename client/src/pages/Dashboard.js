import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../api/axios';

const Dashboard = ({ user, onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsRes, summaryRes] = await Promise.all([
          API.get('/tickets'),
          API.get('/analytics/summary'),
        ]);
        setTickets(ticketsRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTickets = filter
    ? tickets.filter((t) => t.status === filter)
    : tickets;

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={onLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {summary && (
        <>
          <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
            {summary.statusCounts.map((s) => (
              <div key={s._id} style={{ flex: 1, padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
                <h3>{s.count}</h3>
                <p>{s._id}</p>
              </div>
            ))}
          </div>

          <h3>Tickets by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.statusCounts} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#0070f3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <h3 style={{ marginTop: '2rem' }}>Tickets by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={summary.categoryCounts} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#00a878" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
        <h3>All Tickets</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="">All statuses</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Priority</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Submitted By</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket._id}>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{ticket.title}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{ticket.status}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{ticket.priority}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{ticket.category}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{ticket.submittedBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;