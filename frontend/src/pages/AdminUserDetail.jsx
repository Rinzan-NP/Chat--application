import React from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminUserDetail from '../components/Admin/UserDetail';


const AdminUserDetailPage = () => {
  
  const { userId } = useParams();
  
  

  return (
    <>
      <AdminNavbar />
      <AdminUserDetail userId={userId}/>
     
    </>
  );
};

export default AdminUserDetailPage;
