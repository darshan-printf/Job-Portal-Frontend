import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Link, MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentHeader from '../../components/ContentHeader';

export default function Edit() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const apiUrl = process.env.REACT_APP_API_URL;
  const [form, setForm] = useState({
    name: '',
    code: '',
    selectedStateId: '',
  }) 
  const [states, setStates] = useState([]);
  const [loaded, setLoaded] = useState(false); //  button  loading  efect deta  hold stat
  const currentPath = location?.pathname || "";

  // Fetch existing state data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}city/get/${id}`, {
          headers: {
            'Authorization': ` ${localStorage.getItem('token')}`,
          },
        });
        const memberData = response.data;
       setForm({
        name: memberData.name,
        code: memberData.code,
        selectedStateId: memberData.state,
       })
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    fetchData();

  }, [id])


  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${apiUrl}state/get`, {
          headers: {
            authorization: `${localStorage.getItem('token')}`,
          },
        });
        setStates(response.data); // Store API data in state
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchCountries();
  }, []);

   

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);

    const payload = {
      id,
      name: form.name,
      code: form.code,
      stateId: form.selectedStateId,
    };


    try {
      await axios.put(`${apiUrl}city/update`, payload, {
        headers: {
          "Authorization": `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      setLoaded(false);
      toast.success('city updated successfully');

      if (currentPath === "/cityedit") {
        setTimeout(() => {
          if (window.location.pathname === "/cityedit") {
            navigate('/citylist');
          }
        }, 3000);
      }
    } catch (error) {
      setLoaded(false);
      console.error('Error updating member:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  }


  return (

    <Layout ac4="active">
      <ContentHeader title="Update City" breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'City List', to: '/citylist' }, { label: 'Update City' }]} />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="memberName">Name</label> <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="memberName"
                        placeholder="Enter Member Name"
                        value={form.name}
                        onChange={(e) => 
                          setForm(prev => ({...prev, name:e.target.value}))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="designation">Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        placeholder="Enter Code"
                        value={form.code}
                        onChange={(e) => 
                          setForm(prev => ({...prev, code:e.target.value}))
                        }
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div class="form-group">
                      <label for="exampleSelectRounded0">Select State:</label>
                      <select class="custom-select rounded-0" 
                        id="exampleSelectRounded0"
                        value={form.selectedStateId}
                        onChange={(e) => 
                          setForm(prev => ({...prev, selectedStateId:e.target.value}))
                        }
                      >
                        <option value="">Select a State</option>
                        {states.map((state) => (
                          <option key={state._id} value={state._id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="float-right">
                    <button type="button" className="btn btn-primary mx-2" onClick={() => window.history.back()}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loaded}
                    >
                      {loaded ? (
                        <> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                      ) : (
                        <>
                          Submit
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
    </Layout>
  )
}
