import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import Layout from '../../../components/Layout'
import axios from 'axios';
import ContentHeader from '../../../components/ContentHeader';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
  const [form, setForm] = useState({
    name: '',
    code: '',
    selectedStateId: '',
  }) 
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const currentPath = location?.pathname || "";
  const navigate = useNavigate();
  const { id } = location.state || {};
  const apiUrl = process.env.REACT_APP_API_URL;

  // Generate options for react-select
  const stateOptions = states.map((state) => ({
    value: state._id,
    label: (
      <div className="d-flex align-items-center">
        <img
          src={state.flag}
          alt={state.name}
          style={{ width: "20px", height: "15px", marginRight: "8px" }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {state.name}
      </div>
    ),
  }));

  const selectedState = stateOptions.find(option => option.value === form.selectedStateId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [cityResponse, statesResponse] = await Promise.all([
          axios.get(`${apiUrl}city/get/${id}`, {
            headers: {
              'Authorization': ` ${localStorage.getItem('token')}`,
              "Cache-Control": "no-cache",
            },
          }),
          axios.get(`${apiUrl}state/get`, {
            headers: {
              authorization: `${localStorage.getItem('token')}`,
              "Cache-Control": "no-cache",
            },
          })
        ]);

        const cityData = cityResponse.data;
        setStates(statesResponse.data.data);
        
        setForm({
          name: cityData.name || '',
          code: cityData.code || '',
          selectedStateId: cityData.state || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load city data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, apiUrl]);

  const handleStateChange = (selectedOption) => {
    setForm(prev => ({
      ...prev,
      selectedStateId: selectedOption?.value || ""
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.selectedStateId) {
      toast.error("Please select a state");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        id,
        name: form.name,
        code: form.code,
        stateId: form.selectedStateId,
      };

      await axios.put(`${apiUrl}city/update`, payload, {
        headers: {
          "Authorization": `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('City updated successfully');

      // Navigate back after success
      setTimeout(() => {
        navigate('/admin/location');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating city:', error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout ac4="active">
        <ContentHeader 
          title="Update City" 
          breadcrumbs={[
            { label: 'Dashboard', to: '/admin/dashboard' }, 
            { label: "Location", to: "/admin/location" }, 
            { label: 'Update City' }
          ]} 
        />
        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary card-outline">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2">Loading city data...</p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout ac4="active">
      <ContentHeader 
        title="Update City" 
        breadcrumbs={[
          { label: 'Dashboard', to: '/admin/dashboard' }, 
          { label: "Location", to: "/admin/location" }, 
          { label: 'Update City' }
        ]} 
      />
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary card-outline">
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className='col-md-12'>
                    <div className="form-group">
                      <label htmlFor="stateSelect" className="required">
                        Select State
                      </label>
                      <Select
                        id="stateSelect"
                        options={stateOptions}
                        value={selectedState}
                        onChange={handleStateChange}
                        placeholder="Select a state"
                        isSearchable
                        isDisabled={isSubmitting}
                        className="basic-select"
                        classNamePrefix="select"
                        aria-label="Select state"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cityName" className="required">
                        City Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cityName"
                        name="name"
                        placeholder="Enter city name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        maxLength={100}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="cityCode">
                        City Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cityCode"
                        name="code"
                        placeholder="Enter city code"
                        value={form.code}
                        onChange={handleInputChange}
                        maxLength={10}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="float-right">
                    <button 
                      type="button" 
                      className="btn btn-secondary mx-2" 
                      onClick={() => navigate('/admin/location')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
                        </>
                      ) : (
                        'Update City'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer style={{ width: "auto" }} />
    </Layout>
  )
}