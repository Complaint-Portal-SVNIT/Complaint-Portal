import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';

// components
import Filter from '../../components/Filter';
import QueryList from '../../components/QueryList';

// styles
import './Resolved.css';

export default function Resolved() {
  const { user } = useAuthContext();
  const { document, error } = useDocument('users', user.uid);
  const [isAdmin, setIsAdmin] = useState(false);
  const [complaints, setComplaints] = useState(null);

  useEffect(() => {
    if (document) {
      const pendingComplaints = document.complaints.filter(
        (complaint) => complaint.status !== 'pending'
      );
      setComplaints(pendingComplaints);
      setIsAdmin(document.adminType !== 'student');
    }
  }, [document]);

  const [filter, setFilter] = useState('all');
  const filterList = ['all', 'hostel', 'department', 'quarters', 'other'];

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const [secondFilter, setSecondFilter] = useState('all');
  const secondFilterList = ['all', 'solved', 'rejected'];

  const changeSecondFilter = (newFilter) => {
    setSecondFilter(newFilter);
  };

  const queries = complaints
    ? complaints.filter((document) => {
        switch (filter) {
          case 'all':
            return true;
          case 'hostels':
            return (
              document.building === 'ews-bhavan' ||
              document.building === 'tagore-bhavan' ||
              document.building === 'sarabhai-bhavan' ||
              document.building === 'raman-bhavan' ||
              document.building === 'nehru-bhavan' ||
              document.building === 'narmad-bhavan' ||
              document.building === 'gajjar-bhavan' ||
              document.building === 'mother-teresa-bhavan' ||
              document.building === 'bhabha-bhavan' ||
              document.building === 'swami-bhavan'
            );
          case 'departments':
            return (
              document.building === 'cse' ||
              document.building === 'ai' ||
              document.building === 'ece' ||
              document.building === 'ee' ||
              document.building === 'me' ||
              document.building === 'ce' ||
              document.building === 'ch' ||
              document.building === 'chemistry' ||
              document.building === 'mathematics' ||
              document.building === 'physics' ||
              document.building === 'management-studies' ||
              document.building === 'humanities'
            );
          case 'ews-bhavan':
          case 'tagore-bhavan':
          case 'sarabhai-bhavan':
          case 'raman-bhavan':
          case 'nehru-bhavan':
          case 'narmad-bhavan':
          case 'gajjar-bhavan':
          case 'mother-teresa-bhavan':
          case 'bhabha-bhavan':
          case 'swami-bhavan':
          case 'cse':
          case 'ai':
          case 'ece':
          case 'ee':
          case 'me':
          case 'ce':
          case 'ch':
          case 'chemistry':
          case 'mathematics':
          case 'physics':
          case 'management-studies':
          case 'humanities':
          case 'quarters':
          case 'other':
            return document.building === filter;
          default:
            return true;
        }
      })
    : null;

  const queries_filtered = queries
    ? queries.filter((query) => {
        switch (secondFilter) {
          case 'all':
            return true;
          case 'solved':
            return query.status === 'accepted';
          case 'rejected':
            return query.status === secondFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="resolved">
      {queries_filtered && (
        <Filter changeFilter={changeFilter} filterList={filterList} />
      )}
      {queries_filtered && (
        <Filter
          changeFilter={changeSecondFilter}
          filterList={secondFilterList}
        />
      )}
      {queries_filtered && (
        <QueryList queries={queries_filtered} isAdmin={isAdmin} />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}