import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',

  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const paginationStyle = { padding: '8px', border: "1px solid black", backgroundColor: 'rgb(220, 220, 220)' }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');



    if (
      searchTermFromUrl

    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || ''
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);

      const data = await res.json();
      console.log(data, "res")
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {


    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

  };
  async function paginationChange(selected) {
    if (listings.length < 9 && selected > page) {
      return;
    }
    if (selected < 1) {
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', selected * 9 - 9);
    setPage(selected)
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();


    setListings([...data]);
  }
  return (
    <div className='flex flex-col md:flex-row'>

      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Blog results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

        </div>
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <span onClick={() => paginationChange(page - 1)} style={paginationStyle}>⬅️</span>
          {[...Array(page)].map((_, i) => {
            return <span onClick={() => paginationChange(i + 1)} style={paginationStyle}>{i + 1}</span>
          })}
          <span onClick={() => paginationChange(page + 1)} style={paginationStyle}>➡️</span>
        </span>
      </div>

    </div>
  );
}