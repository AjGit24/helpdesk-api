import { useEffect, useState } from 'react';
import API from '../api/axios';

const Dashboard = ({ user, onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [summary, setSummary] = useState(null);
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
        <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
          {summary.statusCounts.map((s) => (
            <div key={s._id} style={{ flex: 1, padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
              <h3>{s.count}</h3>
              <p>{s._id}</p>
            </div>
          ))}
        </div>
      )}

      <h3>All Tickets</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
          {tickets.map((ticket) => (
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