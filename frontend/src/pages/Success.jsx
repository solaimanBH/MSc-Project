import { Spinner, Alert, Button } from 'reactstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '$src/components/layout/Dashboard/Layoutv2';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { API_BASE } from '$src/constants/base';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const Success = () => {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = useAuthHeader();
  const sessionId = params.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDonation = async () => {
      try {
        const res = await fetch(`${API_BASE}/donations/confirm/${sessionId}`, {
          headers: {
            'Authorization': token
          }
        });

        if (!res.ok) {
          throw new Error('Failed to confirm donation. Please try again.');
        }

        setSuccess(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      !success && confirmDonation();
    } else {
      setError('No session ID provided.');
      setLoading(false);
    }
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <section className="d-flex flex-column align-items-center justify-content-center min-vh-100 content-container">
        <header className="text-center mb-4">
          <h1 className="display-4">Donation Status</h1>
        </header>

        {loading && (
          <div className="text-center">
            <FaSpinner className="spinner-icon" size={48} color="primary-text" />
            <p className="mt-3">Processing your donation, please wait...</p>
          </div>
        )}

        {!loading && error && (
          <Alert color="danger" className="text-center">
            <FaTimesCircle size={24} className="mb-2" />
            <h4 className="alert-heading">Oops, something went wrong!</h4>
            <p>{error}</p>
            <Button color="primary" onClick={handleGoBack}>
              Go back to Dashboard
            </Button>
          </Alert>
        )}

        {!loading && success && (
          <Alert color="success" className="text-center">
            <FaCheckCircle size={48} className="text-success mb-2" />
            <h4 className="alert-heading">Thank You!</h4>
            <p>Your donation has been successfully processed.</p>
            <Button color="primary" onClick={handleGoBack}>
              Back to Dashboard
            </Button>
          </Alert>
        )}

        {!loading && !success && !error && (
          <Alert color="info" className="text-center">
            No donation details found. Please contact support for assistance.
          </Alert>
        )}
      </section>

      <style jsx>{`
        .spinner-icon {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .content-container {
          transform: translateY(-20%);
        }
        section {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Success;
